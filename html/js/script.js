/* ============================================================================
   LOADING SCREEN - CORE LOGIC

   No need to edit this file: use js/config.js (settings), js/locales.js
   (texts) and js/themes.js (colors) instead.
   ========================================================================== */

(function () {
    "use strict";

    /* ===============================================================
       DEFAULTS
       Used for any key missing or invalid in config.js, so the loading
       screen always starts.
       =============================================================== */

    const DEFAULTS = {
        language: "en",
        theme: "lime",
        colors: {},
        server: {
            name: "SERVER",
            logo: "img/logo.svg",
        },
        background: {
            type: "particles",
            image: "",
            images: [],
            slideshow: { interval: 6000, fade: 1200 },
            video: "",
            videoMuted: true,
            videoLoop: true,
            overlayOpacity: 0.55,
        },
        progressBar: {
            blocks: 10,
            showPercentage: true,
            realStatus: true,
        },
        panels: {
            musicPlayer: true,
            serverCard: true,
            staff: true,
            featuredImages: true,
            patchNotes: true,
            socials: true,
        },
        musicPlayer: {
            autoplay: true,
            startVolume: 0.4,
            tracks: [],
        },
        staff: [],
        featuredImages: [],
        patchNotes: [],
        socials: [],
    };

    const FALLBACK_LOCALE = {
        staffTitle: "STAFF",
        panelToggle: "Show / hide",
        featuredImages: "FEATURED IMAGES",
        progressLabel: "INITIATING CONNECTION",
        status: {
            init: "Initializing…",
            scripts: "Preparing scripts…",
            assets: "Loading assets…",
            dataFiles: "Loading data files {current}/{total}",
            map: "Building the map…",
            connecting: "Connecting to server…",
            ready: "Ready!",
        },
        player: {
            noTrack: "No track",
            noTrackHint: "Add a song in config.js",
            prev: "Previous",
            play: "Play / Pause",
            next: "Next",
            volume: "Volume",
        },
    };

    function isPlainObject(v) {
        return v !== null && typeof v === "object" && !Array.isArray(v);
    }

    function deepMerge(base, override) {
        if (!isPlainObject(override)) return base;
        const out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
        Object.keys(override).forEach((key) => {
            const oVal = override[key];
            if (oVal === undefined || oVal === null) return;
            out[key] = isPlainObject(oVal) && isPlainObject(base[key])
                ? deepMerge(base[key], oVal)
                : oVal;
        });
        return out;
    }

    const userConfig = (typeof CONFIG !== "undefined" && isPlainObject(CONFIG)) ? CONFIG : {};
    const CFG = deepMerge(DEFAULTS, userConfig);

    if (!isPlainObject(userConfig) || !Object.keys(userConfig).length) {
        console.warn("[loadingscreen] config.js missing or empty: using defaults.");
    }

    /* ===============================================================
       TRANSLATIONS
       =============================================================== */

    const allLocales = (typeof LOCALES !== "undefined" && isPlainObject(LOCALES)) ? LOCALES : {};
    const langCode = allLocales[CFG.language] ? CFG.language : (allLocales.en ? "en" : null);
    const T = deepMerge(
        deepMerge(FALLBACK_LOCALE, allLocales.en || {}),
        langCode ? (allLocales[langCode] || {}) : {}
    );

    if (!allLocales[CFG.language]) {
        console.warn('[loadingscreen] language "' + CFG.language + '" not found in locales.js: falling back to english.');
    }

    // Accepts either "text" or { en: "...", it: "..." }
    function pickText(value) {
        if (typeof value === "string") return value;
        if (isPlainObject(value)) {
            return value[CFG.language] || value.en || value[Object.keys(value)[0]] || "";
        }
        return "";
    }

    function fmt(template, vars) {
        return String(template).replace(/\{(\w+)\}/g, function (m, k) {
            return vars && vars[k] !== undefined ? vars[k] : m;
        });
    }

    /* ===============================================================
       COLORS
       =============================================================== */
    function applyColors() {
        const themes = (typeof THEMES !== "undefined" && isPlainObject(THEMES)) ? THEMES : {};
        const preset = themes[CFG.theme] || themes.lime || {};
        const c = deepMerge(deepMerge(DEFAULTS.colors, preset), CFG.colors || {});

        const root = document.documentElement.style;
        const map = {
            "--accent": c.accent,
            "--accent-soft": c.accentSoft,
            "--bg": c.background,
            "--panel-bg": c.panelBg,
            "--panel-border": c.panelBorder,
            "--text-primary": c.textPrimary,
            "--text-secondary": c.textSecondary,
            "--bar-empty": c.barEmpty,
            "--bar-filled": c.barFilled,
        };
        Object.keys(map).forEach((prop) => {
            if (map[prop]) root.setProperty(prop, map[prop]);
        });
        root.setProperty("--overlay-opacity", CFG.background.overlayOpacity);
        if (c.background) document.body.style.background = c.background;

        applyColors.accent = c.accent || "#d4e83a";
    }

    /* ===============================================================
       BACKGROUND
       =============================================================== */
    function setupBackground() {
        const slideshowEl = document.getElementById("bg-slideshow");
        const videoEl = document.getElementById("bg-video");
        const canvas = document.getElementById("bg-particles");
        const bg = CFG.background;

        slideshowEl.style.display = "none";
        videoEl.style.display = "none";
        canvas.style.display = "none";

        if (bg.type === "video" && bg.video) return setupVideoBackground(videoEl);
        if (bg.type === "slideshow" && Array.isArray(bg.images) && bg.images.length) {
            return setupSlideshowBackground(slideshowEl, bg.images);
        }
        if (bg.type === "image" && bg.image) {
            return setupSlideshowBackground(slideshowEl, [bg.image]);
        }
        setupParticlesBackground(canvas);
    }

    function setupVideoBackground(videoEl) {
        const bg = CFG.background;
        videoEl.style.display = "block";
        videoEl.src = bg.video;
        videoEl.muted = bg.videoMuted !== false;
        videoEl.loop = bg.videoLoop !== false;
        videoEl.play().catch(function () {});
    }

    function setupSlideshowBackground(slideshowEl, images) {
        slideshowEl.style.display = "block";
        const layers = slideshowEl.querySelectorAll(".bg-layer");
        const cfg = CFG.background.slideshow || {};
        const fadeMs = cfg.fade || 1200;
        const intervalMs = cfg.interval || 6000;

        layers.forEach(function (layer) { layer.style.transitionDuration = fadeMs + "ms"; });

        let current = 0;
        layers[0].style.backgroundImage = "url('" + images[0] + "')";
        layers[0].classList.add("active");
        layers[1].classList.remove("active");

        if (images.length <= 1) return;

        let activeLayerIdx = 0;
        setInterval(function () {
            current = (current + 1) % images.length;
            const nextIdx = activeLayerIdx === 0 ? 1 : 0;
            layers[nextIdx].style.backgroundImage = "url('" + images[current] + "')";
            layers[nextIdx].classList.add("active");
            layers[activeLayerIdx].classList.remove("active");
            activeLayerIdx = nextIdx;
        }, intervalMs);
    }

    function setupParticlesBackground(canvas) {
        canvas.style.display = "block";
        const ctx = canvas.getContext("2d");
        let w, h, particles;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function init() {
            resize();
            particles = Array.from({ length: 70 }, function () {
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 1.6 + 0.4,
                    vy: Math.random() * 0.25 + 0.05,
                    a: Math.random() * 0.5 + 0.1,
                };
            });
        }

        function tick() {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = applyColors.accent || "#d4e83a";
            particles.forEach(function (p) {
                p.y -= p.vy;
                if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
                ctx.globalAlpha = p.a;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            requestAnimationFrame(tick);
        }

        window.addEventListener("resize", resize);
        init();
        tick();
    }

    /* ===============================================================
       SERVER INFO / LOGO
       =============================================================== */
    function setupServerInfo() {
        document.querySelectorAll(".about-logo").forEach(function (img) {
            img.src = CFG.server.logo;
        });
        document.getElementById("about-server-name").textContent = pickText(CFG.server.name);
    }

    /* ===============================================================
       PANELS
       =============================================================== */
    function setupPanelVisibility() {
        const map = {
            musicPlayer: ["music-player"],
            serverCard: ["about-card"],
            staff: ["staff-panel"],
            featuredImages: ["featured-images"],
            patchNotes: ["patch-notes"],
            socials: ["socials-wrap"],
        };
        Object.keys(map).forEach(function (key) {
            if (!CFG.panels[key]) return;
            map[key].forEach(function (id) {
                const el = document.getElementById(id);
                if (el) el.classList.remove("hidden");
            });
        });
    }

    /* ===============================================================
       STAFF
       Each entry can point "avatar" at a live Discord CDN URL (see the
       comment in config.js on how to grab one) or a local file. If it's
       missing, or the link fails to load, the picture falls back to the
       person's initials so the layout never breaks.
       =============================================================== */
    function initials(name) {
        const words = String(name || "").trim().split(/\s+/).filter(Boolean);
        if (!words.length) return "?";
        return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
    }

    function setupStaff() {
        const panel = document.getElementById("staff-panel");
        const members = Array.isArray(CFG.staff) ? CFG.staff : [];

        document.getElementById("staff-title").textContent = T.staffTitle;

        if (!members.length) {
            panel.classList.add("hidden");
            return;
        }

        const list = document.getElementById("staff-list");
        list.innerHTML = "";

        members.forEach(function (member) {
            if (!isPlainObject(member)) return;

            const item = document.createElement("div");
            item.className = "staff-item";

            const avatar = document.createElement("div");
            avatar.className = "staff-avatar";

            function showInitials() {
                avatar.innerHTML = "";
                avatar.textContent = initials(member.name);
                avatar.classList.add("staff-avatar-fallback");
            }

            if (member.avatar) {
                const img = document.createElement("img");
                img.src = member.avatar;
                img.alt = "";
                img.addEventListener("error", showInitials, { once: true });
                avatar.appendChild(img);
            } else {
                showInitials();
            }

            const meta = document.createElement("div");
            meta.className = "staff-meta";

            const name = document.createElement("div");
            name.className = "staff-name";
            name.textContent = pickText(member.name);

            const role = document.createElement("div");
            role.className = "staff-role";
            role.textContent = pickText(member.role);

            meta.appendChild(name);
            meta.appendChild(role);
            item.appendChild(avatar);
            item.appendChild(meta);
            list.appendChild(item);
        });
    }

    /* ===============================================================
       PATCH NOTES
       =============================================================== */
    function setupPatchNotes() {
        const list = document.getElementById("patch-notes-list");
        const notes = Array.isArray(CFG.patchNotes) ? CFG.patchNotes : [];
        list.innerHTML = "";

        if (!notes.length) {
            document.getElementById("patch-notes").classList.add("hidden");
            return;
        }

        notes.forEach(function (note) {
            if (!isPlainObject(note)) return;
            const item = document.createElement("div");
            item.className = "patch-item";

            const title = document.createElement("div");
            title.className = "pn-title";
            title.textContent = pickText(note.title);

            const text = document.createElement("div");
            text.className = "pn-text";
            text.textContent = pickText(note.text);

            item.appendChild(title);
            item.appendChild(text);
            list.appendChild(item);
        });
    }

    /* ===============================================================
       FEATURED IMAGES
       =============================================================== */
    function setupFeaturedImages() {
        const section = document.getElementById("featured-images");
        const imgs = Array.isArray(CFG.featuredImages) ? CFG.featuredImages : [];

        document.getElementById("featured-title").textContent = T.featuredImages;

        if (!imgs.length) {
            section.classList.add("hidden");
            return;
        }

        const track = document.getElementById("featured-track");
        const dots = document.getElementById("featured-dots");
        track.innerHTML = "";
        dots.innerHTML = "";

        imgs.forEach(function (src, i) {
            const img = document.createElement("img");
            img.src = src;
            if (i > 0) img.style.display = "none";
            track.appendChild(img);

            const dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");
            dots.appendChild(dot);
        });

        if (imgs.length > 1) {
            let idx = 0;
            setInterval(function () {
                track.children[idx].style.display = "none";
                dots.children[idx].classList.remove("active");
                idx = (idx + 1) % imgs.length;
                track.children[idx].style.display = "block";
                dots.children[idx].classList.add("active");
            }, 4000);
        }
    }

    /* ===============================================================
       SOCIAL
       =============================================================== */
    function setupSocials() {
        const list = document.getElementById("socials-list");
        const icons = (typeof ICONS !== "undefined" && isPlainObject(ICONS)) ? ICONS : {};
        const socials = Array.isArray(CFG.socials) ? CFG.socials : [];
        list.innerHTML = "";

        socials
            .filter(function (s) { return isPlainObject(s) && s.enabled && s.url; })
            .forEach(function (s) {
                const a = document.createElement("a");
                a.className = "social-icon";
                a.href = s.url;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.innerHTML = icons[s.icon] || icons.website || "";
                list.appendChild(a);
            });

        if (!list.children.length) {
            document.getElementById("socials-wrap").classList.add("hidden");
        }
    }

    /* ===============================================================
       MUSIC PLAYER
       With no tracks configured it stays visible but disabled.
       =============================================================== */
    function setupMusicPlayer() {
        const tracks = Array.isArray(CFG.musicPlayer.tracks)
            ? CFG.musicPlayer.tracks.filter(function (t) { return isPlainObject(t) && t.file; })
            : [];

        const titleEl = document.getElementById("mp-title");
        const artistEl = document.getElementById("mp-artist");
        const playBtn = document.getElementById("mp-play");
        const nextBtn = document.getElementById("mp-next");
        const prevBtn = document.getElementById("mp-prev");
        const volSlider = document.getElementById("mp-volume-slider");
        const playerEl = document.getElementById("music-player");

        prevBtn.title = T.player.prev;
        playBtn.title = T.player.play;
        nextBtn.title = T.player.next;
        volSlider.title = T.player.volume;

        const startVolume = typeof CFG.musicPlayer.startVolume === "number"
            ? CFG.musicPlayer.startVolume : 0.4;
        volSlider.value = startVolume;

        if (!tracks.length) {
            titleEl.textContent = T.player.noTrack;
            artistEl.textContent = T.player.noTrackHint;
            [playBtn, nextBtn, prevBtn, volSlider].forEach(function (el) {
                el.disabled = true;
                el.style.opacity = "0.35";
                el.style.cursor = "not-allowed";
            });
            return;
        }

        let idx = 0;
        const audio = new Audio();
        audio.volume = startVolume;

        // The .playing class drives both the play/pause icon and the
        // equalizer, so they always match the real playback state.
        audio.addEventListener("play", function () {
            playerEl.classList.add("playing");
        });
        audio.addEventListener("pause", function () {
            playerEl.classList.remove("playing");
        });
        // Missing or unreadable file: don't leave the UI pretending to play.
        audio.addEventListener("error", function () {
            playerEl.classList.remove("playing");
            console.warn("[loadingscreen] cannot load audio file:", audio.src);
        });

        function load(i, autoplay) {
            idx = (i + tracks.length) % tracks.length;
            const t = tracks[idx];
            audio.src = t.file;
            titleEl.textContent = pickText(t.title) || "—";
            artistEl.textContent = pickText(t.artist) || "";
            if (autoplay) audio.play().catch(function () {});
        }

        playBtn.addEventListener("click", function () {
            if (audio.paused) audio.play().catch(function () {});
            else audio.pause();
        });
        nextBtn.addEventListener("click", function () { load(idx + 1, !audio.paused); });
        prevBtn.addEventListener("click", function () { load(idx - 1, !audio.paused); });
        volSlider.addEventListener("input", function (e) { audio.volume = parseFloat(e.target.value); });
        audio.addEventListener("ended", function () { load(idx + 1, true); });

        load(0, CFG.musicPlayer.autoplay !== false);
    }

    /* ===============================================================
       PANEL VISIBILITY TOGGLES
       Lets the player fully switch the patch notes / staff panels on
       and off (not just collapse them) using the same "hidden" class
       the config-driven visibility already relies on. Runs last, after
       the panels' own setup, so it sees their real starting state:
       disabled in config or emptied of content both count as "off"
       and get no toggle at all.
       =============================================================== */
    function setupPanelControls() {
        const dock = document.getElementById("panel-controls");
        if (!dock) return;
        let anyLeft = false;

        dock.querySelectorAll(".pc-toggle").forEach(function (btn) {
            const target = document.getElementById(btn.dataset.target);
            const available = target && !target.classList.contains("hidden");
            if (!available) {
                btn.remove();
                return;
            }
            anyLeft = true;
            // Start closed: available panels begin hidden, the player opens
            // them from here.
            target.classList.add("hidden");
            btn.classList.remove("is-active");
            btn.title = T.panelToggle;
            btn.addEventListener("click", function () {
                const nowHidden = target.classList.toggle("hidden");
                btn.classList.toggle("is-active", !nowHidden);
            });
        });

        dock.classList.toggle("hidden", !anyLeft);
    }

    /* ===============================================================
       PROGRESS BAR
       =============================================================== */
    const progress = {
        blocksEl: null,
        percentEl: null,
        statusEl: null,
        total: 10,
        genericStatuses: [],
    };

    function setupProgressBar() {
        progress.total = parseInt(CFG.progressBar.blocks, 10) || 10;
        progress.genericStatuses = [
            T.status.init,
            T.status.assets,
            T.status.scripts,
            T.status.map,
            T.status.connecting,
        ];

        document.getElementById("progress-label").textContent = T.progressLabel;
        progress.blocksEl = document.getElementById("progress-blocks");
        progress.percentEl = document.getElementById("progress-percent");
        progress.statusEl = document.getElementById("progress-status");

        progress.blocksEl.style.gridTemplateColumns = "repeat(" + progress.total + ", 1fr)";
        progress.blocksEl.innerHTML = "";
        for (let i = 0; i < progress.total; i++) {
            const block = document.createElement("div");
            block.className = "block";
            progress.blocksEl.appendChild(block);
        }

        if (!CFG.progressBar.showPercentage) {
            progress.percentEl.classList.add("hidden");
        }

        setStatus(T.status.init);
        setProgress(0);
    }

    function setStatus(text) {
        if (progress.statusEl && text) progress.statusEl.textContent = text;
    }

    function setProgress(fraction) {
        fraction = Math.max(0, Math.min(1, fraction));
        const filledCount = Math.round(fraction * progress.total);
        Array.from(progress.blocksEl.children).forEach(function (block, i) {
            block.classList.toggle("filled", i < filledCount);
        });
        progress.percentEl.textContent = Math.round(fraction * 100) + "%";

        if (fraction >= 1) {
            setStatus(T.status.ready);
            return;
        }

        if (!CFG.progressBar.realStatus || !fiveM.gotRealStatus) {
            const list = progress.genericStatuses;
            const i = Math.min(list.length - 1, Math.floor(fraction * list.length));
            setStatus(list[i]);
        }
    }

    /* ===============================================================
       FIVEM EVENTS
       With progressBar.realStatus enabled, the status shown under the
       bar comes from the game's real loading events.
       =============================================================== */
    const fiveM = {
        gotProgress: false,
        gotRealStatus: false,
        dataFilesTotal: 0,
        lastStatusPaint: 0,
        fakeInterval: null,
    };

    function stopFakeProgress() {
        if (!fiveM.fakeInterval) return;
        clearInterval(fiveM.fakeInterval);
        fiveM.fakeInterval = null;
    }

    function setupFiveMEvents() {
        const useReal = CFG.progressBar.realStatus !== false;

        window.addEventListener("message", function (event) {
            const data = event.data;
            if (!data || !data.eventName) return;

            switch (data.eventName) {
                case "loadProgress":
                    fiveM.gotProgress = true;
                    stopFakeProgress();
                    setProgress(data.loadFraction);
                    break;

                case "startInitFunctionOrder":
                case "startInitFunction":
                    if (useReal) { fiveM.gotRealStatus = true; setStatus(T.status.init); }
                    break;

                case "initFunctionInvoking":
                case "initFunctionInvoked":
                    if (useReal) { fiveM.gotRealStatus = true; setStatus(T.status.scripts); }
                    break;

                case "startDataFileEntries":
                    if (useReal) {
                        fiveM.gotRealStatus = true;
                        fiveM.dataFilesTotal = data.count || 0;
                        setStatus(fmt(T.status.dataFiles, { current: 0, total: fiveM.dataFilesTotal }));
                    }
                    break;

                case "onDataFileEntry":
                    if (useReal) {
                        fiveM.gotRealStatus = true;
                        const now = Date.now();
                        if (now - fiveM.lastStatusPaint > 66) {
                            fiveM.lastStatusPaint = now;
                            const total = data.count || fiveM.dataFilesTotal || 0;
                            setStatus(fmt(T.status.dataFiles, {
                                current: data.idx || 0,
                                total: total,
                            }));
                        }
                    }
                    break;

                case "endDataFileEntries":
                    if (useReal) { fiveM.gotRealStatus = true; setStatus(T.status.assets); }
                    break;

                case "performMapLoadFunction":
                    if (useReal) { fiveM.gotRealStatus = true; setStatus(T.status.map); }
                    break;
            }
        });

        // Preview in a regular browser: fake the progress if no event ever
        // arrives from FiveM. Cancelled as soon as a real one does, so a slow
        // client cannot end up with both writing to the bar at once.
        setTimeout(function () {
            if (fiveM.gotProgress) return;
            let fake = 0;
            fiveM.fakeInterval = setInterval(function () {
                fake += Math.random() * 0.08 + 0.02;
                setProgress(fake);
                if (fake >= 1) stopFakeProgress();
            }, 220);
        }, 1200);
    }

    /* ===============================================================
       STARTUP
       =============================================================== */
    function run(label, fn) {
        try {
            fn();
        } catch (err) {
            console.error("[loadingscreen] error in " + label + ":", err);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        run("colors", applyColors);
        run("background", setupBackground);
        run("serverInfo", setupServerInfo);
        run("panels", setupPanelVisibility);
        run("staff", setupStaff);
        run("patchNotes", setupPatchNotes);
        run("featuredImages", setupFeaturedImages);
        run("panelControls", setupPanelControls);
        run("socials", setupSocials);
        run("musicPlayer", setupMusicPlayer);
        run("progressBar", setupProgressBar);
        run("fivemEvents", setupFiveMEvents);
    });
})();
