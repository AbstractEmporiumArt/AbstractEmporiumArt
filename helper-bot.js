/**
 * Website Helper Bot - Enhanced Version
 * Intelligent assistant for Abstract Emporium Art
 * Provides navigation, recommendations, and support
 */

class AbstractEmporiumBot {
  constructor() {
    this.responses = this.initializeResponses();
    this.conversationHistory = [];
    this.userPreferences = {
      viewedItems: [],
      preferredPlatform: null,
    };
  }

  initializeResponses() {
    return {
      greeting: [
        "Welcome to Abstract Emporium! 🎨 I'm here to help you explore our collections. Would you like to browse our gallery, learn about a specific collection, or need help finding something?",
        "Hello! 👋 I can help you navigate our art collections from ArtPal and Fine Art America, or answer questions about our work. What interests you?",
        "Hi there! Welcome to Abstract Emporium! I can help you find artworks, learn about our collections, or guide you through the site. What can I assist with?",
      ],
      gallery: [
        "Our gallery features 41+ artworks across two platforms:\n\n🎨 **ArtPal Collections:**\n• Magical Wonderland (4 pieces)\n• Serenity in Waves (2 pieces)\n• Ethereal Kaleidoscope (3 pieces)\n• Gallery Items (12 individual pieces)\n\n🖼️ **Fine Art America Collections:**\n• Featured Items: Serenity, Magical Mountains, Radiant Spectrum\n• Abstract Warrior Cosmic (14 pieces)\n• Melodic Expressions (8 pieces)\n\nYou can visit gallery.html to browse with filters by platform, or ask me about specific collections!",
        "We have 41 artworks available! I recommend:\n\n✨ **For first-time visitors:** Check out 'Neon Gardenz' on ArtPal or 'Serenity' on Fine Art America\n\n🌟 **For collectors:** Browse our full Cosmic Collection (14 pieces) or Melodic Expressions series (8 pieces)\n\n💫 **For inspiration:** Explore the Magical Wonderland collection\n\nWould you like details about any specific collection?",
        "Browse our complete collection in the Gallery! You can filter by:\n• ArtPal (16 items across multiple collections)\n• Fine Art America (25 items including featured pieces and collections)\n• All items have individual detail pages where you can save favorites, like, and share!\n\nWhich platform or collection interests you?",
      ],
      artpal: [
        "🎨 **ArtPal Collections:**\n\n1. **Magical Wonderland** - 4-piece whimsical collection\n2. **Serenity in Waves** - 2-piece peaceful series\n3. **Ethereal Kaleidoscope** - 3-piece abstract trilogy\n4. **Gallery Items** - 12 individual featured pieces including Neon Gardenz, Dreamz, and Pure Imagination\n\n👉 Visit: https://www.artpal.com/Abstractemporium/\n\nEach item has its own detail page where you can zoom, like, and save for later!",
        "ArtPal is one of our primary platforms! We have 16 artworks there including:\n• Individual prints and digital art\n• Full collection galleries\n• Limited and special editions\n\nFeatured pieces to explore:\n✨ Neon Gardenz\n✨ Pure Imagination\n✨ Radiant Fusion\n✨ Mystic Connections\n\nClick any gallery item's 'View Shop' button to see it on ArtPal!",
      ],
      fineartamerica: [
        "🖼️ **Fine Art America Collections:**\n\n1. **Featured Items** - Serenity, Magical Mountains, Radiant Spectrum\n2. **Abstract Warrior Cosmic** - 14-piece epic collection\n3. **Melodic Expressions** - 8-piece musical series\n\n👉 Visit: https://fineartamerica.com/profiles/lissa-beaulieu/shop\n\nFine Art America offers:\n• Canvas prints\n• Framed prints\n• Apparel\n• Posters and more!\n\nEach item can be customized and printed on various media!",
        "Fine Art America is perfect if you want prints and merchandise! We have 25 pieces available:\n\n🌟 Start with our featured items:\n• Serenity (peaceful abstract)\n• Magical Mountains (landscape-inspired)\n• Radiant Spectrum (vibrant abstract)\n\n📚 Then explore full collections:\n• Cosmic Collection (14 pieces) - perfect for sci-fi lovers\n• Melodic Expressions (8 pieces) - for music enthusiasts\n\nWhat type of art appeals to you most?",
      ],
      browse: [
        "📍 **How to browse our collections:**\n\n1. Go to **Gallery** in the navigation\n2. Use the filter buttons to view:\n   - All items\n   - ArtPal only\n   - Fine Art America only\n3. Click **'Details'** to see the full item page with zoom, related items, and engagement features\n4. Click **'View Shop'** to purchase on the platform\n5. Use **'Save for Later'** to bookmark favorites!\n\nEach item detail page has:\n💾 Save for Later\n🛒 Add to Cart\n❤️ Like/engagement tracking\n📤 Share with friends\n🔍 Zoom on image",
        "Start exploring in three easy steps:\n\n✅ **Step 1:** Visit gallery.html\n✅ **Step 2:** Browse items or filter by platform\n✅ **Step 3:** Click any item for full details, zoom, and purchase options\n\nTips:\n• Try filtering by 'ArtPal' or 'Fine Art America'\n• Look for collection groups to see related items\n• Use item detail pages to save favorites\n• Share items with friends using the share button!",
      ],
      platforms: [
        "🛍️ **Where to buy our art:**\n\n🎨 **ArtPal**\n• Digital downloads\n• Limited editions\n• Visit: https://www.artpal.com/Abstractemporium/\n\n🖼️ **Fine Art America**\n• Canvas & framed prints\n• Apparel & merchandise\n• Posters & wall art\n• Visit: https://fineartamerica.com/profiles/lissa-beaulieu/shop\n\n✨ **The HUG**\n• Digital art community\n• Digital collectibles\n• Visit: https://thehug.xyz/artists/AbstractEmporiumArt/shop\n\nEach platform has unique products and collections!",
        "We sell on three amazing platforms:\n\n1. **ArtPal** (Best for digital art)\n2. **Fine Art America** (Best for prints & merchandise)\n3. **The HUG** (Best for digital collectors)\n\nWhich platform interests you most? I can share direct links to specific collections!",
      ],
      contact: [
        "📧 **Get in touch with us:**\n\n✉️ Email: abstractemporiumart@outlook.com\n⏱️ Response time: 24-48 hours\n\n💬 You can also:\n• Use the Contact form on this website\n• Message us on social media\n• Leave a comment on our artwork\n\nWe love hearing from art collectors and enthusiasts!",
        "Want to reach out? Here's how:\n\n📧 **Email:** abstractemporiumart@outlook.com\n\n🌐 **Contact form:** Available in the Contact section of this site\n\n📱 **Social media:**\n• Facebook: https://www.facebook.com/abstractemporium/\n• Instagram: https://www.instagram.com/Abstractemporiumart\n• Twitter: https://twitter.com/Abstractempco23\n\nFeel free to ask questions, share feedback, or just say hello!",
      ],
      social: [
        "📱 **Follow us for daily updates:**\n\n📘 **Facebook**\nhttps://www.facebook.com/abstractemporium/\n\n📷 **Instagram**\nhttps://www.instagram.com/Abstractemporiumart\n• Behind-the-scenes art process\n• New releases\n• Artist updates\n\n𝕏 **Twitter/X**\nhttps://twitter.com/Abstractempco23\n• News & announcements\n• Community engagement\n\nFollow us to stay updated with new collections!",
        "Stay connected! 🎨\n\n• **Instagram** (@Abstractemporiumart) - Our main platform for daily content\n• **Facebook** - Community and engagement\n• **Twitter** (@Abstractempco23) - News and updates\n\nFeel free to like, follow, and share our work with friends!",
      ],
      about: [
        "🎨 **About Abstract Emporium:**\n\n**Creator:** Lissa Beaulieu\n**Focus:** Original abstract digital art\n**Mission:** Make inspiring abstract art accessible to collectors worldwide\n\n**Collections:**\n• 41+ original artworks\n• Multiple platforms (ArtPal, Fine Art America, The HUG)\n• Diverse styles and themes\n\n**What makes us special:**\n✨ High-quality original digital art\n✨ Available as digital downloads, prints, merchandise, and digital collectibles\n✨ Interactive community features (like, save, share)\n✨ Regular new releases\n\n**Our philosophy:** Art should inspire, connect, and be accessible to everyone.",
        "**Welcome to Abstract Emporium!**\n\nWe're a digital art studio creating original abstract artwork that inspires and delights collectors around the world. With over 40 pieces across multiple platforms, we offer something for every abstract art enthusiast.\n\nWhether you're looking for:\n• Digital downloads\n• High-quality prints\n• Wearable art\n• Digital collectibles\n\n...we've got you covered! Browse our collections and find your favorite piece today.",
      ],
      features: [
        "✨ **Site Features:**\n\n🎨 **Gallery** - Browse 41+ artworks with lazy loading\n🖼️ **Individual Item Pages** - Full details, zoom, engagement tracking\n🎯 **Platform Filters** - View by ArtPal or Fine Art America\n💾 **Save for Later** - Bookmark your favorite pieces\n🛒 **Cart System** - Build your collection\n❤️ **Like System** - Track your favorite artworks\n📤 **Share** - Tell friends about pieces you love\n🎨 **Pattern Maker** - Convert art to knitting/crochet patterns\n🎭 **Community Canvas** - Collaborative art experience\n💬 **Help Bot** - Me! Ask me anything\n\nExplore any feature by visiting the navigation menu!",
        "🚀 **Cool things you can do on our site:**\n\n1. **Browse galleries** with beautiful lazy-loaded images\n2. **Zoom in** on artwork details\n3. **Save favorites** to your personal collection\n4. **Like & engage** with pieces\n5. **Generate patterns** from artwork for crafting\n6. **Participate** in community art\n7. **Shop** directly on our partner platforms\n8. **Share** artworks with friends\n\nWant to try any of these? I can guide you!",
      ],
      help: [
        "🤖 **I can help you with:**\n\n✅ **Navigation** - Finding pages and features\n✅ **Collections** - Learning about our artworks\n✅ **Platforms** - Where to buy and how\n✅ **Social media** - Follow us for updates\n✅ **Contact** - How to reach out\n✅ **Features** - What you can do on the site\n✅ **Recommendations** - Finding art you'll love\n✅ **Questions** - Ask me anything about Abstract Emporium!\n\nWhat would you like help with?",
        "I'm here to help! 🎨 You can ask me about:\n\n• **Gallery & Collections** - What artworks we have\n• **Where to Shop** - ArtPal, Fine Art America, The HUG\n• **How to Browse** - Navigation tips and tricks\n• **About Us** - Our story and mission\n• **Getting in Touch** - Contact information\n• **Features** - What's available on the site\n• **Recommendations** - Personalized suggestions\n\nJust ask! 😊",
      ],
      recommend: [
        "🌟 **My recommendations for you:**\n\nIf you love **vibrant colors**: Try 'Neon Gardenz' or 'Radiant Spectrum'\nIf you love **peaceful art**: Explore 'Serenity' or 'Flowing Tranquility'\nIf you love **cosmic themes**: Check out the 'Abstract Warrior Cosmic' collection (14 pieces!)\nIf you love **music vibes**: Browse 'Melodic Expressions' series (8 pieces)\nIf you love **whimsy**: Explore 'Magical Wonderland' collection\n\nNeed more specific recommendations? Tell me what you like!",
        "Based on what I know about great art, I'd recommend:\n\n✨ **Start here:**\n- Neon Gardenz (vibrant & energetic)\n- Serenity (peaceful & meditative)\n- Radiant Fusion (balanced & beautiful)\n\n📚 **Then explore:**\n- Full collections that match your favorite\n- Related items in the same series\n- Items on different platforms\n\nWhat style of abstract art appeals to you most?",
      ],
      notFound: [
        "I'm not sure about that, but I can help! 🤔\n\nTry asking me about:\n• **Gallery** - Browse our collections\n• **ArtPal** or **Fine Art America** - Where to buy\n• **How to browse** - Navigation tips\n• **Collections** - Learn about specific series\n• **Contact** - How to reach us\n• **Recommendations** - Finding art you'll love\n\nOr just ask another question!",
        "Hmm, I didn't quite catch that. 😊 \n\nI'm best at helping with:\n✅ Finding artworks\n✅ Navigating the site\n✅ Learning about collections\n✅ Shopping information\n✅ General questions\n\nWhat would you like to know about Abstract Emporium?",
      ],
    };
  }

