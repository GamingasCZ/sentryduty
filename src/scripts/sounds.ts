import { Howl } from "howler";

export const sounds = async () => {
    const sfx = (await import("/sfx/sfx.ogg?url")).default
    return new Howl({
        src: [sfx],
        sprite: {
            click: [0, 47],
            switch: [48, 58],
        },
        onend: (e) => console.log(e),
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

// menu: [106, 43631]