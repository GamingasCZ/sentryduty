<script setup lang="ts">
import { onMounted, ref } from 'vue';

const CANVAS_WIDTH = 1920
const CANVAS_HEIGHT = 320
const main = ref<HTMLCanvasElement>()
const base = import.meta.env.BASE_URL

const getCloudCanvas = async (cloundInd: number) => {
    return new Promise((res, err) => {
        let cloud = new Image()
        let canvas = new OffscreenCanvas(CANVAS_WIDTH, 120)

        cloud.src = `${base}/background/clouds/${cloundInd}.webp`
        cloud.addEventListener("load", () => {
            let cont = canvas.getContext("2d")
            canvas.width = cloud.naturalWidth
            canvas.height = cloud.naturalHeight
            
            cont?.drawImage(cloud, 0, 0)
            res(canvas)
        })
        cloud.addEventListener("error", () => err())
    })
}

let clouds: OffscreenCanvas[] = []
let cloudsPos: number[][] = []
const cloudWeight = [0.8, 1.2, 1, 0.9, 1]
let cloudAnim: Timeout
onMounted(async () => {
    let ctx = main.value?.getContext("2d")
    let motherWidth = main.value?.width!
    let motherHeight = main.value?.height!

    for (let i = 0; i < 6; i++) {
        if (i ==5) {
            cloudAnim = setInterval(moveClouds, 1/60*1000)
            break;
        }
        getCloudCanvas(i).then((res: any) => {
            let cloud = res as OffscreenCanvas
            clouds.push(cloud)
            cloudsPos.push([
                Math.random() * (motherWidth+cloud.width-1) - cloud.width,
                Math.random() * (motherHeight-cloud.height)
            ])
        })
    }
})

let pos = 0
const moveClouds = () => {
    let ctx = main.value?.getContext("2d")
    ctx?.clearRect(0, 0, main.value?.width, main.value?.height)
    for (let i = 0; i < clouds.length; i++) {
        cloudsPos[i][0] += 0.25 * cloudWeight[i]
        ctx?.drawImage(clouds[i], cloudsPos[i][0], cloudsPos[i][1])
        
        if (cloudsPos[i][0] >= CANVAS_WIDTH) {
            cloudsPos[i][0] = -clouds[i].width
        }
        
    }
}



</script>

<template>
    <canvas ref="main" class="absolute top-0 right-0 left-0" :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT" />
</template>