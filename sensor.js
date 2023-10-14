export default class Sensor {
    constructor(car){
        this.car      = car;
        // параметри сенсорів
        this.rayCount = 3;                // кількість сенсорів 
        this.rayLenght = 100;             // дальність роботи сенсорів
        this.raySpread = Math.PI * .25;   // кут напрямку сенсорів

        this.rays      = [];
        console.table(this.car)
    };

    update(){
        for(let i = 0; i < this.rayCount; ++i){
            const rayAngel = lerp( this.raySpread * .5,
                                  -this.raySpread * .5,
                                   i / (this.rayCount - 1));
            const start    = {x: this.car.x,
                              y: this.car.y};
            // const end      = {x: }
        }
    }
}