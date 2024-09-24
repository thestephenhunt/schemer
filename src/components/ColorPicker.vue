<script setup>
import { onMounted } from 'vue'
import ColorPickerCircle from './ColorPickerCircle.vue'
import { store } from '../store/store.js'

let picker
let localColor
let selected

onMounted(() => {
    picker = new Picker(document.getElementById("color-picker"), 250, 250)
    selected = document.getElementById("selected-color")

    picker.draw()
})

class Picker {
    constructor(target, width, height) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.target.width = width;
        this.target.height = height;
        this.context = this.target.getContext("2d");
        this.pickerCircle = { x: 20, y: 20, width: 7, height: 7 };

        this.listenForEvents()
    }
    draw() {
        this.buildSquarePicker()
        this.buildCursor()
    }

    buildSquarePicker() {
        // Color gradient
        let gradient = this.context.createLinearGradient(0, 0, this.width, 0);

        gradient.addColorStop(0, "rgb(255,0,0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);

        // Black and white gradient
        gradient = this.context.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.5, "rgba(255,255,255,0)");
        gradient.addColorStop(0.5, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,1)");

        this.context.fillStyle = gradient;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    buildCursor() {
        //Circle
        this.context.beginPath();
        this.context.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2);
        this.context.strokeStyle = "black";
        this.context.stroke();
        this.context.closePath();
    }

    listenForEvents() {
        const onMouseMove = (e) => {
                let currentX = e.clientX - this.target.offsetLeft
                let currentY = e.clientY - this.target.offsetTop
                this.pickerCircle.x = currentX
                this.pickerCircle.y = currentY
                localColor = this.getPickedColor()
        }

        this.target.addEventListener("mousemove", onMouseMove)
    }

    getPickedColor() {
        //Get the Image Data (pixel value) pointed by the circle by using it's current position
        //getImageData returns an object that has the pixel data (1, 1) is for getting only one pixel.
        let imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
        //Return back an object has the RGB color value of the pointed pixel.
        //The data is an array holds the red, green, blue and alpha values of the current pixel 
        return { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };
    }
}

function drawMouse() {
    picker.draw()
}

function getColor() {
    let color = picker.getPickedColor()
    store.color = color
    if (store.selected !== null) {
        store.palette[store.selected].color = color
        store.selected = null
    } else {
        store.palette.push({ id: store.palette.length + 1, color: color })
    }
}

</script>

<template>
    <div>
        <canvas id="color-picker" @mousemove="drawMouse" @click="getColor"></canvas>
        <ColorPickerCircle />
    </div>
</template>

<style scoped>
#selected-color {
    width: 50px;
    height: 50px;
    border-radius: 100%;
}
</style>