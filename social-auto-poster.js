const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration - API keys loaded from .env file
const CONFIG = {
  twitter: {
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
  },
  bluesky: {
    identifier: process.env.BLUESKY_IDENTIFIER || 'abstractemporiumart.bsky.social',
    password: process.env.BLUESKY_APP_PASSWORD
  },
  mastodon: {
    accessToken: process.env.MASTODON_ACCESS_TOKEN,
    instanceUrl: 'https://mastodon.social'
  },
  facebook: {
    pageId: process.env.FACEBOOK_PAGE_ID,
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN
  }
};

// Load content queue
function loadQueue() {
  const queuePath = path.join(__dirname, 'content-queue.json');
  
  if (!fs.existsSync(queuePath)) {
    console.error('ERROR: content-queue.json not found!');
    console.log('Please create content-queue.json with your scheduled posts.');
    console.log('See MARKETING_AUTOMATION_SETUP.md for example format.');
    process.exit(1);
  }
  
  return JSON.parse(fs.readFileSync(queuePath, 'utf8'));
}

// Save queue back to file
function saveQueue(queue) {
  const queuePath = path.join(__dirname, 'content-queue.json');
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}

// Post to X/Twitter
async function postToTwitter(content, imagePath) {
  console.log('[Twitter] Posting:', content.substring(0, 50) + '...');
  
  if (!CONFIG.twitter.apiKey) {
    console.warn('[Twitter] SKIPPED - API keys not configured');
    return;
  }
  
  try {
    // Using twitter-api-v2 library
    const { TwitterApi } = require('twitter-api-v2');
    
    const client = new TwitterApi({
      appKey: CONFIG.twitter.apiKey,
      appSecret: CONFIG.twitter.apiSecret,
      accessToken: CONFIG.twitter.accessToken,
      accessSecret: CONFIG.twitter.accessSecret,
    });
    
    // Upload image if provided
    let mediaId;
    if (imagePath && fs.existsSync(imagePath)) {
      mediaId = await client.v1.uploadMedia(imagePath);
    }
    
    // Post tweet
    const tweet = await client.v2.tweet({
      text: content,
      ...(mediaId && { media: { media_ids: [mediaId] } })
    });
    
    console.log('[Twitter] ✓ Posted successfully! Tweet ID:', tweet.data.id);
    return tweet.data.id;
    
  } catch (error) {
    console.error('[Twitter] ✗ Error:', error.message);
    throw error;
  }
}

// Post to Bluesky
async function postToBluesky(content, imagePath) {
  console.log('[Bluesky] Posting:', content.substring(0, 50) + '...');
  
  if (!CONFIG.bluesky.password) {
    console.warn('[Bluesky] SKIPPED - Credentials not configured');
    return;
  }
  
  try {
    const { BskyAgent } = require('@atproto/api');
    
    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });
    
    // Login
    await agent.login({
      identifier: CONFIG.bluesky.identifier,
      password: CONFIG.bluesky.password
    });
    
    // Upload image if provided
    let imageBlob;
    if (imagePath && fs.existsSync(imagePath)) {
      const imageData = fs.readFileSync(imagePath);
      const uploadResult = await agent.uploadBlob(imageData, {
        encoding: 'image/png' // Adjust based on image type
      });
      imageBlob = uploadResult.data.blob;
    }
    
    // Create post
    const post = await agent.post({
      text: content,
      ...(imageBlob && {
        embed: {
          $type: 'app.bsky.embed.images',
          images: [{
            alt: 'Abstract Emporium Product Image',
            image: imageBlob
          }]
        }
      })
    });
    
    console.log('[Bluesky] ✓ Posted successfully! Post URI:', post.uri);
    return post.uri;
    
  } catch (error) {
    console.error('[Bluesky] ✗ Error:', error.message);
    throw error;
  }
}

// Post to Mastodon
async function postToMastodon(content, imagePath) {
  console.log('[Mastodon] Posting:', content.substring(0, 50) + '...');
  
  if (!CONFIG.mastodon.accessToken) {
    console.warn('[Mastodon] SKIPPED - Access token not configured');
    return;
  }
  
  try {
    const { login } = require('masto');
    
    const masto = await login({
      url: CONFIG.mastodon.instanceUrl,
      accessToken: CONFIG.mastodon.accessToken
    });
    
    // Upload image if provided
    let mediaId;
    if (imagePath && fs.existsSync(imagePath)) {
      const imageData = fs.readFileSync(imagePath);
      const media = await masto.v2.media.create({
        file: new Blob([imageData]),
        description: 'Abstract Emporium Product Image'
      });
      mediaId = media.id;
    }
    
    // Create status
    const status = await masto.v1.statuses.create({
      status: content,
      ...(mediaId && { mediaIds: [mediaId] })
    });
    
    console.log('[Mastodon] ✓ Posted successfully! Status ID:', status.id);
    return status.id;
    
  } catch (error) {
    console.error('[Mastodon] ✗ Error:', error.message);
    throw error;
  }
}

