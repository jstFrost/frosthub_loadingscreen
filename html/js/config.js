/* ============================================================================
   LOADING SCREEN - CONFIGURATION FILE
   ============================================================================
   Edit only this file to customize language, colors, texts, socials and
   panels. You never need to touch the CSS or JS.

   NOTE: if you delete or mistype an entry in here, the loading screen will
   NOT break: every missing key automatically falls back to a safe default.
   Feel free to remove any section you don't use.
   ========================================================================== */

const CONFIG = {

    /* --------------------------------------------------------------------
       LANGUAGE
       Included: "en" (english), "it" (italian), "es" (spanish),
       "fr" (french). Texts live in js/locales.js, where you can also add
       your own language.
       -------------------------------------------------------------------- */
    language: "en",

    /* --------------------------------------------------------------------
       COLOR PRESET
       Presets available in js/themes.js:
         "lime"    - lime green, street racing style (default)
         "cyan"    - cyan, tech / cyberpunk style
         "crimson" - red, aggressive style
         "violet"  - purple, nightlife style
         "amber"   - amber, warm style
         "ice"     - icy white, minimal style
       -------------------------------------------------------------------- */
    theme: "lime",

    /* --------------------------------------------------------------------
       CUSTOM COLORS (optional)
       Anything you set here OVERRIDES the preset chosen above.
       Leave the block empty ({}) to use the preset as is, or specify only
       the shades you want to change, e.g.:  { accent: "#00ff88" }
       -------------------------------------------------------------------- */
    colors: {
        // accent:        "#d4e83a",   // main color
        // accentSoft:    "rgba(212, 232, 58, 0.15)",
        // background:    "#0a0b0a",
        // panelBg:       "rgba(10, 12, 10, 0.72)",
        // panelBorder:   "rgba(212, 232, 58, 0.25)",
        // textPrimary:   "#f2f4ec",
        // textSecondary: "rgba(242, 244, 236, 0.6)",
        // barEmpty:      "rgba(255, 255, 255, 0.08)",
        // barFilled:     "#d4e83a",
    },

    /* --------------------------------------------------------------------
       SERVER
       -------------------------------------------------------------------- */
    server: {
        name: "FROST HUB",
        logo: "img/logo.svg",          // logo path (svg/png/jpg)
    },

    /* --------------------------------------------------------------------
       BACKGROUND
       "type" decides what is displayed:
         "particles"  -> animated particles (no file needed)
         "image"      -> a single static image
         "slideshow"  -> several images cycling one at a time (crossfade)
         "video"      -> a looping video background
       Put your files in html/img/ and reference the relative path.
       -------------------------------------------------------------------- */
    background: {
        type: "image",

        // used when type: "image"
        image: "img/background.jpg",

        // used when type: "slideshow" - list 2 or more images
        images: [
            // "img/background1.jpg",
            // "img/background2.jpg",
            // "img/background3.jpg",
        ],
        slideshow: {
            interval: 6000,   // ms each image stays on screen
            fade: 1200,       // ms of crossfade between images
        },

        // used when type: "video" (mp4/webm recommended, keep it light)
        video: "img/background.mp4",
        videoMuted: true,     // must stay true to guarantee autoplay
        videoLoop: true,

        // Dark overlay on top of the background (0 = clear, 1 = solid black)
        overlayOpacity: 0.55,
    },

    /* --------------------------------------------------------------------
       PROGRESS BAR
       The label above the bar and the status messages are translated
       automatically: edit them in js/locales.js.
       -------------------------------------------------------------------- */
    progressBar: {
        blocks: 10,              // number of blocks
        showPercentage: true,    // show the percentage
        realStatus: true,        // show what the game is actually loading,
                                 // using the native FiveM events (data files,
                                 // map, scripts). Set to false for generic
                                 // messages based only on the percentage.
    },

    /* --------------------------------------------------------------------
       PANELS - show/hide each section
       "serverCard" is the small card with your logo and server name at the
       top right; it is independent from the staff list below it.
       -------------------------------------------------------------------- */
    panels: {
        musicPlayer:    true,
        serverCard:     true,
        staff:          true,
        featuredImages: true,
        patchNotes:     true,
        socials:        true,
    },

    /* --------------------------------------------------------------------
       MUSIC PLAYER (bottom left)
       Put the audio files in html/sounds/ and list them in "tracks".
       With autoplay:true the first track starts as soon as the screen opens.
       -------------------------------------------------------------------- */
    musicPlayer: {
        autoplay: true,
        startVolume: 0.4,
        tracks: [
            // Replace "title" and "artist" with the real track info.
            { title: "Track 1", artist: "Unknown artist", file: "sounds/track1.mp3" },
            // { title: "Another one", artist: "Other artist", file: "sounds/track2.mp3" },
        ],
    },

    /* --------------------------------------------------------------------
       FEATURED IMAGES - image carousel on the right
       -------------------------------------------------------------------- */
    featuredImages: [
        // "img/featured1.jpg",
        // "img/featured2.jpg",
    ],

    /* --------------------------------------------------------------------
       STAFF - shown on the right, replaces the old "about us" text.
       "role" accepts a plain string or one per language, same as patch
       notes. "avatar" is meant to be the person's real Discord avatar:

         1. Open Discord, right-click their profile picture
         2. Choose "Copy Avatar URL"
         3. Paste it here as-is (it looks like
            https://cdn.discordapp.com/avatars/123456789012345678/xxxx.png)

       Since it's a live link to Discord's CDN, it updates automatically
       if that person changes their avatar - nothing to re-upload. If a
       link ever breaks (deleted account, wrong URL, ...) the picture is
       replaced with the person's initials, so the layout never breaks.
       You can also point "avatar" to a local file in html/img/ instead.
       -------------------------------------------------------------------- */
    staff: [
        // {
        //     name: "YourName",
        //     role: { en: "Owner", it: "Fondatore", es: "Fundador", fr: "Fondateur" },
        //     avatar: "https://cdn.discordapp.com/avatars/123456789012345678/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.png?size=128",
        // },
        // {
        //     name: "AnotherName",
        //     role: "Head Admin",
        //     avatar: "https://cdn.discordapp.com/avatars/123456789012345678/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.png?size=128",
        // },
    ],

    /* --------------------------------------------------------------------
       PATCH NOTES - scrolling list on the left
       "title" and "text" also accept either a plain string or an object
       with one version per language, e.g.:
         { title: { en: "UPDATE", it: "AGGIORNAMENTO" }, text: { ... } }
       -------------------------------------------------------------------- */
    patchNotes: [
        {
            title: "PATCH NOTES",
            text: {
                en: "New roleplay area added downtown.",
                it: "Aggiunta nuova area di roleplay in centro città.",
                es: "Nueva zona de rol añadida en el centro.",
                fr: "Nouvelle zone de roleplay ajoutée au centre-ville.",
            },
        },
        {
            title: "PATCH NOTES",
            text: {
                en: "Economy and job payout rebalanced.",
                it: "Bilanciamento economia e job payout.",
                es: "Economía y pagos de trabajos reequilibrados.",
                fr: "Rééquilibrage de l'économie et des paies.",
            },
        },
        {
            title: "PATCH NOTES",
            text: {
                en: "Various fixes on vehicles and collisions.",
                it: "Fix vari su veicoli e collisioni.",
                es: "Varias correcciones en vehículos y colisiones.",
                fr: "Divers correctifs sur les véhicules et collisions.",
            },
        },
        {
            title: "PATCH NOTES",
            text: {
                en: "New staff commands and UI improvements.",
                it: "Nuovi comandi per lo staff e miglioramenti UI.",
                es: "Nuevos comandos de staff y mejoras de interfaz.",
                fr: "Nouvelles commandes staff et améliorations de l'interface.",
            },
        },
    ],

    /* --------------------------------------------------------------------
       SOCIALS - simply add or remove a line from this array.
       "icon" must match a key defined in js/icons.js
       (discord, twitter, instagram, youtube, twitch, tiktok, kick,
        website, facebook). You can add new icons in icons.js.
       -------------------------------------------------------------------- */
    socials: [
        { icon: "instagram", url: "https://instagram.com/yourpage",  enabled: true },
        { icon: "discord",   url: "https://discord.gg/yourinvite",   enabled: true },
        { icon: "twitter",   url: "https://x.com/yourpage",          enabled: true },
        { icon: "youtube",   url: "https://youtube.com/@yourchannel",enabled: true },
        { icon: "twitch",    url: "https://twitch.tv/yourchannel",   enabled: true },
        { icon: "tiktok",    url: "https://tiktok.com/@yourpage",    enabled: false },
        { icon: "kick",      url: "https://kick.com/yourchannel",    enabled: false },
        { icon: "website",   url: "https://yourserver.com",          enabled: false },
    ],

};
