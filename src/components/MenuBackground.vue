<script setup lang="ts">
import Clouds from './background/Clouds.vue';

const base = import.meta.env.BASE_URL
</script>

<template>
    <section class="fixed inset-0 bg-gradient-to-b from-[#5494f4] to-[#beefff] -z-50">
        
        <Clouds />
        
        <!-- Mountains -->
        <div :style="{backgroundImage: `url(${base}/background/mountains.webp)`}" class="absolute right-0 left-0 bottom-64 h-48"></div>
        <div class="absolute right-0 bottom-0 left-0 h-64 bg-gradient-to-b from-[#F3A696] to-[#7b352e]"></div>
        <div :style="{backgroundImage: `url(${base}/background/mountains.webp)`}" class="absolute right-0 left-0 bottom-24 h-48 brightness-90 -scale-x-100"></div>
        <div class="absolute right-0 bottom-0 left-0 bg-gradient-to-b h-24 from-[#DD9687] to-[#bf736a]"></div>

        <!-- Guild -->
        <div :style="{backgroundImage: `url(${base}/background/guild.webp)`}" class="absolute left-1/2 -translate-x-1/2 w-[1280px] bottom-0 bg-no-repeat h-[640px]"></div>
    </section>
</template>