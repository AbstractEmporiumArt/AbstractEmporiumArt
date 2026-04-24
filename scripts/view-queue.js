const fs = require('fs');

const queue = JSON.parse(fs.readFileSync('content-queue.json', 'utf8'));

console.log('\n========================================');
console.log('CONTENT QUEUE - 50 POSTS');
console.log('========================================\n');

queue.posts.forEach((post, index) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`POST ${index + 1}: ${post.id}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Schedule: ${post.schedule}`);
  console.log(`Platforms: ${post.platforms.join(', ')}`);
  console.log(`Posted: ${post.posted ? 'YES' : 'NO'}`);
  console.log('\nCONTENT:');
  console.log(post.content);
  
  if (post.hashtags && post.hashtags.length > 0) {
    console.log('\nHASHTAGS:');
    console.log(post.hashtags.join(' '));
  }
  
  if (post.link) {
    console.log('\nLINK:');
    console.log(post.link);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`Total Posts: ${queue.posts.length}`);
console.log('='.repeat(60) + '\n');
