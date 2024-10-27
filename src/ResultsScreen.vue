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

</script>

<template>
    <section class="flex flex-col text-white bg-black bg-opacity-80 rounded-xl backdrop-blur-md eosBorder">
        <h1>You Won!</h1>
        <span>score: 0</span>
        <button @click="gotoMenu">Back to Menu</button>
    </section>
</template>