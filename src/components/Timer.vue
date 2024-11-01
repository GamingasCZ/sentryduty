<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  time: number;
}>();

const emit = defineEmits<{
  (e: "timeout"): void
}>()

const timeLeft = ref(props.time)

let timer: number | null
const startTimer = () => {
  timeLeft.value = props.time
  if (!timer.value)
    clearInterval(timer.value)

  timer = setInterval(() => {
    timeLeft -= 1
  }, 1000)
}

const stopTimer = () => {
  clearInterval(timer.value)
  timer.value = null
}

defineExpose({
  startTimer,
  stopTimer
})

</script>

<template>
  <div class="flex gap-2">
    <div v-for="on in timeLeft" class="h-2 w-2 bg-yellow-500" />
    <div v-for="off in (time - timeLeft)" class="h-2 w-2 bg-red-500" />
  </div>
</template>
