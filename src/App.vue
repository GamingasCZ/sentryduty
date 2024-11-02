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
const Results = defineAsyncComponent(() => import('./ResultsScreen.vue'))

</script>

<template>
  <component
    :is="[Menu, Game, Results][state]"
    @start-game="state = GAME_STATE.PLAYING"
    @game-finished="state = GAME_STATE.RESULTS"
    @back-to-menu="state = GAME_STATE.IN_MENU"
    @replay="state = GAME_STATE.PLAYING"
  />
</template>
