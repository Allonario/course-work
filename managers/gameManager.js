import {Entity} from "../models/entity.js";
import {Enemy} from "../models/enemy.js";
import {Player} from "../models/player.js";

export class GameManager{
    factory = {};
    entities = [];
    fireNum = 0;
    player = null;
    laterKill = [];

    constructor() {
        this.factory['player'] = Player;
    }

    initPlayer(obj){
        this.player = obj;
    }

    kill(obj){
        this.laterKill.push(obj);
    }

    update(){

    }

    draw(ctx){
        if(this.entities.length === 0) {
            setTimeout(() => {
                this.draw(ctx);
            }, 100);
        } else{
            for(let ent = 0; ent < this.entities.length; ent++){
                console.log(this.entities);
                this.entities[ent].draw(ctx);
            }
        }
    }

    loadAll(){

    }

    play(){

    }
}

export let gameManager = new GameManager();