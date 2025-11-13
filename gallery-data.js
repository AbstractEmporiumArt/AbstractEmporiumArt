// Abstract Emporium Art Gallery Data
const galleryData = [
    // ArtPal - Magical Wonderland Collection
    {
        id: 1,
        title: "Magical Wonderland #1",
        collection: "Magical Wonderland Collection",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-16",
        image: "https://img.artpal.com/284761/Magical-Wonderland-1.jpg",
        category: "Abstract"
    },
    {
        id: 2,
        title: "Magical Wonderland #2",
        collection: "Magical Wonderland Collection",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-15",
        image: "https://img.artpal.com/284761/Magical-Wonderland-2.jpg",
        category: "Abstract"
    },
    {
        id: 3,
        title: "Magical Wonderland #3",
        collection: "Magical Wonderland Collection",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-14",
        image: "https://img.artpal.com/284761/Magical-Wonderland-3.jpg",
        category: "Abstract"
    },
    {
        id: 4,
        title: "Magical Wonderland #4",
        collection: "Magical Wonderland Collection",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-13",
        image: "https://img.artpal.com/284761/Magical-Wonderland-4.jpg",
        category: "Abstract"
    },
    // ArtPal - Serenity in Waves
    {
        id: 5,
        title: "Flowing Tranquility - Art Set",
        collection: "Serenity in Waves",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-11",
        image: "https://img.artpal.com/284761/Flowing-Tranquility.jpg",
        category: "Serenity"
    },
    {
        id: 6,
        title: "Serenity in Waves - Art Set",
        collection: "Serenity in Waves",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-10",
        image: "https://img.artpal.com/284761/Serenity-in-Waves.jpg",
        category: "Serenity"
    },
    // ArtPal - Ethereal Kaleidoscope series
    {
        id: 7,
        title: "Chronicles of the Cosmos",
        collection: "Ethereal Kaleidoscope",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-8",
        image: "https://img.artpal.com/284761/Chronicles-of-the-Cosmos.jpg",
        category: "Cosmic"
    },
    {
        id: 8,
        title: "Ethereal Whispers",
        collection: "Ethereal Kaleidoscope",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-9",
        image: "https://img.artpal.com/284761/Ethereal-Whispers.jpg",
        category: "Ethereal"
    },
    {
        id: 9,
        title: "Ethereal Kaleidoscope",
        collection: "Ethereal Kaleidoscope",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-7",
        image: "https://img.artpal.com/284761/Ethereal-Kaleidoscope.jpg",
        category: "Kaleidoscope"
    },
    // ArtPal - Gallery Collection
    {
        id: 10,
        title: "Dreamz",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-2",
        image: "https://img.artpal.com/284761/Dreamz.jpg",
        category: "Dreams"
    },
    {
        id: 11,
        title: "Neon Gardenz",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-1",
        image: "https://img.artpal.com/284761/Neon-Gardenz.jpg",
        category: "Neon"
    },
    {
        id: 12,
        title: "Abstract Twist",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-3",
        image: "https://img.artpal.com/284761/Abstract-Twist.jpg",
        category: "Abstract"
    },
    {
        id: 13,
        title: "Radiant Fusion",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-4",
        image: "https://img.artpal.com/284761/Radiant-Fusion.jpg",
        category: "Fusion"
    },
    {
        id: 14,
        title: "Pure Imagination",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-12",
        image: "https://img.artpal.com/284761/Pure-Imagination.jpg",
        category: "Imagination"
    },
    {
        id: 15,
        title: "Harmony in Contrast",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-6",
        image: "https://img.artpal.com/284761/Harmony-in-Contrast.jpg",
        category: "Harmony"
    },
    {
        id: 16,
        title: "Mystic Connections",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium?i=284761-5",
        image: "https://img.artpal.com/284761/Mystic-Connections.jpg",
        category: "Mystic"
    },
    // Fine Art America - Abstract Warrior Cosmic Collection
    {
        id: 17,
        title: "Cosmic #14",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-14-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 18,
        title: "Cosmic #13",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-13-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 19,
        title: "Cosmic #12",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-12-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 20,
        title: "Cosmic #11",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-11-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 21,
        title: "Cosmic #10",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-10-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 22,
        title: "Cosmic #9",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-9-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 23,
        title: "Cosmic #8",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-8-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 24,
        title: "Cosmic #7",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-7-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 25,
        title: "Cosmic #6",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-6-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 26,
        title: "Cosmic #5",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-5-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 27,
        title: "Cosmic #4",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-4-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 28,
        title: "Cosmic #3",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-3-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 29,
        title: "Cosmic #2",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-2-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    {
        id: 30,
        title: "Cosmic #1",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-1-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/abstract-warrior-cosmic-collection-lissa-beaulieu-1693422973.jpg",
        category: "Cosmic"
    },
    // Fine Art America - Melodic Expressions Collection
    {
        id: 31,
        title: "Vibrant Crescendo",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/vibrant-crescendo-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/melodic-expressions-lissa-beaulieu-1692195071.jpg",
        category: "Music"
    },
    {
        id: 32,
        title: "Pastoral Harmony",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/pastoral-harmony-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/melodic-expressions-lissa-beaulieu-1692195071.jpg",
        category: "Music"
    },
    {
        id: 33,
        title: "Harmonic Fusion",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/harmonic-fusion-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/melodic-expressions-lissa-beaulieu-1692195071.jpg",
        category: "Music"
    },
    {
        id: 34,
        title: "Radiant Melodies",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/radiant-melodies-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/melodic-expressions-lissa-beaulieu-1692195071.jpg",
        category: "Music"
    },
    {
        id: 35,
        title: "Spiraling Symphony",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/spiraling-symphony-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/melodic-expressions-lissa-beaulieu-1692195071.jpg",
        category: "Music"
    },
    {
        id: 36,
        title: "Rhythmic Connections",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/rhythmic-connections-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/melodic-expressions-lissa-beaulieu-1692195071.jpg",
        category: "Music"
    },
    {
        id: 37,
        title: "Infinite Melodies",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/infinite-melodies-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/melodic-expressions-lissa-beaulieu-1692195071.jpg",
        category: "Music"
    },
    {
        id: 38,
        title: "Harmony of Music",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/harmony-of-music-lissa-beaulieu.html",
        image: "https://images.fineartamerica.com/images/artworkgallerylogos/2/melodic-expressions-lissa-beaulieu-1692195071.jpg",
        category: "Music"
    }
];
