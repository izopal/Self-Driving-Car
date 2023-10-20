const body = document.body

export default class InputHandler {
    constructor(type){
        this.forward = false;
        this.left    = false;
        this.right   = false;
        this.reverse = false;
        this.restar  = false;

        switch(type){
            case 'Player':
                this.#addKeyboardListeners();
                break;
            case 'DUMMY':
                this.forward = true;
                break;
        }
    }


    #addKeyboardListeners(){
        body.onkeydown = (event) =>{
            // console.log(event)
            switch(event.key){
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case 'ArrowUp':
                    this.forward = true;
                    break;
                case 'ArrowDown':
                    this.reverse = true;
                    break;
                case 'Enter':
                    this.restar = true;
                    break;
            }
            // console.table(this);
        };

        body.onkeyup = (event) =>{
            switch(event.key){
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
                case 'ArrowUp':
                    this.forward = false;
                    break;
                case 'ArrowDown':
                    this.reverse = false;
                    break;
                case 'Enter':
                    this.restar = false;
                    break;
            }
            // console.table(this);
        }
    }
}