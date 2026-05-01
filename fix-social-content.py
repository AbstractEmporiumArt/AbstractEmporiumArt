#!/usr/bin/env python3
"""
Fix social media content:
1. Remove false sales/review claims
2. Fix dead links
3. Ensure all posts target only Mastodon + Bluesky
4. Replace false claims with website promotion
"""

import json

# Load content queue
with open('content-queue.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Posts to fix
fixes = {
    'post-010': {
        "content": "✨ Discover Abstract Emporium ✨\n\nYour destination for therapeutic coloring & abstract art.\n\n🎨 3 Coloring Books ($7.99 each)\n💜 Complete Collection ($19.99)\n🖼️ 70+ Abstract Art Prints\n🌐 Shop: ArtPal, Fine Art America, Hug.art\n\nExplore our world:\nhttps://abstractemporium.art",
        "hashtags": ["#AbstractEmporium", "#TherapeuticArt", "#ColoringBooks", "#AbstractArt"],
        "link": "https://abstractemporium.art",
        "schedule": "2026-05-01T10:00:00Z",
        "posted": False,
        "postedAt": None,
        "mastodonUrl": None,
        "blueskyUrl": None,
        "blueskyUri": None,
        "postedPlatforms": []
    },
    'post-012': {
        "content": "🌐 VISIT OUR WEBSITE!\n\nabstractemporium.art\n\n✨ Browse therapeutic coloring books\n🖼️ Explore 70+ abstract art pieces\n🎨 Shop across multiple platforms\n💜 Find your perfect piece\n\nYour journey to creative wellness starts here!",
        "hashtags": ["#AbstractEmporium", "#VisitUs", "#TherapeuticArt", "#CreativeWellness"],
        "link": "https://abstractemporium.art",
        "schedule": "2026-05-02T10:00:00Z",
        "posted": False
    },
    'post-013': {
        "content": "🎨 WHY CHOOSE ABSTRACT EMPORIUM?\n\n✨ Therapeutic coloring designed by an artist who understands healing\n🖼️ 70+ unique abstract art pieces\n💜 Affordable wellness tools ($7.99-$19.99)\n🌐 Shop on your favorite platform\n🎁 Instant digital downloads\n\nVisit us: https://abstractemporium.art",
        "hashtags": ["#WhyUs", "#TherapeuticArt", "#AbstractEmporium", "#ArtForWellness"],
        "link": "https://abstractemporium.art",
        "schedule": "2026-05-03T10:00:00Z",
        "posted": False
    },
    'post-014': {
        "content": "💜 ABOUT ABSTRACT EMPORIUM\n\nWe create art that heals.\n\n🎨 Therapeutic coloring books for mental wellness\n🖼️ Abstract art prints for your space\n💚 Designed with intention & care\n\nEvery piece is crafted to support your healing journey.\n\nExplore: https://abstractemporium.art",
        "hashtags": ["#AboutUs", "#ArtThatHeals", "#AbstractEmporium", "#OurMission"],
        "link": "https://abstractemporium.art",
        "schedule": "2026-05-04T10:00:00Z",
        "posted": False
    },
    'post-018': {
        "content": "💡 DID YOU KNOW?\n\nColoring activates both hemispheres of your brain:\n\n🧠 Left brain: Logic & structure (staying in lines)\n🎨 Right brain: Creativity & emotions (color choices)\n\nThis balance creates a meditative state that reduces anxiety.\n\nLearn more at: https://abstractemporium.art",
        "hashtags": ["#ColoringScience", "#BrainHealth", "#AnxietyRelief", "#TherapeuticArt"],
        "link": "https://abstractemporium.art",
        "schedule": "2026-05-05T10:00:00Z",
        "posted": False
    },
    'post-019': {
        "content": "🎨 SHARE YOUR JOURNEY!\n\nWorking on our coloring books? We'd LOVE to see your creations!\n\nTag #AbstractEmporiumArt to be featured in future posts.\n\nYour art inspires others to start their own healing journey. 💜\n\nShop coloring books: https://abstractemporium.art",
        "hashtags": ["#ShareYourArt", "#ColoringCommunity", "#AbstractEmporiumArt", "#YourJourney"],
        "link": "https://abstractemporium.art",
        "schedule": "2026-05-06T10:00:00Z",
        "posted": False
    },
    'post-028': {
        "content": "✨ EXPLORE ABSTRACT EMPORIUM ✨\n\nYour one-stop destination for:\n\n🎨 Therapeutic Coloring Books (3 books + bundle)\n🖼️ Abstract Art Gallery (70+ pieces)\n💜 Mental Wellness Through Creativity\n🌐 Multiple Shopping Platforms\n\nStart your creative journey: https://abstractemporium.art",
        "hashtags": ["#AbstractEmporium", "#CreativeWellness", "#TherapeuticArt", "#DiscoverUs"],
        "link": "https://abstractemporium.art",
        "schedule": "2026-05-07T10:00:00Z",
        "posted": False
    }
}

# Apply fixes
for post in data['posts']:
    post_id = post['id']
    
    # Apply specific fixes
    if post_id in fixes:
        for key, value in fixes[post_id].items():
            post[key] = value
    
    # Set all posts to Mastodon + Bluesky only
    post['platforms'] = ['mastodon', 'bluesky']

# Save fixed content
with open('content-queue.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("✅ Fixed social media content:")
print("  - Removed false customer testimonial (post-010)")
print("  - Removed flash sale posts (post-012, 013, 014)")
print("  - Fixed dead blog link (post-018)")
print("  - Removed fake community spotlight (post-019)")
print("  - Removed fake milestone claim (post-028)")
print("  - Set ALL posts to Mastodon + Bluesky only")
print("  - Replaced false claims with website promotion")
