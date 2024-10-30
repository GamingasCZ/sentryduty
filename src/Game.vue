<script setup lang="ts">
import PokemonCard from "./components/PokemonCard.vue"
import {computed, onMounted, ref} from "vue"
import POKEMON, { generatePokemonForRound, ROUND_TIME_SEC, ROUNDS } from "./scripts/pokemon";
import { gameMusic, playMusic } from "./scripts/sounds";

const emit = defineEmits<{
    (e: "gameFinished", result: {score: number}): void
}>()

const GENERATED_POKEMON = generatePokemonForRound() as [number[][], number[]]

const answerIndex = computed(() => GENERATED_POKEMON[1][currentRound.value] as number)
const answerPokemon = computed(() => POKEMON[GENERATED_POKEMON[0][currentRound.value][answerIndex.value] - 1])
const hintArray = computed(() => POKEMON[GENERATED_POKEMON[0][currentRound.value][answerIndex.value] - 1].hint)

const currentRound = ref(0)
const timeLeft = ref(0)
const timeLeftMSec = ref(0)
const pickedHint = ref(-1)
const SCORE = ref(0)

const showPotraits = ref(false)
const showSprites = ref(false)
let switchedHint = 0

const NO_FOOT_HELP = "Whose footprint is this?"
const pickHint = (prevHint: number) => {
    let newHint = Math.floor(Math.random() * 3)
    if (newHint == prevHint) return pickHint(newHint) // Cannot use the same hint
    else return newHint
}

let timer: NodeJS.Timeout | -1 = -1
const startTimer = () => {
    timeLeftMSec.value = Date.now()
    timeLeft.value = ROUND_TIME_SEC

    let timeShowPortraits = ROUND_TIME_SEC * 0.92
    let timeShowSprites = ROUND_TIME_SEC * 0.5
    let timeShowHint = ROUND_TIME_SEC * 0.75
    let timeOtherHint = ROUND_TIME_SEC * 0.25
    switchedHint = 0

    timer = setInterval(() => {
        timeLeft.value -= 0.1

        showPotraits.value = timeLeft.value < timeShowPortraits
        showSprites.value = timeLeft.value < timeShowSprites
        if (
            (switchedHint == 0 && timeLeft.value < timeShowHint) ||
            (switchedHint == 1 && timeLeft.value < timeOtherHint)
        ) {
            switchedHint += 1
            pickedHint.value = pickHint(pickedHint.value)
        }

        if (timeLeft.value <= 0) {
            clearInterval(timer)
            timer = -1
            startNextRound()
        }
    }, ROUND_TIME_SEC * 10);
}

const startNextRound = () => {
    currentRound.value += 1
    showPotraits.value = false
    pickedHint.value = -1

    // Final round, end game
    if (currentRound.value == ROUNDS)
        return emit('gameFinished', {score: SCORE.value})
    
    startTimer()
}

const submitGuess = (guessPokemonID: number) => {

    // Corrent answer, add points
    if (answerPokemon.value.id == guessPokemonID) {
        addScore()
    }

    clearInterval(timer)
    startNextRound()
}

const addScore = () => {
    SCORE.value += ROUND_TIME_SEC*100 - Math.round(Date.now()/1000 - timeLeftMSec.value/1000)
}

const base = import.meta.env.BASE_URL

var music: Howl
onMounted(async () => {
    music = await gameMusic()
    music.loop()
    music.on("end", () => {playMusic(music, "loop")})
    playMusic(music, "main")
    startTimer()
})

</script>

<template>
    <main class="flex absolute inset-0 flex-col justify-center items-center">
        <meter min="0" :max="ROUND_TIME_SEC" :value="timeLeft"></meter>
        <p class="text-yellow-400">Round: {{ currentRound+1 }}/{{ ROUNDS }}</p>
        <p class="text-yellow-400">Score: {{ SCORE }}</p>
        <p class="text-white">{{ pickedHint == -1 ? NO_FOOT_HELP : hintArray[pickedHint] }}</p>
        <div class="relative w-64 aspect-square">
            <img :src="base + `/footprints/${GENERATED_POKEMON[0][currentRound][answerIndex]}.webp`" class="absolute top-1/2 left-1/2 z-10 w-32 -translate-x-1/2 -translate-y-1/2 pixelated" alt="">
            <div :style="{backgroundImage: 'radial-gradient(white 15%, transparent 70%)'}" class="absolute inset-0"></div>
        </div>
        <div class="grid grid-cols-2 gap-8">
            <PokemonCard
                v-for="pokemon in GENERATED_POKEMON[0][currentRound]"
                :pokemon_id="pokemon"
                :show-potrait="showPotraits"
                @click="submitGuess(POKEMON[pokemon -1].id)"
            />
        </div>
  </main>
</template>
