import {lerp} from './utils.js'

export default class Road {
    constructor(x, width, laneCount=3){
        this.x         = x;
        this.width     = width;
        this.laneCount = laneCount;
        // параметри границь 
        const infinity = 1000000;
        this.left      = x - width * .5; 
        this.right     = x + width * .5;
        this.top       = -infinity;
        this.bottom    =  infinity;
        // координати вершин canvas
        const topLeft     = {x: this.left,
                             y: this.top};
        const bottomLeft  = {x: this.left,
                             y: this.bottom};
        const topRight    = {x: this.right,
                             y: this.top};
        const bottomRight = {x: this.right,
                             y: this.bottom};
        this.borders = [
            [topLeft,  bottomLeft],
            [topRight, bottomRight],
        ];
    };
    // функція визначення розміщення обєкту по центру полоси
    getLaneCentre(LaneIndex){
        const LaneWidth = this.width / this.laneCount;
        return (this.left + LaneWidth * .5) +  LaneWidth * Math.min(LaneIndex, this.laneCount - 1);
    }


    draw(ctx){
        ctx.lineWidth   = 5;
        ctx.strokeStyle = 'white';

        // умова для створення ліні
        for(let i = 1; i <= this.laneCount-1; ++i){
            const x = lerp (this.left,
                            this.right,
                            i / this.laneCount);
            
            ctx.setLineDash([40,20]) 
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        };

        ctx.setLineDash([]);
        this.borders.forEach(border =>{
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        })
    }
}

