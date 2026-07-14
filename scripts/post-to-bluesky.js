#!/usr/bin/env node

/**
 * Bluesky Posting Script
 * Posts content from content-queue.json to Bluesky using AT Protocol
 */

import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SITE_ROOT = join(__dirname, '..');

// Environment variables
const BLUESKY_HANDLE = process.env.BLUESKY_HANDLE;
const BLUESKY_APP_PASSWORD = process.env.BLUESKY_APP_PASSWORD;
const BLUESKY_SERVICE = 'https://bsky.social';
const TARGET_POST_ID = process.env.TARGET_POST_ID;

if (!BLUESKY_HANDLE || !BLUESKY_APP_PASSWORD) {
  console.error('❌ BLUESKY_HANDLE and BLUESKY_APP_PASSWORD environment variables are required');
  process.exit(1);
}

/**
 * Make HTTPS request
 */
function makeRequest(url, options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error('Failed to parse response: ' + e.message));
          }
        } else {
          reject(new Error(`API error ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Create Bluesky session (login)
 */
async function createSession() {
  const url = new URL('/xrpc/com.atproto.server.createSession', BLUESKY_SERVICE);
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const data = {
    identifier: BLUESKY_HANDLE,
    password: BLUESKY_APP_PASSWORD
  };
  
  return makeRequest(url, options, data);
}

/**
 * Detect facets (links, mentions, hashtags) in text
 */
function detectFacets(text) {
  const facets = [];
  
  // Detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  let match;
  
  while ((match = urlRegex.exec(text)) !== null) {
    facets.push({
      index: {
        byteStart: Buffer.from(text.substring(0, match.index)).length,
        byteEnd: Buffer.from(text.substring(0, match.index + match[0].length)).length
      },
      features: [{
        $type: 'app.bsky.richtext.facet#link',
        uri: match[0]
      }]
    });
  }
  
  // Detect hashtags
  const hashtagRegex = /#(\w+)/g;
  
  while ((match = hashtagRegex.exec(text)) !== null) {
    facets.push({
      index: {
        byteStart: Buffer.from(text.substring(0, match.index)).length,
        byteEnd: Buffer.from(text.substring(0, match.index + match[0].length)).length
      },
      features: [{
        $type: 'app.bsky.richtext.facet#tag',
        tag: match[1]
      }]
    });
  }
  
  return facets.length > 0 ? facets : undefined;
}

/**
 * Post to Bluesky
 */
async function postToBluesky(content, session, imagePath) {
  const url = new URL('/xrpc/com.atproto.repo.createRecord', BLUESKY_SERVICE);

  const record = {
    $type: 'app.bsky.feed.post',
    text: content,
    createdAt: new Date().toISOString()
  };

  const facets = detectFacets(content);
  if (facets) record.facets = facets;

  // ponytail: attach image if present + exists (text-only = low reach)
  if (imagePath && fs.existsSync(imagePath)) {
    try {
      const blob = await uploadBlob(fs.readFileSync(imagePath), imagePath);
      record.embed = {
        $type: 'app.bsky.embed.images',
        images: [{ alt: 'Abstract Emporium product', image: blob }]
      };
    } catch (e) {
      console.warn('⚠️ Image upload failed, posting text-only:', e.message);
    }
  }

  const data = {
    repo: session.did,
    collection: 'app.bsky.feed.post',
    record
  };

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.accessJwt}`,
      'Content-Type': 'application/json'
    }
  };

  return makeRequest(url, options, data);
}

async function uploadBlob(data, imagePath) {
  const ext = imagePath.split('.').pop().toLowerCase();
  const mime = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/webp';
  const url = new URL('/xrpc/com.atproto.repo.uploadBlob', BLUESKY_SERVICE);
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BLUESKY_APP_PASSWORD}`,
      'Content-Type': mime
    }
  };
  const res = await makeRequest(url, options, data);
  return res.blob;
}

/**
 * Format post content with hashtags
 * Ensures content stays under 300 character limit for Bluesky
 */
function formatPost(post) {
  // Keep a strict safety margin under Bluesky's hard cap.
  const BLUESKY_LIMIT = 260;
  const ELLIPSIS = '...';
  const safeLink = sanitizeLink(post.link);
  const linkBlock = safeLink ? `\n\n${safeLink}` : '';
  
  // Prefer platform-specific content if present (AI-generated posts), fall back to legacy content field
  let content = (post.bluesky_content || post.content || '').trim();
  let hashtags = post.hashtags && post.hashtags.length > 0
    ? '\n\n' + post.hashtags.join(' ')
    : '';

  const countBytes = (text) => Buffer.byteLength(text || '', 'utf8');

  // First pass: keep full content/hashtags/link if possible.
  let finalPost = content + hashtags + linkBlock;
  if (countBytes(finalPost) <= BLUESKY_LIMIT) {
    return finalPost;
  }

  // Second pass: shrink hashtags first so link always stays visible.
  while (hashtags && countBytes(content + hashtags + linkBlock) > BLUESKY_LIMIT) {
    const parts = hashtags.trim().split(/\s+/);
    parts.pop();
    hashtags = parts.length > 0 ? '\n\n' + parts.join(' ') : '';
  }

  // Final pass: trim content while preserving link block.
  while (countBytes(content + hashtags + linkBlock) > BLUESKY_LIMIT) {
    const chars = Array.from(content);
    if (chars.length <= ELLIPSIS.length + 1) {
      content = '';
      break;
    }
    content = chars.slice(0, chars.length - 1).join('');
    if (!content.endsWith(ELLIPSIS) && countBytes(content + ELLIPSIS + hashtags + linkBlock) <= BLUESKY_LIMIT) {
      content = content.trimEnd() + ELLIPSIS;
      break;
    }
  }

  finalPost = (content + hashtags + linkBlock).trim();

  // Absolute final guard.
  while (countBytes(finalPost) > BLUESKY_LIMIT && finalPost.length > ELLIPSIS.length) {
    const chars = Array.from(finalPost);
    finalPost = chars.slice(0, chars.length - 1).join('');
  }

  return finalPost;
}

/**
 * Ensure links are always valid site URLs so posts never ship with broken paths.
 * Invalid or external links fall back to home page.
 */
function sanitizeLink(link) {
  if (!link || !String(link).trim()) {
    return null;
  }

  let parsed;
  try {
    parsed = new URL(link);
  } catch {
    return 'https://abstractemporium.art';
  }

  if (parsed.hostname !== 'abstractemporium.art') {
    return 'https://abstractemporium.art';
  }

  const cleanPath = parsed.pathname.replace(/\/+$/, '');
  if (!cleanPath || cleanPath === '') {
    return 'https://abstractemporium.art';
  }

  const localPath = cleanPath.replace(/^\//, '');
  const exact = join(SITE_ROOT, localPath);
  const html = join(SITE_ROOT, `${localPath}.html`);
  if (fs.existsSync(exact) || fs.existsSync(html)) {
    return `https://abstractemporium.art/${localPath}`;
  }

  return 'https://abstractemporium.art';
}