  /**
   * Process user input and generate intelligent response
   */
  processInput(userInput) {
    const input = userInput.toLowerCase().trim();
    this.conversationHistory.push({ user: userInput, timestamp: Date.now() });

    // Check for specific keywords and intents
    if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("hey") ||
      input.includes("welcome")
    ) {
      return this.getRandomResponse("greeting");
    }

    if (
      input.includes("artpal") &&
      !input.includes("fine art america")
    ) {
      return this.getRandomResponse("artpal");
    }

    if (
      input.includes("fine art america") ||
      input.includes("fineartamerica")
    ) {
      return this.getRandomResponse("fineartamerica");
    }

    if (
      input.includes("browse") ||
      input.includes("how to") ||
      input.includes("navigate")
    ) {
      return this.getRandomResponse("browse");
    }

    if (
      input.includes("gallery") ||
      input.includes("artwork") ||
      input.includes("collection") ||
      input.includes("items") ||
      input.includes("pieces")
    ) {
      return this.getRandomResponse("gallery");
    }

    if (
      input.includes("platform") ||
      input.includes("where") ||
      input.includes("shop") ||
      input.includes("buy") ||
      input.includes("purchase")
    ) {
      return this.getRandomResponse("platforms");
    }

    if (
      input.includes("contact") ||
      input.includes("email") ||
      input.includes("reach") ||
      input.includes("message")
    ) {
      return this.getRandomResponse("contact");
    }

