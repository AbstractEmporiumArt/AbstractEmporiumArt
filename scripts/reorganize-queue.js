// Reorganize content queue: Brand & art products first, coloring books last
import fs from 'fs';

const queue = JSON.parse(fs.readFileSync('content-queue.json', 'utf8'));

// Define new posting order with schedule dates (2 posts per day: 10am & 4pm)
const newSchedule = {
  // Phase 1: Brand Introduction (April 25)
  'post-031': '2026-04-25T10:00:00Z',  // Welcome to Abstract Emporium
  'post-032': '2026-04-25T16:00:00Z',  // Gallery announcement
  
  // Phase 2: ArtPal Products (April 26-May 1)
  'post-033': '2026-04-26T10:00:00Z',  // Neon Gardenz
  'post-034': '2026-04-26T16:00:00Z',  // Ethereal Kaleidoscope
  'post-035': '2026-04-27T10:00:00Z',  // Serenity in Waves
  'post-036': '2026-04-27T16:00:00Z',  // Magical Wonderland
  'post-044': '2026-04-28T10:00:00Z',  // Dreamz
  'post-045': '2026-04-28T16:00:00Z',  // Abstract Twist
  'post-048': '2026-04-29T10:00:00Z',  // Harmony in Contrast
  'post-049': '2026-04-29T16:00:00Z',  // Chronicles of Cosmos
  'post-050': '2026-04-30T10:00:00Z',  // Ethereal Whispers
  'post-041': '2026-04-30T16:00:00Z',  // Radiant Fusion
  'post-042': '2026-05-01T10:00:00Z',  // Mystic Connections
  
  // Phase 3: Fine Art America (May 1-4)
  'post-037': '2026-05-01T16:00:00Z',  // FAA store announcement
  'post-038': '2026-05-02T10:00:00Z',  // Cosmic Collection
  'post-039': '2026-05-02T16:00:00Z',  // Melodic Expressions
  'post-040': '2026-05-03T10:00:00Z',  // Magical Mountains
  'post-046': '2026-05-03T16:00:00Z',  // Serenity exclusive
  'post-043': '2026-05-04T10:00:00Z',  // Why shop with us
  'post-047': '2026-05-04T16:00:00Z',  // Browse by vibe
  
  // Phase 4: Hug.art (May 5-6)
  'post-051': '2026-05-05T10:00:00Z',  // Now on Hug.art
  'post-052': '2026-05-05T16:00:00Z',  // Where to shop guide
  'post-053': '2026-05-06T10:00:00Z',  // Why Hug.art
  
  // Phase 5: Coloring Books (May 6 onwards - 2 posts/day)
  'post-001': '2026-05-06T16:00:00Z',
  'post-002': '2026-05-07T10:00:00Z',
  'post-003': '2026-05-07T16:00:00Z',
  'post-004': '2026-05-08T10:00:00Z',
  'post-005': '2026-05-08T16:00:00Z',
  'post-006': '2026-05-09T10:00:00Z',
  'post-008': '2026-05-09T16:00:00Z',
  'post-009': '2026-05-10T10:00:00Z',
  'post-010': '2026-05-10T16:00:00Z',
  'post-011': '2026-05-11T10:00:00Z',
  'post-012': '2026-05-11T16:00:00Z',
  'post-013': '2026-05-12T10:00:00Z',
  'post-014': '2026-05-12T16:00:00Z',
  'post-015': '2026-05-13T10:00:00Z',
  'post-016': '2026-05-13T16:00:00Z',
  'post-017': '2026-05-14T10:00:00Z',
  'post-018': '2026-05-14T16:00:00Z',
  'post-019': '2026-05-15T10:00:00Z',
  'post-020': '2026-05-15T16:00:00Z',
  'post-021': '2026-05-16T10:00:00Z',
  'post-022': '2026-05-16T16:00:00Z',
  'post-023': '2026-05-17T10:00:00Z',
  'post-025': '2026-05-17T16:00:00Z',
  'post-026': '2026-05-18T10:00:00Z',
  'post-027': '2026-05-18T16:00:00Z',
  'post-028': '2026-05-19T10:00:00Z',
  'post-030': '2026-05-19T16:00:00Z',
};

// Update schedule for each post
queue.posts.forEach(post => {
  if (newSchedule[post.id]) {
    post.schedule = newSchedule[post.id];
  }
});

// Save updated queue
fs.writeFileSync('content-queue.json', JSON.stringify(queue, null, 2));
console.log('✅ Content queue reorganized successfully!');
console.log('📅 New posting order: Brand → Art Products → Coloring Books');
console.log(' Posts will now appear in the correct sequence.');
