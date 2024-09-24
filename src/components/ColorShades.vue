<script setup>
import { store } from '../store/store.js'
import { computed } from 'vue'
import { RGBtoHSL, HSLToHex } from '../utils/convert.js'

const shadeList = computed(() => {
    let hslColor = RGBtoHSL(store.color.r, store.color.g, store.color.b)
    let hslArray = []
    for (let i=0;i < 21;i++) {
        if (i > 0) {
            hslArray.push({ h: hslColor.h, s: hslColor.s, l: i * 5 })
        } else {
            hslArray.push({ h: hslColor.h, s: hslColor.s, l: i * 5 })
        }
    }
    return hslArray
})
</script>

<template>
    <div id="shade-container">
        <ul>
            <li v-for="color in shadeList">
                <p>{{ `${color.l}%` }}</p>
                <div class="color-block" :style="{ backgroundColor: 'hsl(' + color.h + ',' + color.s + '%,' + color.l + '%)'}"></div>
                <p>{{ HSLToHex(color.h, color.s, color.l) }}</p>
            </li>
        </ul>
    </div>
</template>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: flex;
    justify-content: space-between;
}
.color-block {
    min-width: 30px;
    max-width: 50px;
    height: 20px;
}
</style>