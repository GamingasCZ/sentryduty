<script setup lang="ts">
import AnswerSheet from './AnswerSheet.vue';
import POKEMON, { getAnswers } from './scripts/pokemon';
import { stopMusic } from './scripts/sounds';
import { ALL_GUESSES, DIFFICULTY, LIVES, resetGame, SaveRecord, saveScore, SCORE, TIME_SPENT, TIME_SPENT_ROUNDS } from './scripts/stats';


const emit = defineEmits<{
    (e: "backToMenu"): void
    (e: "replay"): void
}>()

const headingText = [
    "You failed miserably!",
    "You did OK!",
    "You were great!",
    "You're a Master!"
]

const saveRecord = () => {
    let record: SaveRecord = {
        score: SCORE.value,
        time: TIME_SPENT.value,
        timesRounds: TIME_SPENT_ROUNDS.value,
        guesses: ALL_GUESSES.value,
        difficulty: DIFFICULTY.value,
        livesLeft: LIVES.value,
        date: Date.now()
    }
    saveScore(record)
}

saveRecord()

const exit = (to: 'backToMenu' | 'replay') => {
    stopMusic(2000)
    resetGame()
    setTimeout(() => {
        emit(to as any)
    }, 2000);
}

const answers = getAnswers(0)
const shareText = (isBluesky: boolean) => {
    let correct = []
    let correctAmount = 0
    let nl = isBluesky ? "<br />" : "\n" // can't use newline on bluesky

    for (let i = 0; i < ALL_GUESSES.value.length; i++) {
        if (ALL_GUESSES.value[i] == POKEMON[answers[i] - 1].id) {
            correct.push("✅")
            correctAmount++
        }
        else
            correct.push("❌")
    }

    return encodeURIComponent(`I got ${SCORE.value} points on today's Sentry Duty!${nl}\
${correct.join(" ")} ${correctAmount}/${answers.length}${nl}${nl}\
Try beating my score on gamingas.cz/sentryduty`)
}

const blueskyShare = () => `https://bsky.app/intent/compose?text=${shareText(true)}`
const twitterShare = () => `https://twitter.com/intent/tweet?text=${shareText(false)}`
const redditShare = () => `https://reddit.com/submit?url=${shareText(false)}`

</script>

<template>
    <main>
        <h1 class="mb-4 text-5xl font-extrabold text-center font-[pmd] text-white">{{ headingText[0] }}</h1>
        <section class="flex flex-col text-white bg-black bg-opacity-80 font-[pmd] rounded-xl backdrop-blur-md eosBorder">
            <div class="flex flex-col gap-8 items-center my-6">
                <div class="flex justify-evenly w-full text-2xl">
                    <span class="text-yellow-400">Points: {{ SCORE }}</span>
                    <span class="text-lime-400">Time: {{ TIME_SPENT }}s</span>
                </div>
                <AnswerSheet :day-selected="0" :answer-array="ALL_GUESSES" />
            </div>
            <p class="mt-8 mb-2 text-center">Share your score with friends...</p>
            <div class="flex gap-4 justify-center items-center mb-6 text-2xl">
                <a target="_blank" :href="blueskyShare()"><img class="inline mr-2 mb-1 w-8" src="./images/bluesky.svg" alt="">Bluesky</a>
                <hr class="w-0.5 h-8 bg-white bg-opacity-40 border-none">
                <a target="_blank" :href="twitterShare()"><img class="inline mr-2 mb-1 w-8" src="./images/twitter.svg" alt="">Twitter</a>
                <hr class="w-0.5 h-8 bg-white bg-opacity-40 border-none">
                <a target="_blank" :href="redditShare()"><img class="inline mr-2 mb-1 w-8" src="./images/reddit.svg" alt="">Reddit</a>
            </div>
            <div class="play">
                <button @click="exit('replay')" class="p-2 text-lg text-blue-300 bg-opacity-10 rounded-md">Replay</button>
                <button @click="exit('backToMenu')" class="p-2 text-3xl font-black text-green-300 bg-green-700 bg-opacity-40 rounded-md border-2 border-green-300">Back to Menu</button>
                <button class="p-2 text-lg text-yellow-500 bg-opacity-10 rounded-md disabled:opacity-20">Highscores</button>
            </div>
        </section>
    </main>
</template>