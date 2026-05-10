(function () {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://abstractemporium.art/#organization",
                name: "Abstract Emporium Art",
                url: "https://abstractemporium.art/",
                logo: "https://abstractemporium.art/logo.jpg",
                email: "mailto:abstractemporiumart@outlook.com",
                sameAs: [
                    "https://www.artpal.com/Abstractemporium/",
                    "https://fineartamerica.com/profiles/lissa-beaulieu/shop",
                    "https://thehug.xyz/artists/AbstractEmporiumArt/shop",
                    "https://ko-fi.com/abstractemporium",
                    "https://www.redbubble.com/people/abstractempco23/explore?asc=u",
                    "https://www.facebook.com/abstractemporium/",
                    "https://www.instagram.com/Abstractemporiumart",
                    "https://x.com/Abstractempco23",
                    "https://bsky.app/profile/abstractemporium.bsky.social",
                    "https://mastodon.social/@abstractemporiumart",
                    "https://pin.it/7s7YE0VeN"
                ],
                contactPoint: [
                    {
                        "@type": "ContactPoint",
                        contactType: "customer support",
                        email: "abstractemporiumart@outlook.com",
                        availableLanguage: ["en"],
                        url: "https://abstractemporium.art/contact.html"
                    }
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://abstractemporium.art/#website",
                url: "https://abstractemporium.art/",
                name: "Abstract Emporium Art",
                publisher: {
                    "@id": "https://abstractemporium.art/#organization"
                },
                inLanguage: "en"
            }
        ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
})();
