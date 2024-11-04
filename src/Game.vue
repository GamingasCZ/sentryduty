<script setup lang="ts">
import PokemonCard from "./components/PokemonCard.vue"
import Timer from "./components/Timer.vue"
import {computed, onMounted, ref} from "vue"
import POKEMON, { generatePokemonForRound, ROUND_TIME_SEC, ROUNDS } from "./scripts/pokemon";
import { gameMusic, playMusic } from "./scripts/sounds";
import Textbox from "./components/Textbox.vue";
import { ALL_GUESSES, DAY_PLAYING_OFFSET, SCORE } from "./scripts/stats";

const emit = defineEmits<{
    (e: "gameFinished", result: {score: number}): void
}>()

const GENERATED_POKEMON = generatePokemonForRound(DAY_PLAYING_OFFSET.value) as [number[][], number[]]

const answerIndex = computed(() => GENERATED_POKEMON[1][currentRound.value] as number)
const answerPokemon = computed(() => POKEMON[GENERATED_POKEMON[0][currentRound.value][answerIndex.value] - 1])
const hintArray = computed(() => POKEMON[GENERATED_POKEMON[0][currentRound.value][answerIndex.value] - 1].hint)

const currentRound = ref(0)
const timeLeft = ref(0)
const timeLeftMSec = ref(0)
const pickedHint = ref(-1)

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

    timerEl?.value?.startTimer()
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

const timerEl = ref<HTMLDivElement | any>()
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

    ALL_GUESSES.value.push(guessPokemonID)
    timerEl.value.stopTimer()
    timerEl.value.restartTimer()
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
    <!-- Vignette -->
    
    <main :style="{backgroundImage: `url(${base}/background/dirt.webp)`}" class="font-[pmd] flex justify-center absolute inset-0">
        
        <div class="absolute z-0 inset-0 bg-[radial-gradient(transparent,#0f0606)]"></div>

        <section class="flex z-10 flex-col justify-center items-center mx-auto max-w-3xl">
            <div class="flex justify-between w-full">
              <p class="text-2xl text-yellow-400">{{ currentRound+1 }}<span class="mx-2 text-white">/</span>{{ ROUNDS }}</p>
              <p class="text-2xl text-yellow-400">{{ SCORE }}<span class="text-white">P</span></p>
            </div>
              <!-- <p class="text-white">{{ pickedHint == -1 ? NO_FOOT_HELP : hintArray[pickedHint] }}</p> -->
              <div class="relative w-64 aspect-square">
                  <img :src="base + `/footprints/${GENERATED_POKEMON[0][currentRound][answerIndex]}.webp`" class="absolute top-1/2 left-1/2 z-10 w-32 -translate-x-1/2 -translate-y-1/2 pixelated" alt="">
                  <div :style="{backgroundImage: 'radial-gradient(white 15%, transparent 70%)'}" class="absolute inset-0"></div>
              </div>
              <Timer ref="timerEl" :time="ROUND_TIME_SEC" />
              <div class="grid grid-cols-2 gap-8">
                  <PokemonCard
                      v-for="pokemon in GENERATED_POKEMON[0][currentRound]"
                      :pokemon_id="pokemon"
                      :show-potrait="showPotraits"
                      @click="submitGuess(POKEMON[pokemon - 1].id)"
                  />
              </div>
              <Textbox :text="pickedHint == -1 ? NO_FOOT_HELP : hintArray[pickedHint]" />
              <!-- <meter min="0" :max="ROUND_TIME_SEC" :value="timeLeft"></meter> -->
        </section>
  </main>
</template>
