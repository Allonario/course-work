import {Entity} from "./entity.js";
import {spriteManager} from "../managers/spriteManager.js";
import {physicsManager} from "../managers/physicsManager.js";
import {gameManager} from "../managers/gameManager.js";

export class Arrow extends Entity{
    move_x = 0;
    move_y = 0;
    posX = 0;
    posY = 0;
    speed = 16;

    constructor() {
        super();
        this.name = 'arrow';
    }

    draw(ctx){
        spriteManager.drawSprite(ctx, this.spriteName, this.posX, this.posY)
    }

    update(){
        physicsManager.update(this);
    }

     onTouchEntity(obj){
        console.log(obj.name);
         if(obj.name === 'enemy'){
             console.log('attack', obj.HP);
             this.attack(obj);
             this.kill();
             return 'attack';
         }
         return 'move';
     }

     onTouchMap(){
        this.kill();
     }

     kill(){
         gameManager.laterKill.push(this);
     }

    attack(obj){
        obj.HP -= 1;
    }
}

export let arrow = new Arrow();