import {lerp} from './utils.js'

export default class Road {
    constructor(x, width, laneCount=2){
        this.x         = x;
        this.width     = width;
        this.laneCount = laneCount;

        this.left      = x - width * .5; 
        this.right     = x + width * .5;
        
        const infinity = 1000000;
        this.top       = -infinity;
        this.bottom    =  infinity;
    };

    draw(ctx){
        ctx.lineWidth   = 5;
        ctx.strokeStyle = 'white';

        for(let i = 0; i <= this.laneCount; ++i){
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount,
            );
            i > 0 && i < this.laneCount ? ctx.setLineDash([20,20]) : ctx.setLineDash([])
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}

