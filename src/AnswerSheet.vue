<script setup lang="ts">
import POKEMON, { getAnswers } from './scripts/pokemon';
import FalseImg from "./images/FALSEbig.webp?url"
import TrueImg from "./images/TRUEbig.webp?url"
import { computed } from 'vue';


const props = defineProps<{ 
	daySelected: number;
    answerArray?: number[];
}>()

const base = import.meta.env.BASE_URL
const answers = computed(() => getAnswers(props.daySelected))

</script>

<template>
	<div class="flex gap-3">
        <div v-for="(answer, i) in answers" class="relative">
            <img class="w-14" :title="POKEMON[answer - 1].name" :src="`${base}/portraits/${POKEMON[answer - 1].id}.webp`" alt="">
            <img v-if="answerArray" class="absolute -right-1 -bottom-1 w-6" :src="answerArray?.[i] == POKEMON[answer - 1].id ? TrueImg : FalseImg" alt="">
        </div>
    </div>
</template>
