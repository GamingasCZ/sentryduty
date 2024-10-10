<script setup lang="ts">
import POKEMON from '../scripts/pokemon';

defineProps<{
    pokemon_id: number
    showPotrait: boolean
}>()

const base = import.meta.env.BASE_URL

</script>

<template>
    <button class="p-1 text-black bg-green-400 rounded-md">
        <div class="flex items-center text-2xl">

            <div class="m-1 w-16 h-16 bg-black bg-opacity-40">
                <img v-if="showPotrait" :src="base + `/portraits/${POKEMON[pokemon_id - 1].id}.png`" class="w-full pixelated" alt="">
            </div>
            
            <!-- <img :src="base + `/footprints/${POKEMON[pokemon_id - 1].id}.png`" class="p-1 w-16 pixelated" alt=""> -->
            <span>{{ POKEMON[pokemon_id - 1].name }}</span>
        </div>
    </button>
</template>