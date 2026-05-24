#!/usr/bin/env node

/**
 * Mastodon Posting Script
 * Posts content from content-queue.json to Mastodon
 */

import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SITE_ROOT = join(__dirname, '..');

// Environment variables
const MASTODON_ACCESS_TOKEN = process.env.MASTODON_ACCESS_TOKEN;
const MASTODON_INSTANCE_URL = process.env.MASTODON_INSTANCE_URL || 'https://mastodon.social';
const TARGET_POST_ID = process.env.TARGET_POST_ID;

if (!MASTODON_ACCESS_TOKEN) {
  console.error('❌ MASTODON_ACCESS_TOKEN environment variable is required');
  process.exit(1);
}

/**
 * Post to Mastodon
 */
async function postToMastodon(content, visibility = 'public') {
  const url = new URL('/api/v1/statuses', MASTODON_INSTANCE_URL);
  
  const data = JSON.stringify({
    status: content,
    visibility: visibility
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MASTODON_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const response = JSON.parse(body);
            resolve(response);
          } catch (e) {
            reject(new Error('Failed to parse response: ' + e.message));
          }
        } else {
          reject(new Error(`Mastodon API error ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

/**
 * Format post content with hashtags
 * Ensures content stays under 500 character limit for Mastodon
 */
function formatPost(post) {
  // Keep a safety margin below Mastodon's hard cap.
  const MASTODON_LIMIT = 450;
  const ELLIPSIS = '...';
  const safeLink = sanitizeLink(post.link);
  const linkBlock = safeLink ? `\n\n${safeLink}` : '';
  const countChars = (text) => Array.from(text || '').length;
  
  // Prefer platform-specific content if present (AI-generated posts), fall back to legacy content field
  let content = (post.mastodon_content || post.content || '').trim();
  let hashtags = post.hashtags && post.hashtags.length > 0 
    ? '\n\n' + post.hashtags.join(' ') 
    : '';

  // First pass: keep full content/hashtags/link if possible.
  let finalPost = content + hashtags + linkBlock;
  if (countChars(finalPost) <= MASTODON_LIMIT) {
    return finalPost;
  }

  // Trim hashtags first.
  while (hashtags && countChars(content + hashtags + linkBlock) > MASTODON_LIMIT) {
    const parts = hashtags.trim().split(/\s+/);
    parts.pop();
    hashtags = parts.length > 0 ? '\n\n' + parts.join(' ') : '';
  }

  // Then trim content while preserving link block.
  while (countChars(content + hashtags + linkBlock) > MASTODON_LIMIT) {
    const chars = Array.from(content);
    if (chars.length <= ELLIPSIS.length + 1) {
      content = '';
      break;
    }
    content = chars.slice(0, chars.length - 1).join('');
    if (!content.endsWith(ELLIPSIS) && countChars(content + ELLIPSIS + hashtags + linkBlock) <= MASTODON_LIMIT) {
      content = content.trimEnd() + ELLIPSIS;
      break;
    }
  }

  finalPost = (content + hashtags + linkBlock).trim();

  // Absolute final guard.
  while (countChars(finalPost) > MASTODON_LIMIT && finalPost.length > ELLIPSIS.length) {
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
 * Get next unposted item for Mastodon
 */
function getNextPost(queue) {
  const now = new Date();

  if (TARGET_POST_ID) {
    return queue.posts.find(post => {
      const postedPlatforms = post.postedPlatforms || [];
      return post.id === TARGET_POST_ID &&
        !postedPlatforms.includes('mastodon') &&
        post.platforms.includes('mastodon') &&
        new Date(post.schedule) <= now;
    });
  }
  
  return queue.posts.find(post => {
    const postedPlatforms = post.postedPlatforms || [];
    return !postedPlatforms.includes('mastodon') &&
      post.platforms.includes('mastodon') &&
      new Date(post.schedule) <= now;
  });
}

/**
 * Main execution
 */
async function main() {
  console.log('🦣 Mastodon Auto-Poster Starting...');
  console.log(`📍 Instance: ${MASTODON_INSTANCE_URL}`);
  
  const queue = loadContentQueue();
  const post = getNextPost(queue);
  
  if (!post) {
    console.log('ℹ️ No posts ready to publish on Mastodon');
    return;
  }
  
  console.log(`\n📝 Posting: ${post.id}`);
  console.log(`📅 Scheduled: ${post.schedule}`);
  
  try {
    const content = formatPost(post);
    console.log(`\n📄 Content (${content.length} chars):`);
    console.log(content);
    console.log('\n');
    
    const response = await postToMastodon(content);
    
    console.log('✅ Posted successfully to Mastodon!');
    console.log(`🔗 Post URL: ${response.url}`);
    
    // Mark as posted on Mastodon (per-platform tracking)
    const postIndex = queue.posts.findIndex(p => p.id === post.id);
    if (postIndex !== -1) {
      if (!queue.posts[postIndex].postedPlatforms) {
        queue.posts[postIndex].postedPlatforms = [];
      }
      queue.posts[postIndex].postedPlatforms.push('mastodon');
      queue.posts[postIndex].postedAt = new Date().toISOString();
      queue.posts[postIndex].mastodonUrl = response.url;
      
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
    console.error('❌ Error posting to Mastodon:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { postToMastodon, formatPost };
