import fs from 'fs';

const queue = JSON.parse(fs.readFileSync('content-queue.json', 'utf8'));

console.log('📊 Character Count Analysis\n');
console.log('Posts exceeding 280 chars (Bluesky safe limit):\n');

const longPosts = [];

queue.posts.forEach(post => {
  const len = post.content.length;
  if (len > 280) {
    longPosts.push({
      id: post.id,
      length: len,
      content: post.content,
      excerpt: post.content.substring(0, 60)
    });
    console.log(`${post.id}: ${len} chars`);
    console.log(`"${post.content.substring(0, 80)}..."`);
    console.log('---\n');
  }
});

console.log(`\n✅ Total posts: ${queue.posts.length}`);
console.log(`⚠️  Posts over 280 chars: ${longPosts.length}`);
console.log(`✅ Posts within limit: ${queue.posts.length - longPosts.length}`);
