<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import Menu from "./Menu.vue";

enum GAME_STATE {
  IN_MENU,
  PLAYING,
  RESULTS
}

const state = ref(GAME_STATE.IN_MENU)
const Game = defineAsyncComponent(() => import('./Game.vue'))

</script>

<template>
  <component
    :is="[Menu, Game][state]"
    @start-game="state = GAME_STATE.PLAYING"
  />
</template>
