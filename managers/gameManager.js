import {Enemy} from "../models/enemy.js";
import {Player} from "../models/player.js";
import {eventManager} from "./eventManager.js";
import {mapManager} from "./mapManager.js";
import {Heal} from "../models/heal.js";
import {Door} from "../models/door.js";
import {Key} from "../models/key.js";
import {Chest} from "../models/chest.js";
import {soundManager} from "./soundManager.js";

export class GameManager{
    factory = {};
    entities = [];
    player = null;
    laterKill = [];
    isGameOver = false;
    level = 0;
    music = ["../sounds/death.mp3", "../sounds/delete_magic.mp3", "../sounds/sip.mp3",
        "../sounds/open_chest.mp3", "../sounds/punch.mp3", "../sounds/key.mp3"]

    constructor() {
        document.getElementById('Score').textContent = String(localStorage.score);
        this.factory['chest'] = Chest;
        this.factory['player'] = Player;
        this.factory['enemy'] = Enemy;
        this.factory['heal'] = Heal;
        this.factory['key'] = Key;
        this.factory['door'] = Door;
    }

    initPlayer(obj){
        this.player = obj;
    }

    kill(obj){
        this.laterKill.push(obj);
    }

    update(ctx){
        if(this.isGameOver){

        }
        if (this.player === null)
            return;
        this.player.move_x = 0;
        this.player.move_y = 0;


        if (eventManager.actions["up"]) {
            this.player.move_y = -1
            this.player.move_x = 0
        }
        if (eventManager.actions["down"]) {
            this.player.move_y = 1
            this.player.move_x = 0
        }
        if (eventManager.actions["left"]) {
            this.player.move_x = -1
            this.player.move_y = 0
        }
        if (eventManager.actions["right"]) {
            this.player.move_x = 1
            this.player.move_y = 0
        }
        if (eventManager.actions["attack"]){
            this.player.attack();
        }


        this.entities.forEach((entity) => {
            try {
                entity.update();

            } catch (ex) {

            }
        });

        for (let i = 0; i < this.laterKill.length; i++) {
            let idx = this.entities.indexOf(this.laterKill[i]);
            if (idx > -1)
                this.entities.splice(idx, 1);
        }
        mapManager.drawMap(ctx);
        this.draw(ctx);
    }

    draw(ctx){
        if(this.entities.length === 0) {
            setTimeout(() => {
                this.draw(ctx);
            }, 100);
        } else{
            for(let ent = 0; ent < this.entities.length; ent++){
                this.entities[ent].draw(ctx);
            }
        }
    }

    loadAll(canvas){
        eventManager.eventListener(canvas);
        soundManager.init();
        soundManager.loadArray(this.music);
    }

    play(ctx) {
        setInterval(() => {
            this.update(ctx);
        }, 100);
    }

    gameOver(){
        window.location.href = 'gameOver.html'
    }

}
export let gameManager = new GameManager();