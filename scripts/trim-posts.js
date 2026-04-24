import fs from 'fs';

const queue = JSON.parse(fs.readFileSync('content-queue.json', 'utf8'));

// Trimmed versions of posts exceeding 280 chars
const trimmedContent = {
  'post-001': '🎨 NEW RELEASE: Chaos & Calm Coloring Book\n\n50 pages to find balance between intensity & peace.\n\n✨ Includes:\n• Color Guide\n• 4 Therapeutic Techniques\n• 50-Day Challenge\n\nPerfect for anxiety relief & mindfulness.',
  
  'post-003': '✨ INVISIBLE PAIN COLLECTION ✨\n\n50 pages for processing emotions others can\'t see.\n\n💜 Features:\n• Emotion Palette Guide\n• Layering Method\n• Trauma-informed affirmations\n• Journal prompts\n\nYour pain is valid. Your art heals.',
  
  'post-004': '🌿 Healing Lines - Nature-based therapeutic coloring\n\n🌲 Forest Therapy (grounding)\n🌊 Ocean Calm (peace)\n🌅 Sunrise Hope (renewal)\n🌙 Moonlight Peace (rest)\n\n50 pages of meditative abstract designs.',
  
  'post-005': '🎯 JOIN THE #ChaosAndCalmChallenge!\n\nColor one page/day for 50 days.\n\nWeeks 1-2: Bold chaos colors\nWeeks 3-4: Soothing calm tones\nWeeks 5-6: Monochromatic\nWeek 7: Rainbow!\n\nTag #ChaosAndCalmChallenge 💚',
  
  'post-006': '💰 BEST VALUE: Abstract Mind Collection\n\nALL 3 books (150 pages) + 50 exclusive = 200 total\n\n✓ Chaos & Calm\n✓ Invisible Pain\n✓ Healing Lines\n✓ Color Guide\n✓ Tracker\n\nSave $4! Only $19.99',
  
  'post-010': '🌟 CUSTOMER LOVE:\n\n"I bought this bundle and haven\'t looked at another coloring book in months. 200 pages is INSANE value." - Rachel P.\n\nTag #AbstractEmporiumArt in your posts! 💚',
  
  'post-011': '🎨 BEHIND THE SCENES:\n\nEach pattern in our books is designed with intention:\n\n• Flowing lines = Meditation\n• Sharp angles = Energy release\n• Repetitive patterns = Grounding\n• Open spaces = Room for emotions',
  
  'post-012': '🔥 FLASH SALE! 🔥\n\n24 HOURS: 20% OFF ALL COLORING BOOKS\nCode: FLASH20\n\nChaos & Calm: $6.39\nInvisible Pain: $6.39\nHealing Lines: $6.39\nComplete Bundle: $15.99\n\nSale ends midnight tonight!',
  
  'post-016': '💡 Feeling overwhelmed?\n\nTry the "One-Minute Mindfulness" technique:\n\n1. Pick one small section\n2. Set timer for 1 minute\n3. Color slowly\n4. Take 10 deep breaths\n5. Notice how you feel\n\nNo pressure to finish. 🌿',
  
  'post-018': '📝 BLOG: "5 Science-Backed Ways Coloring Reduces Anxiety"\n\nDiscover why therapists recommend coloring for stress relief.\n\nTopics:\n• Bilateral stimulation\n• Mindfulness activation\n• Cortisol reduction\n\nRead now:',
  
  'post-021': '🎁 PERFECT GIFT:\n\nKnow someone struggling with anxiety or stress?\n\nOur coloring books make thoughtful gifts:\n\n💜 Shows you care\n🎨 No stigma (it\'s art!)\n🌿 Promotes self-care\n✨ Affordable',
  
  'post-023': '📚 Did you know?\n\nOur Abstract Mind Collection includes a 200-Page Journey Tracker:\n\n✓ Mood before/after\n✓ Color palette used\n✓ Emotional insights\n✓ Progress photos\n\nWatch your healing unfold visually!',
  
  'post-025': '🎨 CHALLENGE: "Opposite Day"\n\nColor with colors you HATE.\n\nThat uncomfortable color? Use it!\n\nWhy? It breaks patterns and helps discover new favorites.\n\nTry pages 1-10. Tag #OppositeColorDay!',
  
  'post-027': '💡 PRINTING TIP:\n\nFor best results:\n\n• Paper: 32lb (120gsm+)\n• Setting: "Actual Size"\n• Quality: High/Best\n• Bleed: 0.25" margin\n• Color: Full color\n\nPerfect prints every time!',
  
  'post-028': '🌟 MILESTONE!\n\nWe\'ve reached 500+ downloads!\n\nThank you for trusting us with your mental wellness journey. Every download represents someone choosing self-care.\n\nHonored to be part of your story. 💚'
};

// Update posts with trimmed content
let updated = 0;
queue.posts.forEach(post => {
  if (trimmedContent[post.id]) {
    const oldLength = post.content.length;
    post.content = trimmedContent[post.id];
    const newLength = post.content.length;
    console.log(`✂️  ${post.id}: ${oldLength} → ${newLength} chars`);
    updated++;
  }
});

// Save updated queue
fs.writeFileSync('content-queue.json', JSON.stringify(queue, null, 2));
console.log(`\n✅ Updated ${updated} posts to fit 280 character limit`);
console.log('📱 All posts now safe for Bluesky (300 char limit)');
