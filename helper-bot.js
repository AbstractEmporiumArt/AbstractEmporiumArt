/**
 * Website Helper Bot
 * Provides automated assistance and support
 */

class AbstractEmporiumBot {
  constructor() {
    this.responses = this.initializeResponses();
    this.conversationHistory = [];
  }

  initializeResponses() {
    return {
      greeting: [
        "Welcome to Abstract Emporium! 🎨 How can I help you today?",
        "Hello! Looking for something specific in our art collection?",
        "Hi there! 👋 What brings you to Abstract Emporium?",
      ],
      gallery: [
        "Our gallery features 38+ artworks from ArtPal and Fine Art America",
        "You can browse our collections by platform using the filters in the Gallery section",
        "Check out our featured collections: Magical Wonderland, Cosmic Series, and Melodic Expressions!",
      ],
      platforms: [
        "We're available on:\n• ArtPal: https://www.artpal.com/Abstractemporium\n• Fine Art America: https://fineartamerica.com/profiles/lissa-beaulieu\n• The HUG: https://thehug.xyz/artists/AbstractEmporiumArt/shop",
        "Our art is sold on multiple platforms - choose your favorite!",
      ],
      contact: [
        "You can reach us at: abstractemporiumarrt@outlook.com",
        "Have questions? Contact us via the Contact form or email us directly!",
        "We respond within 24-48 hours",
      ],
      social: [
        "Follow us on social media:\n• Facebook: https://www.facebook.com/abstractemporium/\n• Instagram: https://www.instagram.com/Abstractemporiumart\n• X/Twitter: https://twitter.com/Abstractempco23",
        "Check out our social media for daily art updates and behind-the-scenes content!",
      ],
      about: [
        "Abstract Emporium is a curated collection of original abstract art and digital collectibles created by Lissa Beaulieu",
        "We offer 100+ artworks across multiple platforms, serving 100+ collectors worldwide",
        "Our mission is to make abstract art accessible and inspiring",
      ],
      help: [
        "I can help you with:\n• Gallery information\n• Platform details\n• Contact information\n• Social media links\n• About our collection\nWhat would you like to know?",
        "Ask me about: gallery, platforms, contact, social media, or about us",
      ],
      notFound: [
        "I'm not sure about that. Try asking about our gallery, platforms, or contact info!",
        "Could you rephrase that? I can help with gallery, platforms, contact, or social media!",
        "I didn't quite understand. Would you like to know about our art collection or platforms?",
      ],
    };
  }

  /**
   * Process user input and generate response
   */
  processInput(userInput) {
    const input = userInput.toLowerCase().trim();
    this.conversationHistory.push({ user: userInput, timestamp: Date.now() });

    // Check for keywords and intent
    if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("hey")
    ) {
      return this.getRandomResponse("greeting");
    }

    if (
      input.includes("gallery") ||
      input.includes("artwork") ||
      input.includes("collection")
    ) {
      return this.getRandomResponse("gallery");
    }

    if (
      input.includes("platform") ||
      input.includes("where") ||
      input.includes("shop") ||
      input.includes("buy")
    ) {
      return this.getRandomResponse("platforms");
    }

    if (
      input.includes("contact") ||
      input.includes("email") ||
      input.includes("reach")
    ) {
      return this.getRandomResponse("contact");
    }

    if (
      input.includes("social") ||
      input.includes("facebook") ||
      input.includes("instagram") ||
      input.includes("twitter") ||
      input.includes("follow")
    ) {
      return this.getRandomResponse("social");
    }

    if (
      input.includes("about") ||
      input.includes("who") ||
      input.includes("mission")
    ) {
      return this.getRandomResponse("about");
    }

    if (
      input.includes("help") ||
      input.includes("what can") ||
      input.includes("how can")
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
      description: "Your personal Abstract Emporium assistant",
      version: "1.0",
    };
  }
}

// Export for use in HTML/JavaScript
if (typeof module !== "undefined" && module.exports) {
  module.exports = AbstractEmporiumBot;
}
