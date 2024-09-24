<script setup>
import { onMounted } from 'vue';

function doStuff(){
	const {PI, cos, sin} = Math;
	const L = 400;
	const C = L/2;
	const LINE_WIDTH = 4;
	const COLOR1 = "white";
	const COLOR2 = "black";

	const container = document.querySelector('#circle-color-picker');
	const canvas = document.createElement('canvas');
	const text = document.querySelector('#main-color');
	const picked_color = document.querySelector('.picked-color');
    const client = document.getElementById('client-x');
    const canvasOffset = document.getElementById('canvas-offset');
	canvas.height = canvas.width = L;
	canvas.style.height = canvas.style.width = `${L}px`;

	container.appendChild(canvas);

	const ctx = canvas.getContext('2d');
	ctx.lineWidth = LINE_WIDTH;

	var grad= ctx.createLinearGradient(C, C, C, 0);
	var red = 255;
	var green = 0;
	var blue = 0;
	var rgb = "";
	var x = 0;
	var y = 0;
	for(var i = 0; i<360; i++){
		if(i<60){
			green = Math.floor((255/60)*i);
		}
		else if(i<120){
			green = 255;
			red = 255 - Math.floor((255/60)*(i-60));
		}
		else if(i<180){
			red = 0;
			blue = Math.floor((255/60)*(i-120));
		}
		else if(i<240){
			blue = 255;
			green = 255 - Math.floor((255/60)*(i-180));
		}
		else if(i<300){
			green = 0;
			red = Math.floor((255/60)*(i-240));
		}
		else{
			red = 255;
			blue = 255 - Math.floor((255/60)*(i-300));
		}
		x = C*sin(i*PI/180);
		y = C*cos(i*PI/180);
		grad= ctx.createLinearGradient(C, C, C+x, C+y);
		rgb = "rgb("+red+","+green+","+blue+")";
		grad.addColorStop(0, COLOR1);
		grad.addColorStop(0.5, rgb);
		grad.addColorStop(1, COLOR2);
		ctx.strokeStyle = grad;
		ctx.beginPath();
		ctx.moveTo(C,C);
		ctx.lineTo(C+x,C+y);
		ctx.stroke();
	}

	canvas.addEventListener('mousemove', function show(event){
		var x_pick = event.clientX - canvas.offsetLeft;
	  	var y_pick = event.clientY - canvas.offsetTop;
        client.textContent = `X: ${event.clientX} Y: ${event.clientY}`
        canvasOffset.textContent = `Left: ${canvas.offsetLeft} Top: ${canvas.offsetTop}`
	  	var pixel = ctx.getImageData(x_pick, y_pick, 1, 1);
	  	var data = pixel.data;
	  	var rgb = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
	  	text.style.backgroundColor=  rgb;
	  	text.textContent = rgb;
	  	text.style.color = 'rgb(' + (255-data[0]) + ',' + (255-data[1]) + ',' + (255-data[2]) + ')';
	});

	canvas.addEventListener('mousedown', function pick(event){
		var x_pick = event.clientX - canvas.offsetLeft;
	  	var y_pick = event.clientY - canvas.offsetTop;
	  	var pixel = ctx.getImageData(x_pick, y_pick, 1, 1);
	  	console.log(pixel);
	  	var data = pixel.data;
	  	var rgb = 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
	  	picked_color.style.backgroundColor = rgb;
	});
}

onMounted(() => {
    doStuff()
})
    
</script>

<template>
    <span id="client-x"></span>
    <span id="canvas-offset"></span>
    <div id="circle-color-picker"></div>
</template>

<style scoped>
#circle-color-picker {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
canvas {
  display: block;
  background-color: transparent;
}
</style>