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

// Environment variables
const BLUESKY_HANDLE = process.env.BLUESKY_HANDLE;
const BLUESKY_APP_PASSWORD = process.env.BLUESKY_APP_PASSWORD;
const BLUESKY_SERVICE = 'https://bsky.social';

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
async function postToBluesky(content, session) {
  const url = new URL('/xrpc/com.atproto.repo.createRecord', BLUESKY_SERVICE);
  
  const now = new Date().toISOString();
  const facets = detectFacets(content);
  
  const record = {
    $type: 'app.bsky.feed.post',
    text: content,
    createdAt: now
  };
  
  if (facets) {
    record.facets = facets;
  }
  
  const data = {
    repo: session.did,
    collection: 'app.bsky.feed.post',
    record: record
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

/**
 * Format post content with hashtags
 */
function formatPost(post) {
  let content = post.content;
  
  // Add link if present
  if (post.link) {
    content += `\n\n🔗 ${post.link}`;
  }
  
  // Add hashtags
  if (post.hashtags && post.hashtags.length > 0) {
    content += '\n\n' + post.hashtags.join(' ');
  }
  
  // Bluesky has a 300 character limit
  if (content.length > 300) {
    content = content.substring(0, 297) + '...';
  }
  
  return content;
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
  
  return queue.posts.find(post => 
    !post.posted &&
    post.platforms.includes('bluesky') &&
    new Date(post.schedule) <= now
  );
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
    
    const response = await postToBluesky(content, session);
    
    const postUrl = `https://bsky.app/profile/${session.handle}/post/${response.uri.split('/').pop()}`;
    
    console.log('✅ Posted successfully to Bluesky!');
    console.log(`🔗 Post URL: ${postUrl}`);
    
    // Mark as posted
    const postIndex = queue.posts.findIndex(p => p.id === post.id);
    if (postIndex !== -1) {
      queue.posts[postIndex].posted = true;
      queue.posts[postIndex].postedAt = new Date().toISOString();
      queue.posts[postIndex].blueskyUrl = postUrl;
      queue.posts[postIndex].blueskyUri = response.uri;
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
