import InputHandler     from './input.js';
import Sensor           from './sensor.js';
import {polysIntersect} from './utils.js'    



export default class Car {
    constructor(x, y, width, height, controlType, maxSpeed = 3){
        //початкові параметри розміщення і розмірів обєкта
        this.x             = x;
        this.y             = y;
        this.size          = 1.5;
        this.width         = width * this.size ;
        this.height        = height * this.size ;
        // підключаємо зображення
        this.image         = new Image;
        this.image.src     = `images/auto.png`;
        // параметри початкового розміру кадру (frame) зображення 
        this.autoWidth     = 25;
        this.autoHeight    = 47;
        // параметри швидкості
        this.speed         = 0;
        this.speedMax      = maxSpeed;
        this.acceleration  = .2;
        this.friction      = .01;
        this.angel         = 0;
        
        this.damaged       = false;
        
        if(controlType ==='Player'){
            // підключаємо обєкт сенсорів
            this.sensor        = new Sensor (this);
        }
        // підключаємо обєкт керування 
        this.input         = new InputHandler(controlType);
    };
   
    update(roadBorders, trafic){
        if(!this.damaged){
            this.#move();
            this.poligon = this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders, trafic);
        }
        if(this.sensor) this.sensor.update(roadBorders, trafic);
    };

    #assessDamage(roadBorders, trafic){
       
        console.log(trafic.length)
        // console.log(trafic[0].poligon)
        // console.log(this.poligon)
        
        for(let i = 0; i < roadBorders.length; ++i){
            if(polysIntersect(this.poligon, roadBorders[i])) return true 
        }
        // return false;
        for(let i = 0; i < trafic.length; ++i){
            if(polysIntersect(this.poligon, trafic[i].poligon)) return true 
        }
        return false;
    }

    #createPolygon(){
        const points = [];
        const radius = Math.hypot(this.width, this.height) * .5;
        const alpha  = Math.atan2(this.width, this.height);
        points.push({ x: this.x - Math.sin(this.angel - alpha) * radius,
                      y: this.y - Math.cos(this.angel - alpha) * radius
        });
              
        points.push({ x: this.x - Math.sin(this.angel + alpha) * radius,
                      y: this.y - Math.cos(this.angel + alpha) * radius
        });
        
        points.push({ x: this.x - Math.sin(Math.PI + this.angel - alpha) * radius,
                      y: this.y - Math.cos(Math.PI + this.angel - alpha) * radius
        });
        points.push({ x: this.x - Math.sin(Math.PI + this.angel + alpha) * radius,
                      y: this.y - Math.cos(Math.PI + this.angel + alpha) * radius
        });
      
        return points;
    }


    #move(){
        if(this.input.restar)  this.damaged = false;
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
        if(this.sensor) this.sensor.draw(ctx);
        
        ctx.save();
            ctx.translate (this.x, this.y);
            ctx.rotate    (-this.angel);
            ctx.drawImage ( this.image, 
                            // параметри кадру, який обераємо
                            0,
                            0,
                            this.autoWidth,
                            this.autoHeight, 
                            // параметри кадру, де буде розміщений і які розміри буде мати
                            - this.width * .5,
                            - this.height * .5,
                            this.width,
                            this.height);
        ctx.restore();

        ctx.save     ();
        ctx.lineWidth   = 1;
        ctx.beginPath();
        
        ctx.strokeStyle = this.damaged ? 'red' : 'blue'
        // ctx.strokeStyle  = 'red';
        const lastValue  = this.poligon.length - 1;
        ctx.moveTo(this.poligon[lastValue].x, this.poligon[lastValue].y);
        for(let i=0; i < this.poligon.length; ++i){
            ctx.lineTo(this.poligon[i].x, this.poligon[i].y)
        };
        ctx.stroke();
        ctx.restore();
    };
}