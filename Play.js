import PlaneGame from "./PlaneGame.js";

let shootTime = 0;

let body = document.body;
let plane = document.querySelector('.jet-plane');
let life_left = document.querySelector('.life-left');

let game = new PlaneGame(body, plane, life_left);
game._lifeLeft.style.setProperty('--life', game._planeLife);

document.addEventListener('keyup', (event) => {
    let code = event.keyCode;
    game.move(code);
})


setInterval(() => {
    if (shootTime > 20){
        shootTime = 0;
        game.bulletPosition(game._enemyPlaneBulletX);

        for (let i = 0; i < game._enemyPlaneBulletX.length; i++){
            game.summonEnemyBullets(game._enemyPlaneBulletX[i]);
        }
    }

    else{
        shootTime++;
        game.bulletPosition(game._enemyPlaneBulletX);
    }
}, 100)