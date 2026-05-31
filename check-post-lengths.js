// Check character limits in content-queue.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queuePath = path.join(__dirname, 'content-queue.json');
const data = JSON.parse(fs.readFileSync(queuePath, 'utf8'));

console.log('🔍 Checking character limits for all posts...\n');

let blueskyIssues = 0;
let mastodonIssues = 0;

data.posts.forEach((post, index) => {
  const content = post.content || '';
  const blueskyContent = post.bluesky_content || content;
  const mastodonContent = post.mastodon_content || content;
  
  // Check Bluesky (300 char limit)
  if (blueskyContent.length > 300) {
    console.log(`⚠️  ${post.id || `Post ${index+1}`}:`);
    console.log(`   Bluesky: ${blueskyContent.length} chars (${blueskyContent.length - 300} over limit)`);
    console.log(`   Preview: ${blueskyContent.substring(0, 100)}...`);
    console.log('');
    blueskyIssues++;
  }
  
  // Check Mastodon (500 char limit)
  if (mastodonContent.length > 500) {
    console.log(`⚠️  ${post.id || `Post ${index+1}`}:`);
    console.log(`   Mastodon: ${mastodonContent.length} chars (${mastodonContent.length - 500} over limit)`);
    console.log(`   Preview: ${mastodonContent.substring(0, 100)}...`);
    console.log('');
    mastodonIssues++;
  }
});

console.log('\n📊 SUMMARY:');
console.log(`Total posts: ${data.posts.length}`);
console.log(`Bluesky issues: ${blueskyIssues} (will be auto-truncated)`);
console.log(`Mastodon issues: ${mastodonIssues} (will be auto-truncated)`);

if (blueskyIssues === 0 && mastodonIssues === 0) {
  console.log('\n✅ All posts fit within character limits!');
} else {
  console.log('\n✅ social-auto-poster.js will auto-truncate these posts when posting.');
}
