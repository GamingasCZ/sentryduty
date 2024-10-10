<script setup lang="ts">

const emit = defineEmits<{
    (e: "backToMenu"): void
}>()

</script>

<template>
    <section class="flex flex-col text-white bg-black bg-opacity-80 rounded-xl backdrop-blur-md eosBorder">
        <h1>You Won!</h1>
        <span>score: 0</span>
        <button @click="emit('backToMenu')">Back to Menu</button>
    </section>
</template>