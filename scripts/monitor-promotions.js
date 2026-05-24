/**
 * Platform Promotion Monitor
 * Checks shop platforms for active sales, promotions, and deals
 * Feeds data to social media automation and content generation
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Promotion tracking state
const PROMOTIONS_FILE = join(__dirname, '../data/active-promotions.json');
const PROMO_HISTORY_FILE = join(__dirname, '../data/promotion-history.json');

/**
 * Platform-specific promotion detection strategies
 */
const PLATFORM_MONITORS = {
  kofi: {
    name: 'Ko-fi',
    url: 'https://ko-fi.com/abstractemporium',
    checkMethod: 'meta',
    indicators: ['sale', 'discount', 'promo', 'offer', 'limited time', '%', 'off'],
    priority: 'high' // Ko-fi is primary revenue source
  },
  
  fineartamerica: {
    name: 'Fine Art America',
    url: 'https://fineartamerica.com/profiles/lissa-beaulieu/shop',
    checkMethod: 'sitewidePromo',
    // FAA runs platform-wide promotions regularly
    indicators: ['sale', 'discount', 'save', '%', 'off', 'promo code'],
    priority: 'high'
  },
  
  artpal: {
    name: 'ArtPal',
    url: 'https://www.artpal.com/Abstractemporium',
    checkMethod: 'meta',
    indicators: ['sale', 'discount', 'promo', 'special', 'offer'],
    priority: 'medium'
  },
  
  redbubble: {
    name: 'RedBubble',
    url: 'https://www.redbubble.com/people/abstractempco23/explore',
    checkMethod: 'sitewidePromo',
    // RedBubble frequently runs site-wide sales
    indicators: ['sale', 'off', 'discount', 'promo', 'code'],
    priority: 'medium'
  },
  
  thehug: {
    name: 'TheHug.art',
    url: 'https://thehug.xyz/artists/AbstractEmporiumArt/shop',
    checkMethod: 'manual',
    indicators: ['drop', 'mint', 'launch', 'release', 'limited'],
    priority: 'low'
  }
};

/**
 * Load current promotions state
 */
function loadPromotions() {
  if (!fs.existsSync(PROMOTIONS_FILE)) {
    return {
      lastCheck: null,
      active: [],
      platforms: {}
    };
  }
  return JSON.parse(fs.readFileSync(PROMOTIONS_FILE, 'utf8'));
}

/**
 * Save promotions state
 */
function savePromotions(data) {
  const dir = dirname(PROMOTIONS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(PROMOTIONS_FILE, JSON.stringify(data, null, 2));
}

/**
 * Check for Fine Art America site-wide promotions
 * FAA frequently runs platform-wide sales
 */
async function checkFineArtAmericaPromo() {
  return new Promise((resolve) => {
    const url = 'https://fineartamerica.com/';
    
    https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // More aggressive pattern matching for sales
        const patterns = [
          /(\d+)%\s*(off|discount|sale)/i,
          /save\s+(\d+)%/i,
          /(\d+)%\s*off\s+everything/i,
          /sale.*?(\d+)%/i,
          /promo.*?code/i
        ];
        
        let bestMatch = null;
        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match) {
            const discount = match[1] ? match[1] + '%' : null;
            bestMatch = {
              detected: true,
              type: 'sitewide_sale',
              discount,
              description: discount ? `${discount} off sitewide sale` : 'Sitewide promotion active',
              confidence: 'high'
            };
            break;
          }
        }
        
        if (bestMatch) {
          resolve(bestMatch);
        } else if (data.toLowerCase().includes('sale') || data.toLowerCase().includes('promo')) {
          resolve({
            detected: true,
            type: 'potential_sale',
            description: 'Possible promotion detected',
            confidence: 'medium'
          });
        } else {
          resolve({ detected: false });
        }
      });
    }).on('error', () => {
      resolve({ detected: false, error: true });
    });
  });
}

