import {Entity} from './entity.js'
import {Arrow} from "./arrow.js";
import {spriteManager} from "../managers/spriteManager.js";
import {gameManager} from "../managers/gameManager.js";
import {physicsManager} from "../managers/physicsManager.js";
import {soundManager} from "../managers/soundManager.js";

export class Player extends Entity{
    speed = 6;
    move_x = 0;
    move_y = 0;
    HP = 0;
    hasKey = false;
    reloadStart = 0;


    constructor() {
        super();
        if(gameManager.level === 1){
            this.HP = 3;
        } else{
            this.HP = Number(localStorage.getItem('HP'));
        }
        this.name = 'player';
        this.spriteName = 'cat_down';
        document.getElementById('HP').textContent = String(this.HP);
    }

    draw(ctx){
        spriteManager.drawSprite(ctx, this.spriteName, this.posX, this.posY)
    }

    update(){
        physicsManager.update(this);
        if(this.HP <= 0){
            this.kill();
            soundManager.play("../sounds/death.mp3")
            setTimeout(() => {gameManager.gameOver();}, 200);
        }
        this.spriteUpdate();
    }

    onTouchEntity(obj){
        console.log(obj);
        switch (obj.name){
            case 'enemy':
                return 'attack';
            case 'key':
                console.log('key')
                this.hasKey = true;
                soundManager.play("../sounds/key.mp3");
                document.getElementById('Key').textContent = 'Найден';
                obj.kill();
                return 'move';
            case 'heal':
                this.HP += 1;
                obj.kill();
                soundManager.play("../sounds/sip.mp3");
                document.getElementById('HP').textContent = String(this.HP);
                return 'move';
            case 'door':
                if(this.hasKey){
                    obj.kill();
                    soundManager.play("../sounds/delete_magic.mp3");
                    localStorage.HP = this.HP;
                    localStorage.score = Number(localStorage.score) + 100;
                    document.getElementById('Score').textContent = String(localStorage.score);
                    setTimeout(()=>{window.location.href = 'level_2.html'}, 500);
                    return 'move';
                } else{
                    return 'attack';
                }
            case 'chest':
                if(this.hasKey){
                    obj.kill();
                    soundManager.play("../sounds/open_chest.mp3");
                    localStorage.score = Number(localStorage.score) + 300 + this.HP * 50;
                    document.getElementById('Score').textContent = String(localStorage.score);
                    setTimeout(() => {gameManager.gameOver();}, 200);
                    return 'move';
                } else{
                    return 'attack';
                }
            default:
                return 'move';
        }
    }

    kill(){
        gameManager.laterKill.push(this);
    }

    attack(){
        if((new Date()).getTime() - this.reloadStart > 400) {
            const arrow = new Arrow();
            arrow.sizeX = 32;
            arrow.sizeY = 32;
            switch (this.spriteName) {
                case 'cat_left':
                    arrow.posX = this.posX - arrow.sizeX / 2;
                    arrow.posY = this.posY;
                    arrow.move_x = -1;
                    arrow.move_y = 0;
                    arrow.spriteName = "arrow_left";
                    break;
                case 'cat_right':
                    arrow.posX = this.posX + arrow.sizeX / 2;
                    arrow.posY = this.posY;
                    arrow.move_x = 1;
                    arrow.move_y = 0;
                    arrow.spriteName = "arrow_right";
                    break;
                case 'cat_up':
                    arrow.posX = this.posX;
                    arrow.posY = this.posY - arrow.sizeY / 2;
                    arrow.move_x = 0;
                    arrow.move_y = -1;
                    arrow.spriteName = "arrow_up";
                    break;
                case 'cat_down':
                    arrow.posX = this.posX;
                    arrow.posY = this.posY + arrow.sizeY / 2;
                    arrow.move_x = 0;
                    arrow.move_y = 1;
                    arrow.spriteName = "arrow_down";
                    break;
                default:
                    break;
            }
            gameManager.entities.push(arrow);
            this.reloadStart = (new Date()).getTime();
        }
    }

    spriteUpdate(){
        if (this.move_x === 1) {
            this.spriteName = 'cat_right';
        } else if(this.move_x === -1){
            this.spriteName = 'cat_left';
        } else if(this.move_y === 1){
            this.spriteName = 'cat_down';
        } else if(this.move_y === -1){
            this.spriteName = 'cat_up';
        }
    }
}