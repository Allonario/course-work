import {Entity} from "./entity.js"
import {gameManager} from "../managers/gameManager.js";
import {spriteManager} from "../managers/spriteManager.js";
import {physicsManager} from "../managers/physicsManager.js";
import {soundManager} from "../managers/soundManager.js";


export class Enemy extends Entity{
    speed = 5;
    move_x = -1;
    move_y = 0;
    HP = 0;
    reloadTime = 0;
    destinationTime = 0;

    constructor() {
        super();
        this.HP = 1;
        this.name = 'enemy';
        this.spriteName = 'raccoon_down';
    }

    draw(ctx){
        spriteManager.drawSprite(ctx, this.spriteName, this.posX, this.posY)
    }

    update(){
        if(this.HP <= 0){
            soundManager.play("../sounds/death.mp3");
            this.kill();
        }
        this.checkForPlayer();
        physicsManager.update(this);
        this.spriteUpdate();
    }

    onTouchEntity(obj){
        if(obj.name === 'player'){
            if((new Date()).getTime() - this.reloadTime >= 450){
                this.attack(obj);
                soundManager.play("../sounds/punch.mp3");
                this.reloadTime = (new Date()).getTime();
            }
            return 'attack';
        }
        return 'move';
    }

    onTouchMap(){
        if(this.move_y === 0) {
            this.move_x *= -1;
        }
        else{
            this.move_y *= -1;
        }
    }

    spriteUpdate(){
        if (this.move_x === 1) {
            this.spriteName = 'raccoon_right'
        } else if(this.move_x === -1){
            this.spriteName = 'raccoon_left'
        } else if(this.move_y === 1){
            this.spriteName = 'raccoon_down'
        } else if(this.move_y === -1){
            this.spriteName = 'raccoon_up'
        }
    }

    attack(obj){
        obj.HP -= 1;
        document.getElementById('HP').textContent = String(obj.HP);
    }

    kill(){
        localStorage.score = Number(localStorage.score) + 200;
        document.getElementById('Score').textContent = String(localStorage.score);
        gameManager.laterKill.push(this);
    }

    checkForPlayer() {
        let player = gameManager.player;
        if((Math.abs(this.posX - player.posX) <= 20 * 32) && (Math.abs(this.posY - player.posY) <= 20 * 32)) {
            this.following(player.posX, player.posY);
        }
    }

    following(posX, posY) {
        if (this.move_x !== 0 && !(this.posY + 10 >= posY && this.posY - 10 < posY))  {
            if((new Date()).getTime() - this.destinationTime >= 450) {
                this.move_x = 0;
                if (this.posY >= posY) this.move_y = -1;
                if (this.posY < posY) this.move_y = 1;
                this.destinationTime = (new Date()).getTime();
                return;
            }
        }
        if (this.move_y !== 0 && !((this.posX + 10 >= posX && this.posX - 10 < posX))) {
            if((new Date()).getTime() - this.destinationTime >= 450) {
                this.move_y = 0;
                if (this.posX >= posX) this.move_x = -1;
                if (this.posX < posX) this.move_x = 1;
                this.destinationTime = (new Date()).getTime();
            }
        }
    }
}