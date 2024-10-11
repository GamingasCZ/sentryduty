<script setup lang="ts">
import { computed, ref } from 'vue';
import POKEMON from '../scripts/pokemon';

const props = defineProps<{
    text: string
    speakerID: number
}>()

const visibleText = ref("")
let textInterval = setInterval(() => {
    let currLen = visibleText.value.length
    if (currLen == props.text.length)
        return clearInterval(textInterval)

    visibleText.value = visibleText.value + props.text.slice(currLen, currLen + 1)
}, 20);

const pokemonArr = computed(() => POKEMON.findIndex(x => x.id == props.speakerID))
const base = import.meta.env.BASE_URL

</script>

<template>
    <div class="relative font-[pmd] p-2 py-1 mt-32 text-3xl text-white bg-black bg-opacity-80 rounded-xl backdrop-blur-md min-h-24 eosBorder">
        <img class="absolute -left-3 -top-28 w-24 eosBorder" :src="base + `/portraits/${POKEMON[pokemonArr].id}.png`" alt="">
        <span class="text-blue-500">{{ POKEMON[pokemonArr].name }}: </span>
        <span>{{ visibleText }}</span>
    </div>
</template>