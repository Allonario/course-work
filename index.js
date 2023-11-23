import {spriteManager} from "./managers/spriteManager.js";
import {mapManager} from "./managers/mapManager.js";
import {gameManager} from "./managers/gameManager.js";

const canvas = document.querySelector("#gameField");
const ctx = canvas.getContext("2d");
mapManager.loadData('../lvl1.json');
spriteManager.loadAtlas('sprites_atlas.json', '/img/spritesheet.png');
mapManager.parseEntities();
mapManager.drawMap(ctx);
gameManager.draw(ctx);
console.log(gameManager, mapManager, spriteManager);