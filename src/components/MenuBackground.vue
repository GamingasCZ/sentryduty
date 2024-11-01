<script setup lang="ts">
import Clouds from './background/Clouds.vue';

defineProps<{
    nightTheme: boolean
}>()

const base = import.meta.env.BASE_URL
</script>

<template>
    <section
        :class="{
            'from-[#5494f4] to-[#beefff]': !nightTheme,
            'from-[#12082f] to-[#643410]': nightTheme,
        }"
        class="fixed inset-0 bg-gradient-to-b -z-50"
    >
        
        <Clouds
            
        />
        
        <!-- Mountains -->
        <div class="absolute right-0 bottom-0 left-0" :class="{'brightness-50 contrast-150 saturate-50': nightTheme}">
            <div :style="{backgroundImage: `url(${base}/background/mountains.webp)`}" class="absolute right-0 left-0 bottom-64 h-48"></div>
            <div class="absolute right-0 bottom-0 left-0 h-64 bg-gradient-to-b from-[#F3A696] to-[#7b352e]"></div>
            <div :style="{backgroundImage: `url(${base}/background/mountains.webp)`}" class="absolute right-0 left-0 bottom-24 h-48 brightness-90 -scale-x-100"></div>
            <div class="absolute right-0 bottom-0 left-0 bg-gradient-to-b h-24 from-[#DD9687] to-[#bf736a]"></div>
        </div>

        <!-- Guild -->
        <div :style="{backgroundImage: `url(${base}/background/guild.webp)`}" class="absolute left-1/2 -translate-x-1/2 w-[1280px] bottom-0 bg-no-repeat h-[640px]"></div>
    </section>
</template>