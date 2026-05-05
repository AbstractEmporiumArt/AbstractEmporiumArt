#!/usr/bin/env node

/**
 * Abstract Emporium — AI Content Generation Engine
 *
 * Uses GitHub Models API (GPT-4o) to generate unique social posts for
 * Bluesky and Mastodon. Posts are validated before being added to the queue.
 *
 * Environment variables required:
 *   GITHUB_TOKEN — provided automatically in GitHub Actions
 *
 * Optional:
 *   GENERATE_COUNT — number of posts to generate (default: 2)
 */

import https from 'https';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GENERATE_COUNT = parseInt(process.env.GENERATE_COUNT || '2', 10);
const GITHUB_MODELS_URL = 'https://models.inference.ai.azure.com/chat/completions';
const MODEL = 'gpt-4o';
const MAX_RETRIES = 3;

// ─── Paths ────────────────────────────────────────────────────────────────────

const HISTORY_PATH = join(ROOT, 'data', 'content-history.json');
const QUEUE_PATH = join(ROOT, 'content-queue.json');

// ─── Content catalogue (inline — keeps script self-contained) ─────────────────

const COLLECTIONS = [
  {
    name: 'Chaos & Calm',
    type: 'coloring_book',
    url: 'https://abstractemporium.art/bundle-chaos-calm.html',
    description: '50 pages balancing intensity and peace. Includes a colour guide, 4 therapeutic techniques, and a 50-day transformation challenge.',
    themes: ['anxiety relief', 'balance', 'mindfulness', 'colour as emotion']
  },
  {
    name: 'Invisible Pain',
    type: 'coloring_book',
    url: 'https://abstractemporium.art/bundle-invisible-pain.html',
    description: '50 pages for processing emotions others cannot see. Includes an Emotion Palette Guide, layering method, and trauma-informed affirmations.',
    themes: ['invisible illness', 'chronic pain', 'emotional processing', 'validation', 'trauma-informed']
  },
  {
    name: 'Healing Lines',
    type: 'coloring_book',
    url: 'https://abstractemporium.art/bundle-healing-lines.html',
    description: '50 pages of nature-inspired meditative designs. Forest Therapy, Ocean Calm, Sunrise Hope, Moonlight Peace.',
    themes: ['nature', 'grounding', 'meditative', 'rest', 'slow living']
  },
  {
    name: 'Abstract Mind Collection',
    type: 'bundle',
    url: 'https://abstractemporium.art/bundle-abstract-mind.html',
    description: 'All three coloring books (200 pages total) plus a Mood-Based Colour Theory Guide and a 200-Page Journey Tracker.',
    themes: ['complete journey', 'colour theory', 'long-term practice']
  },
  {
    name: 'Abstract art gallery',
    type: 'gallery',
    url: 'https://abstractemporium.art/gallery.html',
    description: '40+ original abstract pieces available as prints, canvas, framed posters, and home décor on ArtPal and Fine Art America.',
    themes: ['original art', 'wall decor', 'print on demand', 'colour-driven', 'expressive abstraction']
  },
  {
    name: 'Knitting patterns & handmade work',
    type: 'craft',
    url: 'https://abstractemporium.art',
    description: 'Hand-knitted pieces and craft patterns with roots in a multigenerational family tradition. Slow, meditative, made by hand.',
    themes: ['handmade', 'slow craft', 'knitting', 'family heritage', 'meditative making']
  }
];

const BRAND_VOICE = `
Abstract Emporium is not a business account — it is a creative personality.
Think of it as a cozy, slightly chaotic creative studio that posts art, knitting, and creative thoughts.
The voice is: warm, human, slightly humorous in a natural way, never forced.
Never corporate. Never hyped. Never salesy.
No "revolutionary", "life-changing", "game-changer", "limited time", "act now", "don't miss", "proven", "guaranteed".
No fake testimonials. No invented user outcomes. No exaggerated claims.
Write like a real person who makes art, knits, colours, and thinks out loud online.
`.trim();

