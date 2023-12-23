let scoreTable = JSON.parse(localStorage.getItem("scoreTable"));
const user = localStorage.getItem('currentUser');
const score = Number(localStorage.getItem('score'));
addScore(scoreTable, user, score);
updateScoreTable(scoreTable);


function addScore(scoreTable, user, score){
    if(!scoreTable[user] || score > scoreTable[user]){
        scoreTable[user] = score;
        localStorage.setItem('scoreTable', JSON.stringify(scoreTable));
    }
}


function updateScoreTable(scoreTable){
    let tmp = Object.entries(scoreTable);
    tmp.sort((x, y) => y[1] - x[1]);
    for(let i = 0; i < 5; i++){
        if(tmp[i]) {
            document.getElementById((i + 1) + '_name').textContent = tmp[i][0];
            document.getElementById((i + 1) + '_score').textContent = tmp[i][1];
        }
    }
}