<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CreditsPopup from './components/CreditsPopup.vue';
import { getDaysRunningFor, STARTERS } from './scripts/pokemon';
import strings from './strings';
import MenuBackground from './components/MenuBackground.vue';
import { menu, playMusic, sounds, stopMusic, toggleVolume } from './scripts/sounds';
import { hasLocalStorage, LocalStorageKeys, SETTINGS } from './scripts/settings';
import AnswerSheet from './AnswerSheet.vue'
import { DAY_PLAYING_OFFSET, DIFFICULTY, SaveData } from './scripts/stats';

const emit = defineEmits<{
    (e: "startGame"): void
}>()

const creditsOpen = ref(false)
const settingsShown = ref(false)
const daySelected = ref(0)
const daysRunningFor = getDaysRunningFor()
const hasLocalStorg = hasLocalStorage()
const viewingAnswers = ref(false)
const base = import.meta.env.BASE_URL
const fancyDate = computed(() => {
    let today = new Date()
    let date = new Date(today.getTime() + daySelected.value * 86_400_000)
    return `${date.toLocaleDateString()}`
})

var sound: Howl
var menuMusic: Howl
onMounted(async () => {
    menuMusic = await menu()
    sound = await sounds()

    playMusic(menuMusic)
})

const savedGames = ref<SaveData>({games: {}})
if (hasLocalStorage()) {
    let save = localStorage.getItem(LocalStorageKeys.SaveData)
    if (save) {
        savedGames.value = JSON.parse(save)!
    }
}

const mainMenu = ref<HTMLDivElement>()
const startGameAnimation = () => {
    if (mainMenu)
        mainMenu.value?.classList.add("slideDown")
    
    stopMusic(2000, true)
    setTimeout(() => {
        DAY_PLAYING_OFFSET.value = 0
        emit('startGame')
    }, 2000);
}



const selectDay = (skipBy: number) => {
    if (daySelected.value + skipBy > 0) return
    
    viewingAnswers.value = false
    daySelected.value += skipBy
    sound.play('click')
}

const playOtherDay = () => {
    stopMusic(2000, true)
    setTimeout(() => {
        DAY_PLAYING_OFFSET.value = daySelected.value
        emit('startGame')
    }, 2000);
}

const dayText = computed(() => {
    switch (daySelected.value) {
        case 0: return `Today - Day ${getDaysRunningFor()}`
        case -1: return `Yesterday`
            
        default:
            return `${Math.abs(daySelected.value)} days ago`;
    }
})

enum PKPicking {No = 0, Hero = 1, Partner = 2}
const pickingPokemon = ref(PKPicking.No)
const pickPokemon = (pickedPokemon: number) => {
    if (pickingPokemon.value == PKPicking.Hero)
        SETTINGS.hero[0] = pickedPokemon
    else
        SETTINGS.partner[0] = pickedPokemon

    pickingPokemon.value = PKPicking.No
    sound.play('switch')
}


</script>

