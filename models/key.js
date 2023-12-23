import {Entity} from "./entity.js";
import {spriteManager} from "../managers/spriteManager.js";
import {gameManager} from "../managers/gameManager.js";

export class Key extends Entity{

    constructor() {
        super();
        this.name = 'key';
        this.spriteName = 'key'
    }

    draw(ctx){
        spriteManager.drawSprite(ctx, this.spriteName, this.posX, this.posY)
    }

    kill(){
        gameManager.laterKill.push(this);
    }
}