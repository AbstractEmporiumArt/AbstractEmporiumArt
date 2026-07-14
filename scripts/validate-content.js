#!/usr/bin/env node

/**
 * Abstract Emporium — Content Validation CLI
 *
 * Standalone validator. Can validate a single post JSON from stdin or a file.
 * Also used by generate-content.js (imports validatePost).
 *
 * Usage:
 *   echo '{"bluesky_content":"...","mastodon_content":"...","category":"creator_humor","hashtags":["#Art"]}' | node scripts/validate-content.js
 *   node scripts/validate-content.js --file path/to/post.json
 *   node scripts/validate-content.js --queue   (validate all unposted queue entries)
 */

import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const HISTORY_PATH = join(ROOT, 'data', 'content-history.json');
const QUEUE_PATH = join(ROOT, 'content-queue.json');

const ALL_CATEGORIES = [
  'abstract_art_spotlight',
  'knitting_craft_story',
  'emotional_reflection',
  'creative_mindfulness',
  'creator_humor',
  'behind_the_scenes',
  'inspiration_spark',
  'origin_story',
  'transformation_arc',
  'promotion_spotlight',   // ponytail: added to match generator; was missing
  'z3nw1ck_spotlight'      // ponytail: dedicated Z3NW1CK push since launch 2026-07
];

const BANNED_PHRASES = [
  'revolutionary', 'life-changing', 'life changing', 'game-changer', 'game changer',
  'limited time', 'act now', "don't miss", 'dont miss', 'buy now', 'hurry',
  'exclusive deal', 'as seen on', 'proven results', 'guaranteed', 'best price',
  'only today', 'flash sale'
];

// ─── Helpers (duplicated here so validate-content.js works standalone) ────────

function contentHash(text) {
  return crypto.createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
}

function extractKeyPhrases(text) {
  const words = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
  const phrases = [];
  for (let i = 0; i < words.length - 1; i++) {
    phrases.push(`${words[i]} ${words[i + 1]}`);
  }
  return [...new Set(phrases)].slice(0, 10);
}

// ─── Core validation ──────────────────────────────────────────────────────────

export function validatePost(post, existingHashes, history) {
  const bluesky = post?.bluesky_content || '';
  const mastodon = post?.mastodon_content || '';
  const countChars = (text) => Array.from(text || '').length;

  if (countChars(bluesky) > 220) {
    return { passed: false, reason: `Bluesky too long: ${countChars(bluesky)} chars (max 220)` };
  }
  if (countChars(mastodon) > 400) {
    return { passed: false, reason: `Mastodon too long: ${countChars(mastodon)} chars (max 400)` };
  }
  if (countChars(bluesky) < 30) {
    return { passed: false, reason: `Bluesky too short: ${countChars(bluesky)} chars` };
  }
  if (!post.category || !ALL_CATEGORIES.includes(post.category)) {
    return { passed: false, reason: `Invalid or missing category: "${post.category}"` };
  }

  const hash = contentHash(bluesky);
  if (existingHashes && existingHashes.has(hash)) {
    return { passed: false, reason: 'Duplicate: exact content hash found in history' };
  }

  if (history) {
    const newPhrases = new Set(extractKeyPhrases(bluesky));
    const recentEntries = (history.posts || []).slice(-20);
    for (const prev of recentEntries) {
      const prevPhrases = new Set(prev.key_phrases || []);
      const shared = [...newPhrases].filter(p => prevPhrases.has(p));
      if (newPhrases.size > 0 && shared.length / newPhrases.size > 0.4) {
        return {
          passed: false,
          reason: `Too similar to post ${prev.id}: ${Math.round(shared.length / newPhrases.size * 100)}% phrase overlap`
        };
      }
    }
  }

  const combined = (bluesky + ' ' + mastodon).toLowerCase();
  for (const banned of BANNED_PHRASES) {
    if (combined.includes(banned)) {
      return { passed: false, reason: `Banned phrase found: "${banned}"` };
    }
  }

  const urlMatches = combined.match(/https?:\/\/[^\s]+/g) || [];
  for (const url of urlMatches) {
    if (!url.startsWith('https://abstractemporium.art') && !url.startsWith('http://abstractemporium.art')) {
      return { passed: false, reason: `External URL: "${url}" — only abstractemporium.art is allowed` };
    }
  }

  const hashtags = post.hashtags || [];
  if (hashtags.length > 4) {
    return { passed: false, reason: `Too many hashtags: ${hashtags.length} (max 4)` };
  }

  return { passed: true, reason: null };
}

// ─── Queue validation mode ────────────────────────────────────────────────────

function validateQueue() {
  const history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
  const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
  const existingHashes = new Set((history.posts || []).map(p => p.content_hash));

  const unposted = (queue.posts || []).filter(p => !p.posted && !p.postedAt);
  console.log(`\n🔍 Validating ${unposted.length} unposted queue entries...\n`);

  let passed = 0;
  let failed = 0;

  for (const entry of unposted) {
    // Legacy posts: use content field as both platforms if new fields absent
    const post = {
      bluesky_content: entry.bluesky_content || entry.content,
      mastodon_content: entry.mastodon_content || entry.content,
      category: entry._category || 'behind_the_scenes',
      hashtags: entry.hashtags || []
    };

    // Skip character limit checks for legacy posts (they may use different format)
    const result = entry._generated
      ? (() => {
          // Exclude the current entry from uniqueness checks when validating queued posts.
          const scopedHashes = new Set(
            (history.posts || [])
              .filter(p => p.id !== entry.id)
              .map(p => p.content_hash)
          );
          const scopedHistory = {
            ...history,
            posts: (history.posts || []).filter(p => p.id !== entry.id)
          };
          return validatePost(post, scopedHashes, scopedHistory);
        })()
      : { passed: true, reason: 'legacy post — skipped full validation' };

    if (result.passed) {
      passed++;
      console.log(`  ✅ ${entry.id}: OK`);
    } else {
      failed++;
      console.log(`  ❌ ${entry.id}: ${result.reason}`);
    }
  }

  console.log(`\nResult: ${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

// ─── CLI entry point ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--queue')) {
  validateQueue();
} else if (args.includes('--file')) {
  const filePath = args[args.indexOf('--file') + 1];
  if (!filePath) {
    console.error('❌ --file requires a path argument');
    process.exit(1);
  }
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
  const existingHashes = new Set((history.posts || []).map(p => p.content_hash));
  const result = validatePost(post, existingHashes, history);
  console.log(result.passed ? `✅ Valid` : `❌ Invalid: ${result.reason}`);
  if (!result.passed) process.exit(1);
} else {
  // Read from stdin
  let raw = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { raw += chunk; });
  process.stdin.on('end', () => {
    try {
      const post = JSON.parse(raw);
      const history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
      const existingHashes = new Set((history.posts || []).map(p => p.content_hash));
      const result = validatePost(post, existingHashes, history);
      console.log(result.passed ? `✅ Valid` : `❌ Invalid: ${result.reason}`);
      if (!result.passed) process.exit(1);
    } catch (err) {
      console.error('❌ Failed to parse input:', err.message);
      process.exit(1);
    }
  });
}