<template>
    <CreditsPopup @close="creditsOpen = false" :open="creditsOpen" />

    <MenuBackground :night-theme="true" />

    <main ref="mainMenu" class="px-2 py-8 min-h-max w-full font-[pmd] max-w-2xl text-white">
        <h1 class="mb-4 text-5xl font-extrabold text-center">Sentry Duty</h1>
        <section class="flex flex-col bg-black bg-opacity-80 rounded-xl backdrop-blur-md eosBorder">
            <div class="flex flex-col items-center my-4 h-64">
                <header class="flex gap-12 justify-between w-max">
                    <button :disabled="Math.abs(daySelected) >= daysRunningFor" class="disabled:opacity-20" @click="selectDay(-1)"><img height="32" src="./images/arrow2.svg" class="w-8" alt=""></button>
                    <span @click="daySelected = 0" :class="{'cursor-pointer hover:underline': daySelected != 0}" class="text-2xl">{{ dayText }}</span>
                    <button :disabled="daySelected == 0" class="disabled:opacity-20" @click="selectDay(1)"><img height="32" src="./images/arrow2.svg" class="w-8 -scale-x-100" alt=""></button>
                </header>
                <div v-if="savedGames.games[daysRunningFor + daySelected]">
                    <p class="mt-2 text-center opacity-40">{{ fancyDate }}</p>
                    <div class="flex justify-between my-4 text-xl">
                        <p class="text-yellow-400">Points: {{ savedGames.games[daysRunningFor + daySelected].score }}</p>
                        <p class="text-lime-400">Time: {{ savedGames.games[daysRunningFor + daySelected].time }}s</p>
                    </div>
                    <p>difficutly todog</p>
                    <AnswerSheet :day-selected="daySelected" :answer-array="savedGames.games[daysRunningFor + daySelected].guesses" />
                </div>
                <div v-else-if="daySelected == 0" class="text-center opacity-40">
                    <div >
                        <img height="160" src="./images/notPlayedYet.webp" class="my-4" alt="">
                        <!-- <span>Scores can't be saved without cookies!</span> -->
                        <span>You haven't played today yet...</span>
                    </div>
                </div>
                <div v-else class="text-center">

                    <div v-if="!viewingAnswers">
                        <p class="mt-2 text-center opacity-40">{{ fancyDate }}</p>
                        
                        <div class="grid grid-cols-2 py-4 mt-1 mb-5">
                            <button @click="viewingAnswers = true; sound.play('click')" class="flex flex-col items-center opacity-40 transition-opacity duration-75 hover:opacity-100"><img class="w-20" src="./images/view.svg">Answers</button>
                            <button @click="playOtherDay()" class="flex flex-col items-center opacity-40 transition-opacity duration-75 hover:opacity-100"><img class="p-4 w-20 -scale-100" src="./images/arrow2.svg">Play</button>
                        </div>
                        <span class="opacity-40">You haven't played that day...</span>
                    </div>

                    <div v-else class="flex flex-col gap-4 my-4">
                        <span class="opacity-40">Answers for {{ fancyDate }}</span>
                        <AnswerSheet :day-selected="daySelected" />
                        <button class="text-2xl text-blue-300 hover:underline" @click="viewingAnswers = false; sound.play('click')">Back</button>
                    </div>

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
                            <td :class="{'bg-red-900': DIFFICULTY == 2}" class="relative text-xl text-red-600 overflow-clip border-2 border-white border-opacity-40 active:brightness-125 hover:text-black hover:bg-red-900">
                                <img src="./images/flame.webp" class="absolute inset-0 w-full mix-blend-color-dodge pixelated" alt="">
                                <button class="isolate py-1 w-full h-full" @click="DIFFICULTY = 2; sound.play('switch')">{{ strings.difficulties[2] }}</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <p class="mt-1 text-sm">{{ strings.difficultyHelp[DIFFICULTY] }}</p>
            </div>

            <section v-if="hasLocalStorage" class="px-2 my-8 sm:px-8">
                <header @click="settingsShown = !settingsShown; sound.play('click')" class="flex items-center cursor-pointer">
                    <img src="./images/gear.svg" class="mr-4 w-6" alt="">
                    <span class="text-2xl">Settings</span>
                    <img src="./images/arrow.svg" :class="{'!-rotate-90': settingsShown}" class="mr-2 ml-auto w-3 scale-x-75 rotate-90" alt="">
                </header>
                <hr class="mt-2 opacity-40">

                <div v-show="settingsShown" class="pb-1 bg-black bg-opacity-20">
                    <div class="flex gap-2 p-2 max-sm:flex-col">
                        <div class="flex gap-2">
                            <button
                                @click="pickingPokemon = pickingPokemon == PKPicking.Hero ? PKPicking.No : PKPicking.Hero; sound.play('click')"
                                class="p-1 h-9 rounded-md border-b-2 aspect-square"
                            >
                                <img
                                    :class="{'drop-shadow-glow brightness-[0.2]': pickingPokemon == PKPicking.Hero}"
                                    class="h-full hop"
                                    :src="`${base}/sprites/${STARTERS[SETTINGS.hero[0] as number]}.webp`"
                                >
                            </button>
                            <input v-model.lazy.trim="SETTINGS.hero[1]" class="py-1 pl-4 w-full bg-transparent rounded-md border sm:mr-8" type="text" placeholder="Hero's Name">
                        </div>
                        <div class="flex gap-2">
                            <button
                                @click="pickingPokemon = pickingPokemon == PKPicking.Partner ? PKPicking.No : PKPicking.Partner; sound.play('click')"
                                class="p-1 h-9 rounded-md border-b-2 aspect-square"
                            >
                                <img
                                    :class="{'drop-shadow-glow brightness-[0.2]': pickingPokemon == PKPicking.Partner}"
                                    class="h-full hop"
                                    :src="`${base}/sprites/${STARTERS[SETTINGS.partner[0] as number]}.webp`"
                                >
                            </button>
                            <input v-model.lazy.trim="SETTINGS.partner[1]" class="py-1 pl-4 w-full bg-transparent rounded-md border" type="text" placeholder="Partner's Name">
                        </div>
                    </div>
                    <div v-if="pickingPokemon != PKPicking.No" class="flex flex-wrap gap-2 justify-center px-12 pb-4">
                        <button @click="pickPokemon(i)" v-for="(pkmn, i) in STARTERS" class="p-1 h-9 bg-gradient-to-t from-[#ffffff48] to-transparent group rounded-md border-b-2 hover:border-b-4 aspect-square">
                            <img :style="{animationDelay: `${Math.floor(Math.random()*1000)}ms`}" class="h-full transition-transform duration-75 group-hover:scale-150 hop" :src="`${base}/sprites/${pkmn}.webp`">
                        </button>
                    </div>

                    <div class="flex gap-2 px-4 py-2 m-2 rounded-md border">
                        <span>Mute Sound</span>
                        <input @input="toggleVolume(); sound.play('switch')" v-model="SETTINGS.muteSounds" class="ml-auto" type="checkbox">
                    </div>
                    <div class="flex gap-2 px-4 py-2 m-2 rounded-md border">
                        <span>Skip Cutscenes</span>
                        <input @input="sound.play('switch')" class="ml-auto" v-model="SETTINGS.skipCutscenes" type="checkbox">
                    </div>
                </div>
            </section>

            <div class="play">
                <button @click="creditsOpen = true; sound.play('click')" class="p-2 text-lg bg-opacity-10 rounded-md text-slate-200">Credits</button>
                <button @click="startGameAnimation()" class="p-2 text-4xl font-black text-green-300 bg-green-700 bg-opacity-40 rounded-md border-2 border-green-300">Play</button>
                <button :disabled="!hasLocalStorg" @click="sound.play('click')" class="p-2 text-lg text-yellow-500 bg-opacity-10 rounded-md disabled:opacity-20">Highscores</button>
            </div>
        </section>
    </main>
</template>

<style>

@keyframes slideDownAnim {
    from {transform: none; opacity: 1;}
    to {transform: translateY(2rem); opacity: 0;}
}

.slideDown {
    animation: slideDownAnim 1s ease both;
}

.play {
    @apply grid [grid-template-areas:"play_play"] sm:[grid-template-areas:"a_play"] gap-4 grid-cols-2 sm:grid-cols-3 justify-center p-4;
}

.play > button:nth-of-type(2) {grid-area: play;}

</style>