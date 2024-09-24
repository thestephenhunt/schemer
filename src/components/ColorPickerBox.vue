<script setup>
import { ref } from 'vue'
import ColorPicker from './ColorPicker.vue'
import { store } from '../store/store.js'

</script>

<template>
    <figure id="main-color" :style="{ backgroundColor: 'rgb(' + store.color.r + ', ' + store.color.g + ', ' + store.color.b }">
        <figcaption>#000000</figcaption>
    </figure>
    <input type="range" min="0" max="360" step="any" />

    <ColorPicker />
</template>

<style scoped>
figure {
    background-color: #000;
    min-width: 20vw;
    min-height: 10vh;
    position: relative;
    display: flex;
    place-items: center;
    justify-content: center;
    border: 1px solid #555;

    figcaption {
        color: white;
    }
}
input[type="range"] {
    width: 100%;
    margin: 1rem 0;    height: 50px;
    outline: none;

    &::-webkit-slider-runnable-track {
        background: linear-gradient(to right, #ff0000 0%, #ff4000 4.167%, #ff8000 8.33%, #ffbf00 12.5%, #ffff00 16.67%, #bfff00 20.83%, #80ff00 25%, #40ff00 29.16%, #00ff00 33.3%, #00ff40 37.5%, #00ff80 41.66%, #00ffbf 45.83%, #00ffff 50%, #00bfff 54.16%, #0080ff 58.33%, #0040ff 62.5%, #0000ff 66.66%, #4000ff 70.83%, #8000ff 75%, #bf00ff 79.16%, #ff00ff 83.33%, #ff00bf 87.5%, #ff0080 91.66%, #ff0040 95.83%, #ff0000 100%);
    }
    &::-moz-range-track {
        background: linear-gradient(to right, #ff0000 0%, #ff4000 4.167%, #ff8000 8.33%, #ffbf00 12.5%, #ffff00 16.67%, #bfff00 20.83%, #80ff00 25%, #40ff00 29.16%, #00ff00 33.3%, #00ff40 37.5%, #00ff80 41.66%, #00ffbf 45.83%, #00ffff 50%, #00bfff 54.16%, #0080ff 58.33%, #0040ff 62.5%, #0000ff 66.66%, #4000ff 70.83%, #8000ff 75%, #bf00ff 79.16%, #ff00ff 83.33%, #ff00bf 87.5%, #ff0080 91.66%, #ff0040 95.83%, #ff0000 100%);
        height: 20px;
    }
}
.info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.selected {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 2px solid #333;
}
</style>