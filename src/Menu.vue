<script setup lang="ts">
import { DIFFICULTY } from './scripts/pokemon';
import strings from './strings';

const emit = defineEmits<{
    (e: "startGame"): void
}>()

</script>

<template>
    <main class="px-2 w-full max-w-2xl text-white">
        <h1 class="mb-4 text-5xl font-extrabold text-center">Sentry Duty</h1>
        <section class="flex flex-col bg-black bg-opacity-80 rounded-xl backdrop-blur-md eosBorder">
            <div class="px-8">
                <table class="w-full text-center">
                    <caption class="text-2xl text-left">Difficulty</caption>
                    <tbody>
                        <tr class="">
                            <td class="py-1 text-xl text-blue-300 border-2 border-white border-opacity-40 hover:bg-blue-950">
                                <button @click="DIFFICULTY = 0">{{ strings.difficulties[0] }}</button>
                            </td>
                            <td class="py-1 text-xl text-red-300 border-2 border-white border-opacity-40 hover:bg-red-950">
                                <button @click="DIFFICULTY = 1">{{ strings.difficulties[1] }}</button>
                            </td>
                            <td class="py-1 text-xl text-red-600 border-2 border-white border-opacity-40 hover:text-black hover:bg-red-900">
                                <button @click="DIFFICULTY = 2">{{ strings.difficulties[2] }}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="mt-1 text-sm">{{ strings.difficultyHelp[DIFFICULTY] }}</p>
            </div>

            <div class="grid grid-cols-2 gap-8 p-8">
                <button @click="emit('startGame')" class="p-2 text-3xl font-bold text-green-300 bg-green-700 bg-opacity-40 rounded-md border-2 border-green-300">Play</button>
                <button class="p-2 text-xl text-yellow-600 bg-yellow-900 bg-opacity-10 rounded-md border-2 border-yellow-600">Highscores</button>
            </div>
        </section>
        <footer class="p-2 mt-8 bg-black bg-opacity-80 rounded-xl backdrop-blur-md eosBorder">
            <h2 class="my-2 text-2xl text-center">Credits</h2>
            <div class="grid grid-rows-2 grid-flow-col gap-x-2 text-center">

                <span>Portraits</span>
                <a target="_blank" href="https://github.com/PMDCollab/SpriteCollab" class="py-1 bg-yellow-900 bg-opacity-30 rounded-md border-2 border-yellow-200">
                    <img src="./images/sr.png" class="inline w-6" alt="">
                    Sprite Repository
                </a>
                
                <span>Hints</span>
                <a target="_blank" href="https://skytemple.org/" class="bg-orange-900 bg-opacity-30 rounded-md border-2 border-orange-200">
                    <img src="./images/st.png" class="inline w-6" alt="">
                    SkyTemple
                </a>
                
                <span>Footprints</span>
                <a target="_blank" href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_footprint" class="bg-lime-900 bg-opacity-30 rounded-md border-2 border-lime-200">
                    <img src="./images/bp.png" class="inline w-6" alt="">
                    Bulbapedia
                </a>
            </div>
            <h3 class="mt-4 text-xl text-center">Created by GamingasCZ 2024</h3>
            <div class="grid grid-cols-2 gap-2 text-center">
                <a target="_blank" href="https://gamingas.cz" class="py-1 bg-green-900 bg-opacity-30 rounded-md border-2 border-green-200">
                    <img src="./images/gg.png" class="inline w-6" alt="">
                    My Website
                </a>
                <a target="_blank" href="https://github.com/GamingasCZ/sentryduty" class="py-1 bg-opacity-30 rounded-md border-2 bg-slate-900 border-slate-200">
                    <img src="./images/gh.png" class="inline w-6" alt="">
                    Source Code
                </a>
            </div>
            <p class="mt-4 text-xs text-center">All sounds and Pokémon sprites are owned by Spike Chunsoft Ltd.<br>
                Pokémon is a registered trademark of Nintendo/Creatures Inc./GAME FREAK Inc.<br>
                This fan game is in no way affiliated the mentioned entites.</p>
        </footer>
    </main>
</template>