/* ============================================================================
   TRANSLATIONS
   ============================================================================
   Pick the language with "language" in config.js: "en", "it", "es", "fr".

   To add one: copy a whole block (e.g. "en"), paste it with a code of your
   choice (e.g. "de"), translate the values and set language: "de".

   {current} and {total} are replaced with the real loading numbers.
   ========================================================================== */

const LOCALES = {

    /* ------------------------------- ENGLISH ------------------------------ */
    en: {
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
    },

    /* ------------------------------- ITALIAN ------------------------------ */
    it: {
        staffTitle: "STAFF",
        panelToggle: "Mostra / nascondi",
        featuredImages: "IMMAGINI IN EVIDENZA",
        progressLabel: "CONNESSIONE IN CORSO",
        status: {
            init: "Inizializzazione…",
            scripts: "Preparazione script…",
            assets: "Caricamento risorse…",
            dataFiles: "Caricamento file dati {current}/{total}",
            map: "Costruzione della mappa…",
            connecting: "Connessione al server…",
            ready: "Pronto!",
        },
        player: {
            noTrack: "Nessuna traccia",
            noTrackHint: "Aggiungi un brano in config.js",
            prev: "Precedente",
            play: "Play / Pausa",
            next: "Successivo",
            volume: "Volume",
        },
    },

    /* ------------------------------- SPANISH ------------------------------ */
    es: {
        staffTitle: "EQUIPO",
        panelToggle: "Mostrar / ocultar",
        featuredImages: "IMÁGENES DESTACADAS",
        progressLabel: "INICIANDO CONEXIÓN",
        status: {
            init: "Inicializando…",
            scripts: "Preparando scripts…",
            assets: "Cargando recursos…",
            dataFiles: "Cargando archivos de datos {current}/{total}",
            map: "Construyendo el mapa…",
            connecting: "Conectando al servidor…",
            ready: "¡Listo!",
        },
        player: {
            noTrack: "Sin pista",
            noTrackHint: "Añade una canción en config.js",
            prev: "Anterior",
            play: "Reproducir / Pausa",
            next: "Siguiente",
            volume: "Volumen",
        },
    },

    /* ------------------------------- FRENCH ------------------------------- */
    fr: {
        staffTitle: "ÉQUIPE",
        panelToggle: "Afficher / masquer",
        featuredImages: "IMAGES À LA UNE",
        progressLabel: "CONNEXION EN COURS",
        status: {
            init: "Initialisation…",
            scripts: "Préparation des scripts…",
            assets: "Chargement des ressources…",
            dataFiles: "Chargement des fichiers de données {current}/{total}",
            map: "Construction de la carte…",
            connecting: "Connexion au serveur…",
            ready: "Prêt !",
        },
        player: {
            noTrack: "Aucune piste",
            noTrackHint: "Ajoutez un morceau dans config.js",
            prev: "Précédent",
            play: "Lecture / Pause",
            next: "Suivant",
            volume: "Volume",
        },
    },

};