/**
 * Check for RedBubble site-wide promotions
 * RedBubble runs frequent platform sales
 */
async function checkRedBubblePromo() {
  return new Promise((resolve) => {
    const url = 'https://www.redbubble.com/';
    
    https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // More comprehensive pattern matching
        const patterns = [
          /(\d+)%\s*off/i,
          /save\s+(\d+)%/i,
          /(\d+)%\s*off\s+sitewide/i,
          /(\d+)%\s*off\s+everything/i,
          /sale.*?(\d+)%/i
        ];
        
        let bestMatch = null;
        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match && match[1]) {
            bestMatch = {
              detected: true,
              type: 'sitewide_sale',
              discount: match[1] + '%',
              description: `${match[1]}% off site-wide`,
              confidence: 'high'
            };
            break;
          }
        }
        
        if (bestMatch) {
          resolve(bestMatch);
        } else if (data.toLowerCase().includes('sale') || data.toLowerCase().includes('promo code')) {
          resolve({
            detected: true,
            type: 'sale_active',
            description: 'Sale detected on RedBubble',
            confidence: 'medium'
          });
        } else {
          resolve({ detected: false });
        }
      });
    }).on('error', () => {
      resolve({ detected: false, error: true });
    });
  });
}

/**
 * Check for Ko-fi promotions
 * Ko-fi doesn't always have site-wide sales, but check creator shop page
 */
async function checkKofiPromo() {
  return new Promise((resolve) => {
    const url = 'https://ko-fi.com/abstractemporium';
    
    https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Look for sale indicators in shop page
        const patterns = [
          /(\d+)%\s*off/i,
          /sale/i,
          /discount/i,
          /promo/i,
          /special\s+offer/i
        ];
        
        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match) {
            const discount = match[1] ? match[1] + '%' : null;
            resolve({
              detected: true,
              type: 'shop_sale',
              discount,
              description: discount ? `${discount} off Ko-fi shop` : 'Ko-fi shop promotion',
              confidence: 'medium'
            });
            return;
          }
        }
        resolve({ detected: false });
      });
    }).on('error', () => {
      resolve({ detected: false, error: true });
    });
  });
}

/**
 * Check for ArtPal promotions
 * ArtPal occasionally has platform-wide or artist promotions
 */
async function checkArtPalPromo() {
  return new Promise((resolve) => {
    const url = 'https://www.artpal.com/';
    
    https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const patterns = [
          /(\d+)%\s*off/i,
          /save\s+(\d+)%/i,
          /sale/i,
          /promo.*?code/i
        ];
        
        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match) {
            const discount = match[1] ? match[1] + '%' : null;
            resolve({
              detected: true,
              type: 'platform_sale',
              discount,
              description: discount ? `${discount} off on ArtPal` : 'ArtPal promotion active',
              confidence: 'medium'
            });
            return;
          }
        }
        resolve({ detected: false });
      });
    }).on('error', () => {
      resolve({ detected: false, error: true });
    });
  });
}

/**
 * Monitor all platforms for promotions
 */
async function monitorPromotions() {
  console.log('🔍 Checking platforms for active promotions...');
  
  const results = {
    timestamp: new Date().toISOString(),
    platforms: {}
  };
  
  // Check Fine Art America
  console.log('  Checking Fine Art America...');
  results.platforms.fineartamerica = await checkFineArtAmericaPromo();
  
  // Check RedBubble
  console.log('  Checking RedBubble...');
  results.platforms.redbubble = await checkRedBubblePromo();
  
  // Check Ko-fi
  console.log('  Checking Ko-fi...');
  results.platforms.kofi = await checkKofiPromo();
  
  // Check ArtPal
  console.log('  Checking ArtPal...');
  results.platforms.artpal = await checkArtPalPromo();
  
  // TheHug.art requires manual monitoring (NFT/Web3 platform)
  results.platforms.thehug = { detected: false, checkMethod: 'manual' };
  
  return results;
}

