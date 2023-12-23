import {Entity} from "./entity.js";
import {spriteManager} from "../managers/spriteManager.js";
import {gameManager} from "../managers/gameManager.js";

export class Heal extends Entity{

    constructor() {
        super();
        this.name = 'heal';
        this.spriteName = 'heal'
    }

    draw(ctx){
        spriteManager.drawSprite(ctx, this.spriteName, this.posX, this.posY)
    }

    kill(){
        gameManager.laterKill.push(this);
    }
}