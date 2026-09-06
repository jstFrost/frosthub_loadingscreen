fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'frosthub_loadingscreen'
author 'jstFrost'
description 'Custom Loading Screen (QBCore / QBX compatible)'
version '1.1.0'

-- Loading screens are standalone: they run before any framework loads, so this
-- works the same on QBCore and QBX with no dependencies.

loadscreen 'html/index.html'

-- 'yes' = the screen stays until client.lua closes it (no map pop-in).
-- Set it to 'no' if you prefer FiveM to close it as soon as loading ends.
loadscreen_manual_shutdown 'yes'

-- Shows the mouse cursor on the loading screen. Required to let players
-- click the social links and use the music player controls.
loadscreen_cursor 'yes'

client_script 'client.lua'

files {
    'html/index.html',
    'html/css/style.css',
    'html/js/config.js',
    'html/js/locales.js',
    'html/js/themes.js',
    'html/js/icons.js',
    'html/js/script.js',
    'html/fonts/*.woff2',
    'html/fonts/*.woff',
    'html/img/*.svg',
    'html/img/*.png',
    'html/img/*.jpg',
    'html/img/*.jpeg',
    'html/img/*.webp',
    'html/img/*.gif',
    'html/img/*.mp4',
    'html/img/*.webm',
    'html/sounds/*.mp3',
    'html/sounds/*.ogg',
}
