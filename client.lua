--[[ ==========================================================================
     LOADING SCREEN SHUTDOWN

     Keeps the screen up until the player is actually in the city, instead of
     closing while the map is still popping in.

     To go back to the standard FiveM behaviour, set
     loadscreen_manual_shutdown 'no' in the fxmanifest and remove this script.
========================================================================== ]]

local Config = {
    -- Extra seconds to wait after the session is ready.
    -- Raise it to keep the loading screen visible for longer.
    extraDelay = 2,

    -- Safety net: close the screen anyway after this many seconds.
    maxWait = 120,
}

local shutdownDone = false

local function CloseLoadingScreen()
    if shutdownDone then return end
    shutdownDone = true

    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end

CreateThread(function()
    local waited = 0

    while not NetworkIsSessionStarted() do
        Wait(200)
        waited = waited + 0.2

        if waited >= Config.maxWait then
            CloseLoadingScreen()
            return
        end
    end

    if Config.extraDelay > 0 then
        Wait(Config.extraDelay * 1000)
    end

    CloseLoadingScreen()
end)
