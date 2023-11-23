import {Entity} from "./entity.js"


export class Enemy extends Entity{
    speed = 1;
    move_x = 0;
    move_y = 0;
    HP = 0;

    constructor() {
        super();
    }

    draw(ctx){

    }

    update(){

    }

    onTouchEntity(obj){

    }

    kill(){

    }
}