/**
 * Update promotion state and detect changes
 */
function updatePromotionState(monitorResults) {
  const currentState = loadPromotions();
  const newActive = [];
  const newPromotions = [];
  const endedPromotions = [];
  
  // Check each platform
  for (const [platform, result] of Object.entries(monitorResults.platforms)) {
    if (result.detected && result.confidence !== 'low') {
      const promo = {
        platform,
        platformName: PLATFORM_MONITORS[platform]?.name || platform,
        type: result.type,
        discount: result.discount || null,
        description: result.description,
        confidence: result.confidence,
        detectedAt: monitorResults.timestamp,
        priority: PLATFORM_MONITORS[platform]?.priority || 'medium'
      };
      
      newActive.push(promo);
      
      // Check if this is a new promotion
      const wasActive = currentState.active?.find(p => 
        p.platform === platform && p.type === result.type
      );
      
      if (!wasActive) {
        newPromotions.push(promo);
        console.log(`  ✨ NEW PROMOTION: ${promo.platformName} - ${promo.description}`);
      }
    }
  }
  
  // Detect ended promotions
  if (currentState.active) {
    for (const oldPromo of currentState.active) {
      const stillActive = newActive.find(p => 
        p.platform === oldPromo.platform && p.type === oldPromo.type
      );
      if (!stillActive) {
        endedPromotions.push(oldPromo);
        console.log(`  📉 ENDED: ${oldPromo.platformName} promotion`);
      }
    }
  }
  
  // Update state
  const newState = {
    lastCheck: monitorResults.timestamp,
    active: newActive,
    platforms: monitorResults.platforms,
    hasNewPromotions: newPromotions.length > 0,
    newPromotions: newPromotions,
    endedPromotions: endedPromotions
  };
  
  savePromotions(newState);
  
  // Update history
  if (newPromotions.length > 0 || endedPromotions.length > 0) {
    updatePromotionHistory(newPromotions, endedPromotions, monitorResults.timestamp);
  }
  
  return newState;
}

/**
 * Update promotion history log
 */
function updatePromotionHistory(newPromotions, endedPromotions, timestamp) {
  let history = { entries: [] };
  
  if (fs.existsSync(PROMO_HISTORY_FILE)) {
    history = JSON.parse(fs.readFileSync(PROMO_HISTORY_FILE, 'utf8'));
  }
  
  const entry = {
    timestamp,
    newPromotions,
    endedPromotions
  };
  
  history.entries.unshift(entry);
  
  // Keep last 100 entries
  if (history.entries.length > 100) {
    history.entries = history.entries.slice(0, 100);
  }
  
  const dir = dirname(PROMO_HISTORY_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(PROMO_HISTORY_FILE, JSON.stringify(history, null, 2));
}

/**
 * Get active promotions for content generation
 */
function getActivePromotions() {
  const state = loadPromotions();
  return state.active || [];
}

/**
 * Main execution
 */
async function main() {
  try {
    const results = await monitorPromotions();
    const state = updatePromotionState(results);
    
    console.log('\n📊 Promotion Monitor Summary:');
    console.log(`   Active promotions: ${state.active.length}`);
    console.log(`   New promotions: ${state.newPromotions.length}`);
    console.log(`   Ended promotions: ${state.endedPromotions.length}`);
    
    if (state.active.length > 0) {
      console.log('\n🎯 Active Promotions:');
      state.active.forEach(promo => {
        console.log(`   • ${promo.platformName}: ${promo.description} (${promo.priority} priority)`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error monitoring promotions:', error.message);
    process.exit(1);
  }
}

// Run if called directly
const isMainModule = import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`;
if (isMainModule || process.argv[1]?.endsWith('monitor-promotions.js')) {
  main();
}

// Export for use in other scripts
export {
  monitorPromotions,
  getActivePromotions,
  loadPromotions,
  PLATFORM_MONITORS
};
