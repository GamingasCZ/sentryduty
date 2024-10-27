<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits(['close'])

const main = ref<HTMLDialogElement>()
watch(() => props.open, (_, nowOpen) => {
    if (main && !nowOpen) {
        main.value?.showModal()
    }
})

</script>

<template>
    <dialog @close="emit('close')" @click="main?.close(); emit('close')" ref="main" class="z-20 p-8 text-white bg-black font-[pmd] bg-opacity-80 rounded-xl backdrop-blur-md eosBorder">
        <section @click.stop="">
            <h3 class="my-4 text-lg text-center text-yellow-200">Credits</h3>
                <div class="grid gap-x-4 text-center max-sm:gap-y-3 sm:grid-flow-col sm:grid-rows-2">
    
                    <span class="self-center">Portraits</span>
                    <a target="_blank" href="https://github.com/PMDCollab/SpriteCollab" class="p-3 bg-yellow-900 bg-opacity-30 rounded-md border-2 border-yellow-200">
                        <img src="../images/sr.png" class="inline mr-2 w-6" alt="">
                        Sprite Repository
                    </a>
                    
                    <span class="self-center">Hints & Footprints</span>
                    <a target="_blank" href="https://skytemple.org/" class="p-3 bg-orange-900 bg-opacity-30 rounded-md border-2 border-orange-200">
                        <img src="../images/st.png" class="inline mr-2 w-6" alt="">
                        SkyTemple
                    </a>
                    
                </div>
                <h3 class="mt-12 mb-2 text-xl text-center">Created by GamingasCZ ♥ 2024</h3>
                <div class="grid gap-2 text-center sm:grid-cols-2">
                    <a target="_blank" href="https://gamingas.cz" class="p-3 bg-green-900 bg-opacity-30 rounded-md border-2 border-green-200">
                        <img src="../images/gg.png" class="inline mr-2 w-6" alt="">
                        Website
                    </a>
                    <a target="_blank" href="https://github.com/GamingasCZ/sentryduty" class="p-3 bg-opacity-30 rounded-md border-2 bg-slate-900 border-slate-200">
                        <img src="../images/gh.png" class="inline mr-2 w-6" alt="">
                        Source Code
                    </a>
                </div>
                <p class="mt-4 font-sans text-xs text-center">All sounds and Pokémon sprites are owned by Spike Chunsoft Ltd.<br>
                    Pokémon is a registered trademark of Nintendo/Creatures Inc./GAME FREAK Inc.<br>
                    This fan game is in no way affiliated the mentioned entites.</p>
            </section>
    </dialog>
</template>