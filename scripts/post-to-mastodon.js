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

// Environment variables
const MASTODON_ACCESS_TOKEN = process.env.MASTODON_ACCESS_TOKEN;
const MASTODON_INSTANCE_URL = process.env.MASTODON_INSTANCE_URL || 'https://mastodon.social';

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
 * Get next unposted item for Mastodon
 */
function getNextPost(queue) {
  const now = new Date();
  
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
