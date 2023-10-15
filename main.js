import Car from './car.js'
import Road from './road.js'

const canvas = document.getElementById('canvasMS');

canvas.width  = 300;


const ctx  = canvas.getContext('2d');
const road = new Road (canvas.width * .5, canvas.width * .9);
const car  = new Car (road.getLaneCentre(1), 100, 30, 50);

animate();

function animate(){
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = window.innerHeight;
    car.update(road.borders);
    
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * .7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}

