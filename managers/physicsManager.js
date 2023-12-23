import {mapManager} from "./mapManager.js";
import {gameManager} from "./gameManager.js";

export class PhysicsManager{

    update(obj){

        if (obj.move_x === 0 && obj.move_y === 0){
            return
        }
        const newPosX = obj.posX + Math.floor(obj.move_x * obj.speed);
        const newPosY = obj.posY + Math.floor(obj.move_y * obj.speed);
        const wallLayer = mapManager.getTileId(newPosX + obj.sizeX/2, newPosY + obj.sizeY/3*2, 1);
        const entity = this.collisions(obj, newPosX, newPosY);
        let state = 'move';
        if(wallLayer !== 0 && obj.onTouchMap && obj.name !== 'enemy') {
            obj.onTouchMap();
        } else if(entity !== null && wallLayer === 0){
            state = obj.onTouchEntity(entity);
        }
        if(state === 'move' && wallLayer === 0) {
            obj.posX = newPosX;
            obj.posY = newPosY;
        }

    }

    collisions(obj, x, y) {
        for (let i = 0; i < gameManager.entities.length; i++) {
            const entity = gameManager.entities[i];
            if (entity.name !== obj.name) {
                if (x + obj.sizeX < entity.posX || y + obj.sizeY < entity.posY ||
                    x > entity.posX + entity.sizeX || y > entity.posY + entity.sizeY) {
                    continue;
                }
                return entity;
            }
        }
        return null;
    }
}

export let physicsManager = new PhysicsManager();