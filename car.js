import InputHandler from './input.js';


export default class Car {
    constructor(x, y, width, height){
        //початкові параметри розміщення і розмірів обєкта
        this.x             = x;
        this.y             = y;
        this.width         = width;
        this.height        = height;
        // підключаємо обєкт керування
        this.input         = new InputHandler;
        // параметри швидкості
        this.speed         = 0;
        this.speedMax      = 3;
        this.acceleration  = .2;
        this.friction      = .01;
        this.angel         = 0;
    };
    update(){

        this.#move();
        
    };
    
    #move(){
        if(this.input.forward) this.speed += this.acceleration;
        if(this.input.reverse) this.speed -= this.acceleration;
        
        if(this.speed >  this.speedMax)      this.speed =  this.speedMax;
        if(this.speed < -this.speedMax * .5) this.speed = -this.speedMax * .5;

        if(this.speed > 0) this.speed -= this.friction;
        if(this.speed < 0) this.speed += this.friction;

        if(Math.abs(this.speed) < this.friction) this.speed = 0;
        if(this.speed !==0){ 
            const flip = this.speed > 0 ? 1 : -1;
            if(this.input.left)  this.angel += .03 * flip;
            if(this.input.right) this.angel -= .03 * flip;
        };

        this.x -= Math.sin(this.angel) * this.speed;
        this.y -= Math.cos(this.angel) * this.speed;
    };

    draw(ctx){
        ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate   (-this.angel);
            ctx.beginPath();
            ctx.rect     (- this.width * .5,
                        - this.height * .5,
                        this.width,
                        this.height);
            ctx.fill      ();
        ctx.restore();
    };
}