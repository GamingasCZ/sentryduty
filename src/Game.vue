<script setup lang="ts">
import TestList from "./components/TestList.vue"
import {ref} from "vue"

const makeID = () => Math.ceil(Math.random() * 100)
const id = ref(makeID())

</script>

<template>
  <main class="flex absolute inset-0 justify-center items-center">
    <TestList :pokemon_id="id" @click="id = makeID()" />
  </main>
</template>
