<script setup>
import { store } from '../store/store.js'
import { RGBtoHex, relLum } from '@/utils/convert.js';

function selectColor(index) {
    store.color = store.palette[index].color
    store.selected = index
}

function removeColor(e, color) {
    e.preventDefault()
    store.palette = store.palette.filter(item => item.id !== color.id)
}

function textColor(color) {
    if (relLum(color.r, color.g, color.b) >= 0.40) {
        return "black"
    } else {
        return "white"
    }
}
</script>

<template>
    <ul>
        <li v-for="(item, index) of store.palette" :key="item.id" @click="selectColor(index)" @click.right.exact="removeColor($event, item)">
            <div class="palette-color" :data-id="item.id" :style="{ backgroundColor: 'rgb(' + item.color.r + ', ' + item.color.g + ', ' + item.color.b }">
                <p :style="{ color: textColor(item.color) }">{{ RGBtoHex(item.color.r, item.color.g, item.color.b )}}</p>
            </div>
        </li>
    </ul>
</template>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
    display: flex;
}
li {
    flex: 1 1 auto;
}
.palette-color {
    min-width: 50px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center; 
}
</style>