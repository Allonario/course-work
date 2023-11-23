import {Entity} from './entity.js'
import {Arrow} from "./arrow.js";
import {spriteManager} from "../managers/spriteManager.js";

export class Player extends Entity{
    speed = 1;
    move_x = 0;
    move_y = 0;
    HP = 0;
    hasKey = false;

    constructor() {
        super();
    }

    draw(ctx){
        spriteManager.drawSprite(ctx, 'cat_down', this.posX, this.posY)
    }

    update(){

    }

    onTouchEntity(obj){

    }

    kill(){

    }

    fire(){
        let arrow = new Arrow();
        arrow.sizeX = 32;
        arrow.sizeX = 32;
        arrow.name = "arrow" + (++arrowNumber);
        arrow.move_x = this.move_x;
        arrow.move_y = this.move_y;
        switch (this.move_x + 2 * this.move_y){
            case -1:
                arrow.posX = this.posX - arrow.sizeX;
                arrow.posY = this.posY;
                break;
            case 1:
                arrow.posX = this.posX + arrow.sizeX;
                arrow.posY = this.posY;
                break;
            case -2:
                arrow.posX = this.posX;
                arrow.posY = this.posY - arrow.sizeY;
                break;
            case 2:
                arrow.posX = this.posX;
                arrow.posY = this.posY + arrow.sizeY;
                break;
            default:
                return;
        }
    }
}