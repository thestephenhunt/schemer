<script setup>
import { computed } from 'vue'
import { store } from '../store/store.js'
import { RGBtoHex, RGBtoHSL, HexToRgb } from '../utils/convert.js'

const props = defineProps(['color'])

const hexColor = computed(() => {
    return RGBtoHex(store.color.r, store.color.g, store.color.b)
})
const rgbColor = computed(() => {
    return store.color.r + ', ' + store.color.g + ', ' + store.color.b
})
const hslColor = computed(() => {
    return RGBtoHSL(store.color.r, store.color.g, store.color.b)
})

function updateColor(e) {
    let c = HexToRgb(e.target.value)
    store.color = c
}
</script>

<template>
    <aside>
        <h3>Hex code:</h3>
        <input type="text" class="color-code" v-model="hexColor" @change="updateColor"/>
        <h3>RGB:</h3>
        <p class="color-code">{{ rgbColor }}</p>
        <h3>HSL:</h3>
        <p class="color-code">{{ hslColor.h + ', ' + hslColor.s + ', ' + hslColor.l }}</p>
    </aside>
</template>

<style scoped>
h3 {
    font-size: 1.5rem;
}
.color-code {
    text-align: center;
    padding: 0.5rem;
    font-size: 1.25rem;
    box-shadow: 0px 0px 5px 5px #ddd inset;
}
</style>