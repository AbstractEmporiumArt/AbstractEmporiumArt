(function () {
    const SITE_DOMAIN = "abstractemporium.art";
    const SCHEMA_VERSION = "1.0.0";
    const MARKETPLACE_HOSTS = [
        "artpal.com",
        "fineartamerica.com",
        "thehug.xyz",
        "hug.art",
        "ko-fi.com",
        "redbubble.com"
    ];

    const EVENT_NAMES = {
        OUTBOUND_CLICK: "ae_outbound_click",
        CTA_CLICK: "ae_cta_click",
        FORM_VIEW: "ae_form_view",
        FORM_SUBMIT_ATTEMPT: "ae_form_submit_attempt",
        FORM_SUBMIT_SUCCESS: "ae_form_submit_success",
        FORM_SUBMIT_ERROR: "ae_form_submit_error",
        SUPPORT_PAYMENT_ATTEMPT: "ae_support_payment_attempt"
    };

    const FORM_TYPES = {
        BREVO: "newsletter_brevo",
        CONTACT: "contact",
        COMMISSION: "commission",
        COMMUNITY: "community_signup",
        PATTERN_EMAIL: "pattern_email",
        FREE_GUIDE: "free_guide",
        SUPPORT_PAYPAL: "support_paypal",
        UNKNOWN: "unknown"
    };

    window.dataLayer = window.dataLayer || [];

    function getPageType() {
        const path = window.location.pathname.toLowerCase();
        if (path.endsWith("/") || path.includes("index.html")) return "home";
        if (path.includes("gallery")) return "gallery";
        if (path.includes("item-detail")) return "artwork_detail";
        if (path.includes("shop-everywhere")) return "marketplace_hub";
        if (path.includes("shop")) return "shop";
        if (path.includes("contact")) return "contact";
        if (path.includes("commissions")) return "commissions";
        if (path.includes("blog-post")) return "blog_post";
        if (path.includes("blog")) return "blog";
        if (path.includes("pattern")) return "pattern";
        if (path.includes("features")) return "features";
        return "other";
    }

    function basePayload() {
        return {
            schema_version: SCHEMA_VERSION,
            site_name: "Abstract Emporium Art",
            page_type: getPageType(),
            page_path: window.location.pathname,
            page_title: document.title || ""
        };
    }

    function pushEvent(eventName, payload) {
        const eventPayload = Object.assign(
            {
                event: eventName,
                event_name: eventName
            },
            basePayload(),
            payload || {}
        );

        window.dataLayer.push(eventPayload);

        if (typeof window.gtag === "function") {
            window.gtag("event", eventName, eventPayload);
        }

        if (window.clarity && typeof window.clarity === "function") {
            window.clarity("event", eventName);
        }
    }

    function isMarketplaceHost(hostname) {
        const host = (hostname || "").toLowerCase();
        return MARKETPLACE_HOSTS.some((h) => host.includes(h));
    }

    function platformFromHost(hostname) {
        const host = (hostname || "").toLowerCase();
        if (host.includes("artpal.com")) return "artpal";
        if (host.includes("fineartamerica.com")) return "fine_art_america";
        if (host.includes("thehug.xyz") || host.includes("hug.art")) return "thehug";
        if (host.includes("ko-fi.com")) return "kofi";
        if (host.includes("redbubble.com")) return "redbubble";
        return "external";
    }

    function addUtmParams(urlString, campaign) {
        try {
            const url = new URL(urlString, window.location.origin);
            if (url.hostname.toLowerCase().includes(SITE_DOMAIN)) {
                return urlString;
            }
            if (!isMarketplaceHost(url.hostname)) {
                return urlString;
            }

            const content = (window.location.pathname || "/").replace(/^\//, "") || "home";
            if (!url.searchParams.has("utm_source")) {
                url.searchParams.set("utm_source", SITE_DOMAIN);
            }
            if (!url.searchParams.has("utm_medium")) {
                url.searchParams.set("utm_medium", "referral");
            }
            if (!url.searchParams.has("utm_campaign")) {
                url.searchParams.set("utm_campaign", campaign || "marketplace_click");
            }
            if (!url.searchParams.has("utm_content")) {
                url.searchParams.set("utm_content", content);
            }
            return url.toString();
        } catch (err) {
            return urlString;
        }
    }

    function inferFormType(form) {
        if (!form) return FORM_TYPES.UNKNOWN;
        const id = (form.id || "").toLowerCase();
        if (id === "sib-form") return FORM_TYPES.BREVO;
        if (id === "contactform") return FORM_TYPES.CONTACT;
        if (id === "commissionsform") return FORM_TYPES.COMMISSION;
        if (id === "communitysignupform") return FORM_TYPES.COMMUNITY;
        if (id === "patternemailform") return FORM_TYPES.PATTERN_EMAIL;
        if (id === "freeguideform") return FORM_TYPES.FREE_GUIDE;
        if ((form.action || "").toLowerCase().includes("paypal.com")) return FORM_TYPES.SUPPORT_PAYPAL;
        return FORM_TYPES.UNKNOWN;
    }

    function trackFormView(form, formType) {
        if (!form || form.dataset.aeFormViewTracked === "true") return;
        form.dataset.aeFormViewTracked = "true";
        pushEvent(EVENT_NAMES.FORM_VIEW, {
            event_category: "form",
            funnel_stage: "awareness",
            form_type: formType,
            form_id: form.id || ""
        });
    }

    function trackFormSubmitAttempt(form, formType) {
        pushEvent(EVENT_NAMES.FORM_SUBMIT_ATTEMPT, {
            event_category: "form",
            funnel_stage: "intent",
            form_type: formType,
            form_id: form.id || "",
            form_action: form.getAttribute("action") || ""
        });
    }

    function bindKnownForms() {
        const forms = document.querySelectorAll("form");
        forms.forEach(function (form) {
            const formType = inferFormType(form);
            trackFormView(form, formType);
            form.addEventListener("submit", function () {
                if (formType === FORM_TYPES.SUPPORT_PAYPAL) {
                    pushEvent(EVENT_NAMES.SUPPORT_PAYMENT_ATTEMPT, {
                        event_category: "support",
                        funnel_stage: "intent",
                        form_type: formType,
                        form_id: form.id || "",
                        form_action: form.getAttribute("action") || ""
                    });
                    return;
                }
                trackFormSubmitAttempt(form, formType);
            });
        });
    }

    function bindCustomFormStatusEvents() {
        window.addEventListener("ae_form_submit_success", function (event) {
            const detail = event && event.detail ? event.detail : {};
            pushEvent(EVENT_NAMES.FORM_SUBMIT_SUCCESS, {
                event_category: "form",
                funnel_stage: "conversion",
                form_type: detail.form_type || FORM_TYPES.UNKNOWN,
                form_id: detail.form_id || "",
                form_destination: detail.form_destination || ""
            });
        });

        window.addEventListener("ae_form_submit_error", function (event) {
            const detail = event && event.detail ? event.detail : {};
            pushEvent(EVENT_NAMES.FORM_SUBMIT_ERROR, {
                event_category: "form",
                funnel_stage: "intent",
                form_type: detail.form_type || FORM_TYPES.UNKNOWN,
                form_id: detail.form_id || "",
                error_context: detail.error_context || "unknown"
            });
        });
    }

    function trackOutboundClick(anchor) {
        if (!anchor || !anchor.href) return;

        const updatedUrl = addUtmParams(anchor.href, "marketplace_click");
        if (updatedUrl !== anchor.href) {
            anchor.href = updatedUrl;
        }

        try {
            const url = new URL(anchor.href, window.location.origin);
            const platform = platformFromHost(url.hostname);

            if (isMarketplaceHost(url.hostname)) {
                pushEvent(EVENT_NAMES.OUTBOUND_CLICK, {
                    event_category: "outbound",
                    funnel_stage: "consideration",
                    platform: platform,
                    destination_host: url.hostname,
                    destination_url: url.toString(),
                    link_text: (anchor.textContent || "").trim().slice(0, 120)
                });
            }

            if (url.pathname.includes("commissions.html") || anchor.dataset.trackCta === "commission") {
                pushEvent(EVENT_NAMES.CTA_CLICK, {
                    event_category: "cta",
                    funnel_stage: "intent",
                    cta_type: "commission",
                    cta_text: (anchor.textContent || "").trim().slice(0, 120),
                    destination_url: url.toString()
                });
            }
        } catch (err) {
            // no-op
        }
    }

    function bindLinkTracking() {
        const anchors = document.querySelectorAll("a[href]");
        anchors.forEach(function (anchor) {
            const href = anchor.getAttribute("href") || "";
            if (!href || href.startsWith("#")) return;
            anchor.addEventListener("click", function () {
                trackOutboundClick(anchor);
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        bindLinkTracking();
        bindKnownForms();
        bindCustomFormStatusEvents();
    });
})();
