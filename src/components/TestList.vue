<script setup lang="ts">
import POKEMON from '../scripts/pokemon';

defineProps<{
    pokemon_id: number
}>()

const base = import.meta.env.BASE_URL
</script>

<template>
    <section class="p-1 w-max text-black bg-green-400 rounded-md">
        <div class="flex items-center text-2xl">
            <img :src="base + `/portraits/${POKEMON[pokemon_id - 1].id}.png`" class="p-1 w-16 pixelated" alt="">
            <img :src="base + `/footprints/${POKEMON[pokemon_id - 1].id}.png`" class="p-1 w-16 pixelated" alt="">
            <span>{{ POKEMON[pokemon_id - 1].name }}</span>
        </div>
        <p class="whitespace-pre-wrap">
            {{ POKEMON[pokemon_id - 1].hint[Math.floor(Math.random() * 3)] }}
        </p>
    </section>
</template>