// Post to Facebook
async function postToFacebook(content, imagePath) {
  console.log('[Facebook] Posting:', content.substring(0, 50) + '...');
  
  if (!CONFIG.facebook.accessToken) {
    console.warn('[Facebook] SKIPPED - Access token not configured');
    return;
  }
  
  try {
    const FB = require('fb');
    
    FB.setAccessToken(CONFIG.facebook.accessToken);
    
    let postData = {
      message: content
    };
    
    // If image provided, upload as photo
    if (imagePath && fs.existsSync(imagePath)) {
      const imageData = fs.readFileSync(imagePath);
      postData = {
        message: content,
        photo: imageData
      };
      
      const response = await FB.api(`/${CONFIG.facebook.pageId}/photos`, 'post', postData);
      console.log('[Facebook] ✓ Posted successfully! Post ID:', response.id);
      return response.id;
    } else {
      // Text-only post
      const response = await FB.api(`/${CONFIG.facebook.pageId}/feed`, 'post', postData);
      console.log('[Facebook] ✓ Posted successfully! Post ID:', response.id);
      return response.id;
    }
    
  } catch (error) {
    console.error('[Facebook] ✗ Error:', error.message);
    throw error;
  }
}

// Post to Pinterest
async function postToPinterest(content, imagePath, link) {
  console.log('[Pinterest] Pinning:', content.substring(0, 50) + '...');
  
  if (!process.env.PINTEREST_ACCESS_TOKEN) {
    console.warn('[Pinterest] SKIPPED - Access token not configured');
    return;
  }
  
  if (!imagePath || !fs.existsSync(imagePath)) {
    console.warn('[Pinterest] SKIPPED - Image required for Pinterest');
    return;
  }
  
  try {
    const axios = require('axios');
    const FormData = require('form-data');
    
    const form = new FormData();
    form.append('board_id', process.env.PINTEREST_BOARD_ID); // Your board ID
    form.append('title', content.substring(0, 100)); // Max 100 chars
    form.append('description', content);
    form.append('link', link || 'https://abstractemporium.com');
    form.append('media_source', {
      source_type: 'image_base64',
      data: fs.readFileSync(imagePath, 'base64')
    });
    
    const response = await axios.post('https://api.pinterest.com/v5/pins', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}`
      }
    });
    
    console.log('[Pinterest] ✓ Pinned successfully! Pin ID:', response.data.id);
    return response.data.id;
    
  } catch (error) {
    console.error('[Pinterest] ✗ Error:', error.message);
    throw error;
  }
}

// Main posting function
async function processQueue() {
  console.log('\n=== SOCIAL AUTO-POSTER ===');
  console.log('Time:', new Date().toISOString());
  console.log('==========================\n');
  
  const queue = loadQueue();
  const now = new Date();
  
  let postsProcessed = 0;
  let postsSkipped = 0;
  
  for (const post of queue.posts) {
    // Skip if already posted
    if (post.posted) {
      continue;
    }
    
    // Check if it's time to post
    const scheduleTime = new Date(post.schedule);
    if (scheduleTime > now) {
      postsSkipped++;
      continue;
    }
    
    console.log(`\n--- Processing Post ID: ${post.id} ---`);
    console.log('Scheduled for:', post.schedule);
    console.log('Content:', post.content.substring(0, 80) + '...\n');
    
    // Build full content with hashtags and link
    let fullContent = post.content;
    if (post.link) fullContent += `\n\n${post.link}`;
   if (post.hashtags && post.hashtags.length > 0) {
      fullContent += `\n\n${post.hashtags.join(' ')}`;
    }
    
    // Resolve image path
    const imagePath = post.image ? path.join(__dirname, post.image) : null;
    
    // Track which platforms succeeded
    const results = {};
    
    // Post to each platform
    for (const platform of post.platforms) {
      try {
        let postId;
        
        switch(platform.toLowerCase()) {
          case 'twitter':
            postId = await postToTwitter(fullContent, imagePath);
            break;
          case 'bluesky':
            postId = await postToBluesky(fullContent, imagePath);
            break;
          case 'mastodon':
            postId = await postToMastodon(fullContent, imagePath);
            break;
          case 'facebook':
            postId = await postToFacebook(fullContent, imagePath);
            break;
          case 'pinterest':
            postId = await postToPinterest(post.content, imagePath, post.link);
            break;
          default:
            console.warn(`[${platform}] Unknown platform, skipping`);
        }
        
        results[platform] = {
          success: true,
          postId: postId,
          postedAt: now.toISOString()
        };
        
      } catch (error) {
        console.error(`[${platform}] Failed:`, error.message);
        results[platform] = {
          success: false,
          error: error.message
        };
      }
    }
    
    // Mark as posted (even if some platforms failed)
    post.posted = true;
    post.postedAt = now.toISOString();
    post.results = results;
    postsProcessed++;
  }
  
  // Save updated queue
  saveQueue(queue);
  
  console.log('\n==========================');
  console.log(`✓ Processed: ${postsProcessed} posts`);
  console.log(`⏭️  Skipped (scheduled for later): ${postsSkipped} posts`);
  console.log('==========================\n');
  
  // Check if we have upcoming posts
  const upcomingPosts = queue.posts.filter(p => !p.posted);
  if (upcomingPosts.length > 0) {
    const nextPost = upcomingPosts[0];
    console.log('Next scheduled post:');
    console.log('  Time:', nextPost.schedule);
    console.log('  Content:', nextPost.content.substring(0, 60) + '...');
  } else {
    console.log('⚠️  No more posts in queue! Add more posts to content-queue.json');
  }
}

// Run immediately if called directly
if (require.main === module) {
  processQueue()
    .then(() => {
      console.log('\n✓ Script completed successfully\n');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n✗ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { processQueue, postToTwitter, postToBluesky, postToMastodon, postToFacebook, postToPinterest };