const CTA_OPTIONS = [
  "you can find more of this over at the site if you're curious",
  "this lives quietly on abstractemporium.art",
  "there's a whole collection of this kind of work on the site",
  "the full piece (and others like it) lives on abstractemporium.art",
  "if this is your kind of thing, abstractemporium.art has more"
];

const ALL_CATEGORIES = [
  'abstract_art_spotlight',
  'knitting_craft_story',
  'emotional_reflection',
  'creative_mindfulness',
  'creator_humor',
  'behind_the_scenes',
  'inspiration_spark',
  'origin_story',
  'transformation_arc'
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readJSON(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function writeJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function contentHash(text) {
  return crypto.createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
}

function extractKeyPhrases(text) {
  // Pull 2-3 word meaningful chunks for overlap detection
  const words = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
  const phrases = [];
  for (let i = 0; i < words.length - 1; i++) {
    phrases.push(`${words[i]} ${words[i + 1]}`);
  }
  // Return a representative sample
  return [...new Set(phrases)].slice(0, 10);
}

function pickCategory(history) {
  const rotation = history.category_rotation?.last_used || {};
  // Sort by most stale (null first, then oldest timestamp)
  const sorted = ALL_CATEGORIES.sort((a, b) => {
    const ta = rotation[a] ? new Date(rotation[a]).getTime() : 0;
    const tb = rotation[b] ? new Date(rotation[b]).getTime() : 0;
    return ta - tb;
  });
  return sorted[0];
}

function pickCTA(history) {
  const rotation = history.cta_rotation?.last_used || {};
  const sorted = CTA_OPTIONS.sort((a, b) => {
    const ta = rotation[a] ? new Date(rotation[a]).getTime() : 0;
    const tb = rotation[b] ? new Date(rotation[b]).getTime() : 0;
    return ta - tb;
  });
  return sorted[0];
}

function recentPostSummaries(history, limit = 30) {
  const posts = history.posts || [];
  return posts
    .slice(-limit)
    .map(p => `[${p.category}] ${(p.bluesky_content || '').substring(0, 120).replace(/\n/g, ' ')}...`)
    .join('\n');
}

function recentHashtagSets(history, limit = 10) {
  return (history.hashtag_sets_used || [])
    .slice(-limit)
    .map(set => set.join(' '))
    .join('\n');
}

// ─── GitHub Models API ────────────────────────────────────────────────────────

function callGitHubModels(messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: MODEL,
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.9,
      max_tokens: 800
    });

    const url = new URL(GITHUB_MODELS_URL);
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`Failed to parse GitHub Models response: ${data.substring(0, 200)}`));
          }
        } else {
          reject(new Error(`GitHub Models API error ${res.statusCode}: ${data.substring(0, 400)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Generation ───────────────────────────────────────────────────────────────

async function generatePost(category, cta, history) {
  const catalogContext = COLLECTIONS
    .map(c => `- ${c.name} (${c.type}): ${c.description} | Themes: ${c.themes.join(', ')}`)
    .join('\n');

  const recentPosts = recentPostSummaries(history);
  const recentHashtags = recentHashtagSets(history);

  const systemPrompt = `You are the creative voice of Abstract Emporium (abstractemporium.art).

BRAND VOICE:
${BRAND_VOICE}

WHAT THE BRAND SELLS:
${catalogContext}

YOUR TASK:
Generate one unique social media post for the category: "${category}"

STRICT RULES:
- The post must be totally unlike any post in the RECENT POST HISTORY below
- Do NOT repeat any ideas, metaphors, hooks, emotional framings, or sentence structures from recent posts
- Do NOT repeat any hashtag sets from the RECENT HASHTAG SETS below
- Bluesky version: max 295 characters (count carefully — this is a hard limit)
- Mastodon version: max 490 characters — can be slightly longer, richer storytelling
- Include the CTA naturally in the post (it should not feel bolted on): "${cta}"
- Choose 2–4 hashtags only. Must not match any set in RECENT HASHTAG SETS
- One field "emotional_theme" — a short label like "slow_making" or "imperfect_is_okay"
- No emojis in bluesky_content (Bluesky character limit is strict — save characters for words)
- Mastodon version may use 1–2 tasteful emojis if they feel natural
- Never fabricate claims, reviews, or outcomes
- The tone must feel like a real person, not a scheduled post

RECENT POST HISTORY (do not repeat these ideas):
${recentPosts}

RECENT HASHTAG SETS (do not repeat these):
${recentHashtags}

OUTPUT FORMAT (JSON only, no markdown):
{
  "bluesky_content": "...",
  "mastodon_content": "...",
  "category": "${category}",
  "cta_type": "...",
  "emotional_theme": "...",
  "hashtags": ["#Tag1", "#Tag2"]
}`;

  const response = await callGitHubModels([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Generate the post now.' }
  ]);

  const raw = response.choices?.[0]?.message?.content;
  if (!raw) throw new Error('Empty response from GitHub Models API');

  return JSON.parse(raw);
}

// ─── Queue helpers ────────────────────────────────────────────────────────────

function nextScheduledTime(queue) {
  const unposted = (queue.posts || []).filter(p => !p.posted && !p.postedAt);
  if (unposted.length === 0) {
    return new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(); // +10h from now
  }
  const last = unposted[unposted.length - 1];
  const lastTime = new Date(last.schedule || Date.now());
  return new Date(lastTime.getTime() + 12 * 60 * 60 * 1000).toISOString();
}

function generateId() {
  return `gen-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is required');
    process.exit(1);
  }

  const history = readJSON(HISTORY_PATH);
  const queue = readJSON(QUEUE_PATH);
  const existingHashes = new Set((history.posts || []).map(p => p.content_hash));

  let generated = 0;
  let attempt = 0;
  const categoryUsed = [];

  while (generated < GENERATE_COUNT && attempt < GENERATE_COUNT * MAX_RETRIES) {
    attempt++;

    const category = pickCategory(history);
    const cta = pickCTA(history);

    console.log(`\n🎨 Generating post #${generated + 1} — category: ${category}`);

    let post;
    let valid = false;
    let validationError = '';

    for (let retry = 0; retry < MAX_RETRIES; retry++) {
      try {
        post = await generatePost(category, cta, history);
        const { passed, reason } = validatePost(post, existingHashes, history);
        if (passed) {
          valid = true;
          break;
        }
        validationError = reason;
        console.warn(`  ⚠️  Validation failed (attempt ${retry + 1}/${MAX_RETRIES}): ${reason}`);
      } catch (err) {
        validationError = err.message;
        console.warn(`  ⚠️  Generation error (attempt ${retry + 1}/${MAX_RETRIES}): ${err.message}`);
      }
    }

    if (!valid) {
      console.error(`  ❌ Skipping post after ${MAX_RETRIES} failed attempts. Last reason: ${validationError}`);
      continue;
    }

    // Build queue entry
    const id = generateId();
    const hash = contentHash(post.bluesky_content);
    const schedule = nextScheduledTime(queue);

    const queueEntry = {
      id,
      content: post.mastodon_content,
      bluesky_content: post.bluesky_content,
      mastodon_content: post.mastodon_content,
      hashtags: post.hashtags || [],
      image: null,
      link: null,
      platforms: ['mastodon', 'bluesky'],
      schedule,
      posted: false,
      postedPlatforms: [],
      postedAt: null,
      blueskyUrl: null,
      blueskyUri: null,
      mastodonUrl: null,
      _generated: true,
      _category: post.category,
      _cta_type: post.cta_type,
      _emotional_theme: post.emotional_theme
    };

    const historyEntry = {
      id,
      timestamp: new Date().toISOString(),
      category: post.category,
      cta_type: post.cta_type,
      emotional_theme: post.emotional_theme,
      bluesky_content: post.bluesky_content,
      mastodon_content: post.mastodon_content,
      hashtags: post.hashtags || [],
      content_hash: hash,
      key_phrases: extractKeyPhrases(post.bluesky_content)
    };

    // Update queue and history in memory
    queue.posts.push(queueEntry);
    history.posts.push(historyEntry);
    existingHashes.add(hash);

    // Update rotation trackers
    const now = new Date().toISOString();
    if (!history.category_rotation) history.category_rotation = { last_used: {} };
    history.category_rotation.last_used[category] = now;
    if (!history.cta_rotation) history.cta_rotation = { last_used: {} };
    history.cta_rotation.last_used[cta] = now;

    // Track hashtag set
    if (!history.hashtag_sets_used) history.hashtag_sets_used = [];
    history.hashtag_sets_used.push(post.hashtags || []);

    categoryUsed.push(category);
    generated++;

    console.log(`  ✅ Generated: [${post.category}] "${post.bluesky_content.substring(0, 60)}..."`);
    console.log(`     Bluesky: ${post.bluesky_content.length} chars | Mastodon: ${post.mastodon_content.length} chars`);
    console.log(`     Hashtags: ${(post.hashtags || []).join(' ')}`);
    console.log(`     Scheduled: ${schedule}`);
  }

  if (generated === 0) {
    console.error('❌ No posts were successfully generated. Exiting without writing files.');
    process.exit(1);
  }

  // Write both files atomically
  writeJSON(QUEUE_PATH, queue);
  writeJSON(HISTORY_PATH, history);

  console.log(`\n✅ Done. Generated ${generated} post(s). Queue and history updated.`);
}

// ─── Inline validation (imported by validate-content.js too) ──────────────────

export function validatePost(post, existingHashes, history) {
  const bluesky = post?.bluesky_content || '';
  const mastodon = post?.mastodon_content || '';

  // Character limits
  if (bluesky.length > 300) {
    return { passed: false, reason: `Bluesky too long: ${bluesky.length} chars (max 300)` };
  }
  if (mastodon.length > 500) {
    return { passed: false, reason: `Mastodon too long: ${mastodon.length} chars (max 500)` };
  }

  // Minimum length sanity check
  if (bluesky.length < 30) {
    return { passed: false, reason: `Bluesky too short: ${bluesky.length} chars` };
  }

  // Required fields
  if (!post.category || !ALL_CATEGORIES.includes(post.category)) {
    return { passed: false, reason: `Invalid or missing category: "${post.category}"` };
  }

  // Uniqueness: exact hash
  const hash = contentHash(bluesky);
  if (existingHashes.has(hash)) {
    return { passed: false, reason: 'Duplicate: exact content hash found in history' };
  }

  // Uniqueness: key-phrase overlap (>40% shared phrases = too similar)
  const newPhrases = new Set(extractKeyPhrases(bluesky));
  const recentEntries = (history.posts || []).slice(-20);
  for (const prev of recentEntries) {
    const prevPhrases = new Set(prev.key_phrases || []);
    const shared = [...newPhrases].filter(p => prevPhrases.has(p));
    if (newPhrases.size > 0 && shared.length / newPhrases.size > 0.4) {
      return { passed: false, reason: `Too similar to post ${prev.id}: ${Math.round(shared.length / newPhrases.size * 100)}% phrase overlap` };
    }
  }

  // Tone: banned phrases
  const BANNED = [
    'revolutionary', 'life-changing', 'life changing', 'game-changer', 'game changer',
    'limited time', 'act now', "don't miss", 'dont miss', 'buy now', 'hurry',
    'exclusive deal', 'as seen on', 'proven results', 'guaranteed', 'best price',
    'only today', 'flash sale'
  ];
  const combined = (bluesky + ' ' + mastodon).toLowerCase();
  for (const banned of BANNED) {
    if (combined.includes(banned)) {
      return { passed: false, reason: `Banned phrase found: "${banned}"` };
    }
  }

  // Link safety: only abstractemporium.art or no link
  const urlMatches = combined.match(/https?:\/\/[^\s]+/g) || [];
  for (const url of urlMatches) {
    if (!url.startsWith('https://abstractemporium.art') && !url.startsWith('http://abstractemporium.art')) {
      return { passed: false, reason: `External URL found: "${url}" — only abstractemporium.art is allowed` };
    }
  }

  // Hashtag count
  const hashtags = post.hashtags || [];
  if (hashtags.length > 5) {
    return { passed: false, reason: `Too many hashtags: ${hashtags.length} (max 5)` };
  }

  return { passed: true, reason: null };
}

main().catch(err => {
  console.error('Fatal error in generate-content.js:', err.message);
  process.exit(1);
});
