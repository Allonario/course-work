import {Entity} from "./entity.js";

export class Arrow extends Entity{
    move_x = 0;
    move_y = 0;
    speed = 4;

    constructor() {
        super();
    }

    draw(ctx){

    }

    update(){

    }

     onTouchEntity(obj){

     }

     onTouchMap(){

     }

     kill(){

     }
}

export let arrow = new Arrow();