import { Howl } from "howler";
import { SETTINGS } from "./settings";

export const sounds = async () => {
    const sfx = (await import("/sfx/sfx.ogg?url")).default
    return new Howl({
        src: [sfx],
        sprite: {
            click: [0, 47],
            switch: [48, 58],
        },
    })
    
}

export const menu = async () => {
    const mus = (await import("/sfx/menu.ogg?url")).default
    return new Howl({
        src: [mus],
        loop: true
    })
}

export const gameMusic = async () => {
    const mus = (await import("/sfx/game.ogg?url")).default
    return new Howl({
        src: [mus],
        sprite: {
            main: [0, 43631],
            loop: [1282, 43631]
        },
        loop: false,
    })
}

var currentlyPlayingMusic: [Howl | null, string?];
export const playMusic = (resource: Howl, sprite?: string) => {
    currentlyPlayingMusic = [resource, sprite]
    if (SETTINGS.muteSounds) return

    if (sprite)
        resource.play(sprite)
    else
        resource.play()
}

export const stopMusic = (fadeout = 0, destroy = false) => {
    if (!currentlyPlayingMusic[0]) return

    if (fadeout)
        currentlyPlayingMusic[0].fade(1, 0, fadeout)
    else
        currentlyPlayingMusic[0].stop()

    // unloads the music
    if (destroy) {
        currentlyPlayingMusic[0].unload()
        currentlyPlayingMusic = [null, ""]
    }
}

export const toggleVolume = () => {
    SETTINGS.muteSounds = !SETTINGS.muteSounds

    if (!currentlyPlayingMusic[0]) return
    if (!SETTINGS.muteSounds) {
        if (currentlyPlayingMusic) {
            if (currentlyPlayingMusic[1])
                currentlyPlayingMusic[0].play(currentlyPlayingMusic[1])
            else
                currentlyPlayingMusic[0].play()
        }
    } else {
        currentlyPlayingMusic[0].stop()
    }
}

// menu: [106, 43631]