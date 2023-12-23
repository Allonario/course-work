import {spriteManager} from "./managers/spriteManager.js";
import {mapManager} from "./managers/mapManager.js";
import {gameManager} from "./managers/gameManager.js";


play();


function play(){
    const canvas = document.querySelector("#gameField");
    const ctx = canvas.getContext("2d");
    if(document.getElementById('level').textContent === 'LEVEL 1') {
        localStorage.score = 0;
        gameManager.level = 1;
        document.getElementById('Score').textContent = localStorage.score;
        mapManager.loadData('../lvl1.json');
    } else {
        gameManager.level = 2;
        mapManager.loadData('../lvl2.json');
    }
    spriteManager.loadAtlas('sprites_atlas.json', '/img/spritesheet.png');
    mapManager.parseEntities();
    gameManager.loadAll(canvas);
    gameManager.play(ctx);
}