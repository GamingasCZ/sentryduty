<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import POKEMON from '../scripts/pokemon';

const props = defineProps<{
    text: string
    speakerID?: number
}>()

let textInterval: NodeJS.Timeout | null
const visibleText = ref("")
const spawnText = () => {
    visibleText.value = ""
    textInterval = setInterval(() => {
        let currLen = visibleText.value.length
        if (currLen == props.text.length) {
            textInterval = null
            return clearInterval(textInterval!)
        }
    
        visibleText.value = visibleText.value + props.text.slice(currLen, currLen + 1)
    }, 30);
}

spawnText()
watch(props, () => {
    if (textInterval)
        clearInterval(textInterval)
    spawnText()
})

const pokemonArr = computed(() => POKEMON.findIndex(x => x.id == props.speakerID))
const base = import.meta.env.BASE_URL

</script>

<template>
    <div class="relative font-[pmd] px-3 py-1 mt-32 max-w-full mx-2 w-[40rem] text-xl text-white bg-black bg-opacity-80 rounded-xl backdrop-blur-md min-h-24 eosBorder">
        <img v-if="speakerID" class="absolute -left-3 -top-28 w-24 eosBorder" :src="base + `/portraits/${POKEMON[pokemonArr].id}.png`" alt="">
        <span v-if="speakerID" class="text-blue-500">{{ POKEMON[pokemonArr].name }}: </span>
        <span class="max-w-full text-wrap">{{ visibleText }}</span>
    </div>
</template>