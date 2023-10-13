import Car from './car.js'
import Road from './road.js'

const canvas = document.getElementById('canvasMS');

canvas.width  = 600;


const ctx = canvas.getContext('2d');
const road = new Road (canvas.width * .5, canvas.width * .9);
const car = new Car (100, 100, 30, 50);
animate();

function animate(){
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    car.update();
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}

