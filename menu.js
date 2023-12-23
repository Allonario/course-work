
document.getElementById("confirmButton").addEventListener('click', () => {
    localStorage.currentUser = document.getElementById('userNameInput').value;
    if(!localStorage.getItem('scoreTable')){
        let scoreTable = {};
        localStorage.setItem('scoreTable', JSON.stringify(scoreTable));
    }
    window.location.href = 'level_1.html';
});