/**
 * Load content queue
 */
function loadContentQueue() {
  const queuePath = join(__dirname, '..', 'content-queue.json');
  
  if (!fs.existsSync(queuePath)) {
    console.error('❌ content-queue.json not found');
    process.exit(1);
  }
  
  const data = fs.readFileSync(queuePath, 'utf8');
  return JSON.parse(data);
}

/**
 * Save content queue
 */
function saveContentQueue(queue) {
  const queuePath = join(__dirname, '..', 'content-queue.json');
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}

/**
 * Get next unposted item for Bluesky
 */
function getNextPost(queue) {
  const now = new Date();

  if (TARGET_POST_ID) {
    return queue.posts.find(post => {
      const postedPlatforms = post.postedPlatforms || [];
      return post.id === TARGET_POST_ID &&
        !postedPlatforms.includes('bluesky') &&
        post.platforms.includes('bluesky') &&
        new Date(post.schedule) <= now;
    });
  }
  
  return queue.posts.find(post => {
    const postedPlatforms = post.postedPlatforms || [];
    return !postedPlatforms.includes('bluesky') &&
      post.platforms.includes('bluesky') &&
      new Date(post.schedule) <= now;
  });
}

/**
 * Main execution
 */
async function main() {
  console.log('🦋 Bluesky Auto-Poster Starting...');
  console.log(`📍 Service: ${BLUESKY_SERVICE}`);
  console.log(`👤 Handle: ${BLUESKY_HANDLE}`);
  
  const queue = loadContentQueue();
  const post = getNextPost(queue);
  
  if (!post) {
    console.log('ℹ️ No posts ready to publish on Bluesky');
    return;
  }
  
  console.log(`\n📝 Posting: ${post.id}`);
  console.log(`📅 Scheduled: ${post.schedule}`);
  
  try {
    // Login to Bluesky
    console.log('\n🔐 Creating session...');
    const session = await createSession();
    console.log(`✅ Logged in as: ${session.handle}`);
    
    const content = formatPost(post);
    console.log(`\n📄 Content (${content.length} chars):`);
    console.log(content);
    console.log('\n');
    
    const imagePath = post.image ? join(SITE_ROOT, post.image) : null;
    const response = await postToBluesky(content, session, imagePath);
    
    const postUrl = `https://bsky.app/profile/${session.handle}/post/${response.uri.split('/').pop()}`;
    
    console.log('✅ Posted successfully to Bluesky!');
    console.log(`🔗 Post URL: ${postUrl}`);
    
    // Mark as posted on Bluesky (per-platform tracking)
    const postIndex = queue.posts.findIndex(p => p.id === post.id);
    if (postIndex !== -1) {
      if (!queue.posts[postIndex].postedPlatforms) {
        queue.posts[postIndex].postedPlatforms = [];
      }
      queue.posts[postIndex].postedPlatforms.push('bluesky');
      queue.posts[postIndex].postedAt = new Date().toISOString();
      queue.posts[postIndex].blueskyUrl = postUrl;
      queue.posts[postIndex].blueskyUri = response.uri;
      
      // Mark as fully posted only if all platforms are done
      const allPosted = queue.posts[postIndex].platforms.every(platform => 
        queue.posts[postIndex].postedPlatforms.includes(platform)
      );
      if (allPosted) {
        queue.posts[postIndex].posted = true;
      }
      
      saveContentQueue(queue);
      console.log('💾 Updated content queue');
    }
    
  } catch (error) {
    console.error('❌ Error posting to Bluesky:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { postToBluesky, createSession, formatPost };
