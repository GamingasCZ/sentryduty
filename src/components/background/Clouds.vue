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
let starCanvas: OffscreenCanvas
const cloudWeight = [0.8, 1.2, 1, 0.9, 1]
onMounted(() => {
    let motherWidth = main.value?.width!
    let motherHeight = main.value?.height!

    starCanvas = makeStars(100)

    for (let i = 0; i < 5; i++) {
        getCloudCanvas(i).then((res: any) => {
            let cloud = res as OffscreenCanvas
            clouds.push(cloud)
            
            // Place clouds randomly
            cloudsPos.push([
                Math.random() * (motherWidth+cloud.width-1) - cloud.width,
                Math.random() * (motherHeight-cloud.height)
            ])
        })
    }
    
    setInterval(moveClouds, 1/60*1000)
})

const moveClouds = () => {
    let ctx = main.value?.getContext("2d")
    if (!ctx) return
    
    ctx?.clearRect(0, 0, main.value?.width!, main.value?.height!)
    ctx.globalAlpha = 1
    ctx?.drawImage(starCanvas, 0, 0)
    ctx.globalAlpha = 0.1

    for (let i = 0; i < clouds.length; i++) {
        cloudsPos[i][0] += 0.25 * cloudWeight[i]
        ctx?.drawImage(clouds[i], cloudsPos[i][0], cloudsPos[i][1])
        
        if (cloudsPos[i][0] >= CANVAS_WIDTH) {
            cloudsPos[i][0] = -clouds[i].width
        }
        
    }
}

const makeStars = (amount: number) => {
    let starCanvas = new OffscreenCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    let ctx = starCanvas.getContext("2d")!

    ctx.fillStyle = "white"
    for (let i = 0; i < amount; i++) {
        let starWidth = 2 - Math.floor(Math.random()*2)
        ctx.beginPath()
        ctx.ellipse(CANVAS_WIDTH*Math.random(), CANVAS_HEIGHT*Math.random(), starWidth, starWidth, 0, 0, Math.PI*2);
        ctx.fill()
    }

    return starCanvas
}


</script>

<template>
    <canvas ref="main" class="absolute top-0 right-0 left-0" :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT" />
</template>