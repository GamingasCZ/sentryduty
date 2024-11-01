<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  time: number;
}>();

const emit = defineEmits<{
  (e: "timeout"): void
}>()

const timeLeft = ref(props.time)

let timer: NodeJS.Timeout | null
const startTimer = () => {
  timer = setInterval(() => {
    timeLeft.value -= 1
    if (timeLeft.value == 0)
      emit('timeout')
  }, 1000)
}

const restartTimer = () => {
  timeLeft.value = props.time
  if (timer)
    clearInterval(timer)
}

const stopTimer = () => {
  if (!timer) return
  
  clearInterval(timer)
  timer = null
}

defineExpose({
  startTimer,
  stopTimer,
  restartTimer
})

</script>

<template>
  <div class="flex gap-2 my-3">
    <div v-for="_ in timeLeft" class="w-3 h-4 bg-yellow-500" />
    <div v-for="_ in (time - timeLeft)" class="w-3 h-4 bg-red-500" />
  </div>
</template>
