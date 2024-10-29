<script setup lang="ts">
import { stopMusic } from './scripts/sounds';


const emit = defineEmits<{
    (e: "backToMenu"): void
}>()

const gotoMenu = () => {
    stopMusic(2000)
    setTimeout(() => {
        emit('backToMenu')
    }, 2000);
}

const blueskyShare = () => "https://bsky.app/intent/compose?text=hello"
const twitterShare = () => "https://twitter.com/intent/tweet?text=hello"
const redditShare = () => "https://reddit.com/submit?url=hello"

</script>

<template>
    <main>
        <h1 class="mb-4 text-5xl font-extrabold text-center font-[pmd] text-white">You're a Failure!</h1>
        <section class="flex flex-col text-white bg-black bg-opacity-80 font-[pmd] rounded-xl backdrop-blur-md eosBorder">
            <span>score: 0</span>
            <p class="mb-2 text-center">Share your score with friends...</p>
            <div class="flex gap-4 justify-center items-center mb-3 text-2xl">
                <a :href="blueskyShare"><img class="inline mr-2 mb-1 w-8" src="./images/twitter.svg" alt="">Bluesky</a>
                <hr class="w-0.5 h-8 bg-white bg-opacity-40 border-none">
                <a :href="twitterShare"><img class="inline mr-2 mb-1 w-8" src="./images/twitter.svg" alt="">Twitter</a>
                <hr class="w-0.5 h-8 bg-white bg-opacity-40 border-none">
                <a :href="redditShare"><img class="inline mr-2 mb-1 w-8" src="./images/twitter.svg" alt="">Reddit</a>
            </div>
            <div class="play">
                <button class="p-2 text-lg text-blue-300 bg-opacity-10 rounded-md">Replay</button>
                <button @click="gotoMenu()" class="p-2 text-3xl font-black text-green-300 bg-green-700 bg-opacity-40 rounded-md border-2 border-green-300">Back to Menu</button>
                <button class="p-2 text-lg text-yellow-500 bg-opacity-10 rounded-md disabled:opacity-20">Highscores</button>
            </div>
        </section>
    </main>
</template>