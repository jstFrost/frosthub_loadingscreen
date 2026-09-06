/* ============================================================================
   COLOR PRESETS
   ============================================================================
   Pick the preset with "theme" in config.js (e.g. theme: "cyan").

   Anything you set in CONFIG.colors ALWAYS takes precedence over the preset,
   so you can start from a preset and change just one or two shades.

   To create your own preset: copy a block below, rename it and reference it
   from config.js.
   ========================================================================== */

const THEMES = {

    /* Lime green - street racing style (default) */
    lime: {
        accent:        "#d4e83a",
        accentSoft:    "rgba(212, 232, 58, 0.15)",
        background:    "#0a0b0a",
        panelBg:       "rgba(10, 12, 10, 0.72)",
        panelBorder:   "rgba(212, 232, 58, 0.25)",
        textPrimary:   "#f2f4ec",
        textSecondary: "rgba(242, 244, 236, 0.6)",
        barEmpty:      "rgba(255, 255, 255, 0.08)",
        barFilled:     "#d4e83a",
    },

    /* Cyan - cold tech / cyberpunk style */
    cyan: {
        accent:        "#3ad9e8",
        accentSoft:    "rgba(58, 217, 232, 0.15)",
        background:    "#070b0d",
        panelBg:       "rgba(8, 14, 18, 0.72)",
        panelBorder:   "rgba(58, 217, 232, 0.25)",
        textPrimary:   "#ecf7fa",
        textSecondary: "rgba(236, 247, 250, 0.6)",
        barEmpty:      "rgba(255, 255, 255, 0.08)",
        barFilled:     "#3ad9e8",
    },

    /* Red - aggressive / mafia RP style */
    crimson: {
        accent:        "#ff3b4e",
        accentSoft:    "rgba(255, 59, 78, 0.15)",
        background:    "#0c0708",
        panelBg:       "rgba(16, 8, 10, 0.72)",
        panelBorder:   "rgba(255, 59, 78, 0.25)",
        textPrimary:   "#faecee",
        textSecondary: "rgba(250, 236, 238, 0.6)",
        barEmpty:      "rgba(255, 255, 255, 0.08)",
        barFilled:     "#ff3b4e",
    },

    /* Purple - nightlife / nightclub style */
    violet: {
        accent:        "#a56bff",
        accentSoft:    "rgba(165, 107, 255, 0.16)",
        background:    "#09070d",
        panelBg:       "rgba(14, 10, 20, 0.72)",
        panelBorder:   "rgba(165, 107, 255, 0.25)",
        textPrimary:   "#f1ecfa",
        textSecondary: "rgba(241, 236, 250, 0.6)",
        barEmpty:      "rgba(255, 255, 255, 0.08)",
        barFilled:     "#a56bff",
    },

    /* Amber - warm style / desert, trucking, western */
    amber: {
        accent:        "#ffab2e",
        accentSoft:    "rgba(255, 171, 46, 0.15)",
        background:    "#0d0a06",
        panelBg:       "rgba(18, 13, 8, 0.72)",
        panelBorder:   "rgba(255, 171, 46, 0.25)",
        textPrimary:   "#faf2e8",
        textSecondary: "rgba(250, 242, 232, 0.6)",
        barEmpty:      "rgba(255, 255, 255, 0.08)",
        barFilled:     "#ffab2e",
    },

    /* Icy white - clean and minimal style */
    ice: {
        accent:        "#dceaf5",
        accentSoft:    "rgba(220, 234, 245, 0.14)",
        background:    "#08090a",
        panelBg:       "rgba(12, 14, 16, 0.72)",
        panelBorder:   "rgba(220, 234, 245, 0.22)",
        textPrimary:   "#f4f7fa",
        textSecondary: "rgba(244, 247, 250, 0.6)",
        barEmpty:      "rgba(255, 255, 255, 0.08)",
        barFilled:     "#dceaf5",
    },

};
