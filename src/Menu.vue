<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import CreditsPopup from './components/CreditsPopup.vue';
import { DIFFICULTY } from './scripts/pokemon';
import strings from './strings';
import MenuBackground from './components/MenuBackground.vue';
import { menu, sounds } from './scripts/sounds';

const emit = defineEmits<{
    (e: "startGame"): void
}>()

const creditsOpen = ref(false)
const settingsShown = ref(false)
var isMuted = false


var sound: Howl
var menuMusic: Howl
onMounted(async () => {
    menuMusic = await menu()
    sound = await sounds()

    menuMusic.play()
})

const startGameAnimation = () => {
    menuMusic.fade(1.0, 0.0, 2000)
    setTimeout(() => {
        emit('startGame')
    }, 2000);
}

const toggleVolume = () => {
    let newVolume = isMuted ? 1 : 0
    isMuted = !isMuted

    menuMusic.volume(newVolume)
    sound.volume(newVolume)
}

</script>

<template>
    <CreditsPopup @close="creditsOpen = false" :open="creditsOpen" />

    <MenuBackground />

    <main class="px-2 py-8 min-h-max w-full font-[pmd] max-w-2xl text-white">
        <h1 class="mb-4 text-5xl font-extrabold text-center">Sentry Duty</h1>
        <section class="flex flex-col bg-black bg-opacity-80 rounded-xl backdrop-blur-md eosBorder">
            <div class="flex flex-col items-center my-4">
                <header class="flex gap-12 justify-between w-max">
                    <button @click="sound.play('click')"><img src="./images/arrow2.svg" class="w-8" alt=""></button>
                    <span class="text-2xl">Day 1</span>
                    <button @click="sound.play('click')"><img src="./images/arrow2.svg" class="w-8 -scale-x-100" alt=""></button>
                </header>
                <div class="text-center opacity-40">
                    <img src="./images/notPlayedYet.webp" class="my-4" alt="">
                    <span>You haven't played today yet...</span>
                </div>
            </div>

            <div class="px-2 my-4 sm:px-8">
                <table class="w-full text-center">

                    <caption class="mb-2 text-2xl text-left">
                        <img src="./images/hry.svg" class="inline mr-4 mb-1 w-6" alt="">
                        <span>Difficulty</span>
                    </caption>

                    <tbody>
                        <tr class="">
                            <td :class="{'bg-blue-950': DIFFICULTY == 0}" class="text-xl text-blue-300 border-2 border-white border-opacity-40 active:brightness-125 hover:bg-blue-950">
                                <button class="py-1 w-full h-full" @click="DIFFICULTY = 0; sound.play('switch')">{{ strings.difficulties[0] }}</button>
                            </td>
                            <td :class="{'bg-red-950': DIFFICULTY == 1}" class="text-xl text-red-300 border-2 border-white border-opacity-40 active:brightness-125 hover:bg-red-950">
                                <button class="py-1 w-full h-full" @click="DIFFICULTY = 1; sound.play('switch')">{{ strings.difficulties[1] }}</button>
                            </td>
                            <td :class="{'bg-red-900': DIFFICULTY == 2}" class="text-xl text-red-600 border-2 border-white border-opacity-40 active:brightness-125 hover:text-black hover:bg-red-900">
                                <button class="py-1 w-full h-full" @click="DIFFICULTY = 2; sound.play('switch')">{{ strings.difficulties[2] }}</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <p class="mt-1 text-sm">{{ strings.difficultyHelp[DIFFICULTY] }}</p>
            </div>

            <section class="px-2 my-8 sm:px-8">
                <header @click="settingsShown = !settingsShown; sound.play('click')" class="flex items-center cursor-pointer">
                    <img src="./images/gear.svg" class="mr-4 w-6" alt="">
                    <span class="text-2xl">Settings</span>
                    <img src="./images/arrow.svg" :class="{'-scale-x-75': settingsShown}" class="mr-2 ml-auto w-3 scale-x-75 rotate-90" alt="">
                </header>
                <hr class="mt-2 opacity-40">

                <div v-show="settingsShown">
                    <div class="flex gap-2 p-2 bg-black bg-opacity-20 max-sm:flex-col">
                        <div class="flex gap-2">
                            <img class="p-1 h-9 rounded-md border" src="./images/bp.png">
                            <input class="py-1 pl-4 w-full bg-transparent rounded-md border sm:mr-8"type="text" placeholder="Hero's Name">
                        </div>
                        <div class="flex gap-2">
                            <img class="p-1 h-9 rounded-md border" src="./images/bp.png">
                            <input class="py-1 pl-4 w-full bg-transparent rounded-md border"type="text" placeholder="Partner's Name">
                        </div>
                    </div>
                    <div class="flex gap-2 px-4 py-2 m-2 rounded-md border">
                        <span>Mute Sound</span>
                        <input @input="toggleVolume(); sound.play('switch')" class="ml-auto" type="checkbox">
                    </div>
                    <div class="flex gap-2 px-4 py-2 m-2 rounded-md border">
                        <span>Skip Cutscenes</span>
                        <input @input="sound.play('switch')" class="ml-auto" type="checkbox">
                    </div>
                </div>
            </section>

            <div class="play">
                <button @click="creditsOpen = true; sound.play('click')" class="p-2 text-lg bg-opacity-10 rounded-md text-slate-300">Credits</button>
                <button @click="startGameAnimation()" class="p-2 text-4xl font-black text-green-300 bg-green-700 bg-opacity-40 rounded-md border-2 border-green-300">Play</button>
                <button @click="sound.play('click')" class="p-2 text-lg text-yellow-500 bg-opacity-10 rounded-md">Highscores</button>
            </div>
        </section>
    </main>
</template>

<style>

.play {
    @apply grid [grid-template-areas:"play_play"] sm:[grid-template-areas:"a_play"] gap-4 grid-cols-2 sm:grid-cols-3 justify-center p-4;
}

.play > button:nth-of-type(2) {grid-area: play;}

</style>