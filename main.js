import Car from './car.js'
import Road from './road.js'

const canvas = document.getElementById('canvasMS');

canvas.width  = 300;


const ctx     = canvas.getContext('2d');
const road    = new Road (canvas.width * .5, canvas.width * .9);
const car     = new Car (road.getLaneCentre(1), 100, 30, 50, 'Player');
const trafic  = [new Car (road.getLaneCentre(0), -100, 30, 50, 'DUMMY', 2.5),
                 new Car (road.getLaneCentre(2), -50, 30, 50, 'DUMMY', 2)];


animate();

function animate(){
    for(let i = 0; i < trafic.length; ++i) trafic[i].update(road.borders, []);
    car.update(road.borders, trafic);
    
    canvas.height = window.innerHeight;
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * .7);

    road.draw(ctx);
    car.draw(ctx);
    for(let i = 0; i < trafic.length; ++i) trafic[i].draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}