    if (
      input.includes("social") ||
      input.includes("facebook") ||
      input.includes("instagram") ||
      input.includes("twitter") ||
      input.includes("follow") ||
      input.includes("x.com")
    ) {
      return this.getRandomResponse("social");
    }

    if (
      input.includes("about") ||
      input.includes("who") ||
      input.includes("mission") ||
      input.includes("story")
    ) {
      return this.getRandomResponse("about");
    }

    if (
      input.includes("feature") ||
      input.includes("can i") ||
      input.includes("what can")
    ) {
      return this.getRandomResponse("features");
    }

    if (
      input.includes("recommend") ||
      input.includes("suggest") ||
      input.includes("like") ||
      input.includes("love") ||
      input.includes("favorite")
    ) {
      return this.getRandomResponse("recommend");
    }

    if (
      input.includes("help") ||
      input.includes("assist")
    ) {
      return this.getRandomResponse("help");
    }

    return this.getRandomResponse("notFound");
  }

  /**
   * Get random response from category
   */
  getRandomResponse(category) {
    const responses = this.responses[category] || this.responses.notFound;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Get bot personality
   */
  getPersonality() {
    return {
      name: "Abstract Bot",
      emoji: "🤖",
      description: "Your helpful Abstract Emporium assistant",
      version: "2.0",
      capabilities: [
        "Gallery navigation",
        "Collection recommendations",
        "Platform information",
        "Site features guide",
        "Contact assistance",
        "Social media links",
      ],
    };
  }
}

// Export for use in HTML/JavaScript
if (typeof module !== "undefined" && module.exports) {
  module.exports = AbstractEmporiumBot;
}
