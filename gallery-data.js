// Abstract Emporium Art Gallery Data
const galleryData = [
    // ArtPal - Magical Wonderland Collection
    {
        id: 1,
        title: "Magical Wonderland #1",
        collection: "Magical Wonderland Collection",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-16",
        image: "https://img.artpal.com/167482/16-28-24t.jpg",
        category: "Abstract",
        description: "Part of the Magical Wonderland Collection - 4 piece series"
    },
    {
        id: 2,
        title: "Magical Wonderland #2",
        collection: "Magical Wonderland Collection",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-15",
        image: "https://img.artpal.com/167482/15-36-2t.jpg",
        category: "Abstract",
        description: "Part of the Magical Wonderland Collection - 4 piece series"
    },
    {
        id: 3,
        title: "Magical Wonderland #3",
        collection: "Magical Wonderland Collection",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-14",
        image: "https://img.artpal.com/167482/14-38-34t.jpg",
        category: "Abstract",
        description: "Part of the Magical Wonderland Collection - 4 piece series"
    },
    {
        id: 4,
        title: "Magical Wonderland #4",
        collection: "Magical Wonderland Collection",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-13",
        image: "https://img.artpal.com/167482/13-40-27t.jpg",
        category: "Abstract",
        description: "Part of the Magical Wonderland Collection - 4 piece series"
    },
    // ArtPal - Serenity in Waves
    {
        id: 5,
        title: "Flowing Tranquility",
        collection: "Serenity in Waves",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-11",
        image: "https://img.artpal.com/167482/11-44-49t.jpg",
        category: "Serenity",
        description: "Part of Serenity in Waves Collection - 2 piece series"
    },
    {
        id: 6,
        title: "Serenity in Waves",
        collection: "Serenity in Waves",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-10",
        image: "https://img.artpal.com/167482/10-12-55t.jpg",
        category: "Serenity",
        description: "Part of Serenity in Waves Collection - 2 piece series"
    },
    // ArtPal - Ethereal Kaleidoscope series
    {
        id: 7,
        title: "Chronicles of the Cosmos",
        collection: "Ethereal Kaleidoscope",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-8",
        image: "https://img.artpal.com/167482/8-53-8t.jpg",
        category: "Cosmic",
        description: "Part of Ethereal Kaleidoscope Series - 3 piece collection"
    },
    {
        id: 8,
        title: "Ethereal Whispers",
        collection: "Ethereal Kaleidoscope",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-9",
        image: "https://img.artpal.com/167482/9-55-44t.jpg",
        category: "Ethereal",
        description: "Part of Ethereal Kaleidoscope Series - 3 piece collection"
    },
    {
        id: 9,
        title: "Ethereal Kaleidoscope",
        collection: "Ethereal Kaleidoscope",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-7",
        image: "https://img.artpal.com/167482/7-36-34t.jpg",
        category: "Kaleidoscope",
        description: "Part of Ethereal Kaleidoscope Series - 3 piece collection"
    },
    // ArtPal - Individual Gallery Items
    {
        id: 10,
        title: "Dreamz",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-2",
        image: "https://img.artpal.com/167482/2-44-39t.jpg",
        category: "Dreams",
        description: "A dreamy abstract composition from our gallery collection"
    },
    {
        id: 11,
        title: "Neon Gardenz",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-1",
        image: "https://img.artpal.com/167482/1-47-57t.jpg",
        category: "Neon",
        description: "Vibrant neon colors in a garden-inspired abstract design"
    },
    {
        id: 12,
        title: "Abstract Twist",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-3",
        image: "https://img.artpal.com/167482/3-50-27t.jpg",
        category: "Abstract",
        description: "An unexpected twist on abstract art forms"
    },
    {
        id: 13,
        title: "Radiant Fusion",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-4",
        image: "https://img.artpal.com/167482/4-53-1t.jpg",
        category: "Fusion",
        description: "Where radiance meets abstract fusion"
    },
    {
        id: 14,
        title: "Pure Imagination",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-12",
        image: "https://img.artpal.com/167482/12-49-28t.jpg",
        category: "Imagination",
        description: "Unleash your imagination with this pure abstract piece"
    },
    {
        id: 15,
        title: "Harmony in Contrast",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-6",
        image: "https://img.artpal.com/167482/6-42-33t.jpg",
        category: "Harmony",
        description: "Finding harmony through contrasting elements"
    },
    {
        id: 16,
        title: "Mystic Connections",
        collection: "Gallery",
        platform: "ArtPal",
        link: "https://www.artpal.com/Abstractemporium",
        artpalId: "284761-5",
        image: "https://img.artpal.com/167482/5-32-10t.jpg",
        category: "Mystic",
        description: "Mysterious connections woven through abstract patterns"
    },
    // Fine Art America - Abstract Warrior Cosmic Collection
    {
        id: 17,
        title: "Cosmic #14",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-14-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-14-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 18,
        title: "Cosmic #13",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-13-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-13-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 19,
        title: "Cosmic #12",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-12-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-12-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 20,
        title: "Cosmic #11",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-11-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-11-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 21,
        title: "Cosmic #10",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-10-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-10-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 22,
        title: "Cosmic #9",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-9-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-9-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 23,
        title: "Cosmic #8",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-8-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-8-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 24,
        title: "Cosmic #7",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-7-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-7-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 25,
        title: "Cosmic #6",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-6-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-6-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 26,
        title: "Cosmic #5",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-5-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-5-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 27,
        title: "Cosmic #4",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-4-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-4-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 28,
        title: "Cosmic #3",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-3-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-3-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 29,
        title: "Cosmic #2",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-2-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-2-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    {
        id: 30,
        title: "Cosmic #1",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/cosmic-1-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/cosmic-1-lissa-beaulieu.jpg",
        category: "Cosmic"
    },
    // Fine Art America - Melodic Expressions Collection
    {
        id: 31,
        title: "Vibrant Crescendo",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/vibrant-crescendo-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/vibrant-crescendo-lissa-beaulieu.jpg",
        category: "Music"
    },
    {
        id: 32,
        title: "Pastoral Harmony",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/pastoral-harmony-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/pastoral-harmony-lissa-beaulieu.jpg",
        category: "Music"
    },
    {
        id: 33,
        title: "Harmonic Fusion",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/harmonic-fusion-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/harmonic-fusion-lissa-beaulieu.jpg",
        category: "Music"
    },
    {
        id: 34,
        title: "Radiant Melodies",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/radiant-melodies-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/radiant-melodies-lissa-beaulieu.jpg",
        category: "Music"
    },
    {
        id: 35,
        title: "Spiraling Symphony",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/spiraling-symphony-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/spiraling-symphony-lissa-beaulieu.jpg",
        category: "Music"
    },
    {
        id: 36,
        title: "Rhythmic Connections",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/rhythmic-connections-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/rhythmic-connections-lissa-beaulieu.jpg",
        category: "Music"
    },
    {
        id: 37,
        title: "Infinite Melodies",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/infinite-melodies-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/infinite-melodies-lissa-beaulieu.jpg",
        category: "Music"
    },
    {
        id: 38,
        title: "Harmony of Music",
        collection: "Melodic Expressions",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/harmony-of-music-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/harmony-of-music-lissa-beaulieu.jpg",
        category: "Music",
        description: "Part of Melodic Expressions Series"
    },
    // Fine Art America - Featured Individual Items
    {
        id: 39,
        title: "Serenity",
        collection: "Featured",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/serenity-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/serenity-lissa-beaulieu.jpg",
        category: "Serenity",
        description: "A serene abstract composition"
    },
    {
        id: 40,
        title: "Magical Mountains",
        collection: "Featured",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/magical-mountains-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/magical-mountains-lissa-beaulieu.jpg",
        category: "Landscape",
        description: "Mountain-inspired abstract artwork"
    },
    {
        id: 41,
        title: "Radiant Spectrum",
        collection: "Featured",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/featured/radiant-spectrum-lissa-beaulieu.html",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/3/radiant-spectrum-lissa-beaulieu.jpg",
        category: "Abstract",
        description: "A spectrum of radiant colors and forms"
    },
    // Fine Art America - Abstract Warrior Cosmic Collection (1-14)
    {
        id: 42,
        title: "Abstract Warrior Cosmic #1",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 43,
        title: "Abstract Warrior Cosmic #2",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 44,
        title: "Abstract Warrior Cosmic #3",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 45,
        title: "Abstract Warrior Cosmic #4",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 46,
        title: "Abstract Warrior Cosmic #5",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 47,
        title: "Abstract Warrior Cosmic #6",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 48,
        title: "Abstract Warrior Cosmic #7",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 49,
        title: "Abstract Warrior Cosmic #8",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 50,
        title: "Abstract Warrior Cosmic #9",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 51,
        title: "Abstract Warrior Cosmic #10",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 52,
        title: "Abstract Warrior Cosmic #11",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 53,
        title: "Abstract Warrior Cosmic #12",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 54,
        title: "Abstract Warrior Cosmic #13",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    {
        id: 55,
        title: "Abstract Warrior Cosmic #14",
        collection: "Abstract Warrior Cosmic Collection",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1138398",
        image: null,
        category: "Cosmic",
        description: "Part of Abstract Warrior Cosmic Collection (1-14)"
    },
    // Fine Art America - Melodic Expressions Series (1-8)
    {
        id: 56,
        title: "Melodic Expressions #1",
        collection: "Melodic Expressions Series",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1136162",
        image: null,
        category: "Music",
        description: "Part of Melodic Expressions Series (1-8)"
    },
    {
        id: 57,
        title: "Melodic Expressions #2",
        collection: "Melodic Expressions Series",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1136162",
        image: null,
        category: "Music",
        description: "Part of Melodic Expressions Series (1-8)"
    },
    {
        id: 58,
        title: "Melodic Expressions #3",
        collection: "Melodic Expressions Series",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1136162",
        image: null,
        category: "Music",
        description: "Part of Melodic Expressions Series (1-8)"
    },
    {
        id: 59,
        title: "Melodic Expressions #4",
        collection: "Melodic Expressions Series",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1136162",
        image: null,
        category: "Music",
        description: "Part of Melodic Expressions Series (1-8)"
    },
    {
        id: 60,
        title: "Melodic Expressions #5",
        collection: "Melodic Expressions Series",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1136162",
        image: null,
        category: "Music",
        description: "Part of Melodic Expressions Series (1-8)"
    },
    {
        id: 61,
        title: "Melodic Expressions #6",
        collection: "Melodic Expressions Series",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1136162",
        image: null,
        category: "Music",
        description: "Part of Melodic Expressions Series (1-8)"
    },
    {
        id: 62,
        title: "Melodic Expressions #7",
        collection: "Melodic Expressions Series",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1136162",
        image: null,
        category: "Music",
        description: "Part of Melodic Expressions Series (1-8)"
    },
    {
        id: 63,
        title: "Melodic Expressions #8",
        collection: "Melodic Expressions Series",
        platform: "Fine Art America",
        link: "https://fineartamerica.com/profiles/lissa-beaulieu.html?tab=artworkgalleries&artworkgalleryid=1136162",
        image: null,
        category: "Music",
        description: "Part of Melodic Expressions Series (1-8)"
    },
    // Hug.art - Digital Collectibles
    {
        id: 64,
        title: "Abstract Emporium Digital Collectible #1",
        collection: "Hug.art Collection",
        platform: "Hug.art",
        link: "https://hug.art/artists/AbstractEmporiumArt/updates/eead56ff-baef-48ea-a0ec-660b6428aa1c",
        image: null,
        category: "Digital",
        description: "Digital collectible on Hug.art marketplace"
    },
    {
        id: 65,
        title: "Abstract Emporium Digital Collectible #2",
        collection: "Hug.art Collection",
        platform: "Hug.art",
        link: "https://hug.art/artists/AbstractEmporiumArt/updates/e9cc4596-5885-4e07-9a62-04c0d41334d1",
        image: null,
        category: "Digital",
        description: "Digital collectible on Hug.art marketplace"
    },
    {
        id: 66,
        title: "Abstract Emporium Digital Collectible #3",
        collection: "Hug.art Collection",
        platform: "Hug.art",
        link: "https://hug.art/artists/AbstractEmporiumArt/updates/542d49de-ac0d-4c3e-bd06-02083e780021",
        image: null,
        category: "Digital",
        description: "Digital collectible on Hug.art marketplace"
    },
    {
        id: 67,
        title: "Abstract Emporium Digital Collectible #4",
        collection: "Hug.art Collection",
        platform: "Hug.art",
        link: "https://hug.art/artists/AbstractEmporiumArt/updates/0c8a2854-6256-441d-a5a6-7f50c55e4de2",
        image: null,
        category: "Digital",
        description: "Digital collectible on Hug.art marketplace"
    },
    // RedBubble - Print on Demand Products
    {
        id: 68,
        title: "Abstract Art Collection #1",
        collection: "RedBubble Products",
        platform: "RedBubble",
        link: "https://www.redbubble.com/shop/ap/161508161",
        image: null,
        category: "Print",
        description: "Available on various products at RedBubble"
    },
    {
        id: 69,
        title: "Abstract Art Collection #2",
        collection: "RedBubble Products",
        platform: "RedBubble",
        link: "https://www.redbubble.com/shop/ap/161507864",
        image: null,
        category: "Print",
        description: "Available on various products at RedBubble"
    },
    {
        id: 70,
        title: "Abstract Art Collection #3",
        collection: "RedBubble Products",
        platform: "RedBubble",
        link: "https://www.redbubble.com/shop/ap/161507595",
        image: null,
        category: "Print",
        description: "Available on various products at RedBubble"
    },
    {
        id: 71,
        title: "Abstract Art Collection #4",
        collection: "RedBubble Products",
        platform: "RedBubble",
        link: "https://www.redbubble.com/shop/ap/156026621",
        image: null,
        category: "Print",
        description: "Available on various products at RedBubble"
    },
    {
        id: 72,
        title: "Abstract Art Collection #5",
        collection: "RedBubble Products",
        platform: "RedBubble",
        link: "https://www.redbubble.com/shop/ap/155912649",
        image: null,
        category: "Print",
        description: "Available on various products at RedBubble"
    }
];
