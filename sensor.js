import {lerp}            from './utils.js'
import {getIntersection} from './utils.js'

export default class Sensor {
    constructor(car){
        this.car      = car;
        // параметри сенсорів
        this.rayCount  = 12;               // кількість сенсорів 
        this.rayLenght = 100;             // дальність роботи сенсорів
        this.raySpread = Math.PI * 2;   // кут напрямку сенсорів

        this.rays      = [];
        this.readings  = [];

    };
    

    update(roadBorders){
        this.rays      = [];
        this.readings  = [];

        this.#castReys();

        for (let i = 0; i < this.rays.length; ++i){
            this.readings.push(
                this.#getReading(this.rays[i], roadBorders)  
            )
        }
    };
   
    #getReading(ray, roadBorders){
        let touches = [];
        for( let i = 0; i < roadBorders.length; ++i){
            const touch = getIntersection(
                                            // координати краю дороги
                                            roadBorders[i][0],            // координата границі topLeft;
                                            roadBorders[i][1],            // координата границі bottonLeft;
                                            // координати промення
                                            ray[0],                      // координата промення start;
                                            ray[1],                      // координата промення end
                            );
            if(touch) touches.push(touch);
        };


        if(touches.length === 0) {
            return null
        }else{
            const offsets   = touches.map(e => e.offset);               // створюємо новий масив offsets із значень offset які є в масиві touches (знайди і створи)
            const minOffset = Math.min(...offsets);                     // знаходимо в свтоеному масиві мінімальне значення
            return touches.find(e => e.offset === minOffset);           // знаходимо в масиві touches мінімальне значення і повертаємо 
        };
    }
// функція розташування променів
    #castReys(){
        this.rays      = [];
        for(let i = 0; i < this.rayCount; ++i){
            const rayAngel = this.car.angel + lerp( this.raySpread * .5,
                                                    -this.raySpread * .5,
                                                    this.rayCount === 1 ? .5 : i / (this.rayCount - 1) );
            const start    = {x: this.car.x,
                              y: this.car.y};
            const end      = {x: this.car.x - Math.sin(rayAngel) * this.rayLenght,
                              y: this.car.y - Math.cos(rayAngel) * this.rayLenght};
            this.rays.push([start, end]);
        };
    }

    draw(ctx){
        for( let i = 0; i < this.rayCount; ++i){
            let end = this.rays[i][1];

            if (this.readings[i]){
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth   = 2;
            ctx.strokeStyle = 'yellow';
            ctx.moveTo(this.rays[i][0].x,
                       this.rays[i][0].y);
            ctx.lineTo(end.x,
                       end.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth   = 2;
            ctx.strokeStyle = 'black';
            ctx.moveTo(this.rays[i][1].x,
                       this.rays[i][1].y);
            ctx.lineTo(end.x,
                       end.y);
            ctx.stroke();
        };
    }
}