import Plane from "./PlaneGame.js";
import Enemy from "./EnemyPlane.js";
import EnemyBullet from "./EnemyBullet.js";

function isCollision(objA, objB){
    let a = objA.getBoundingClientRect();
    let b = objB.getBoundingClientRect();

    return !(
        ((a.y + a.height) < b.y) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    )
}

function randomPlane(){
    return Math.floor(Math.random() * 6);
}


document.addEventListener('click', (event) => {
    let clicked = event.target.className;

    if (clicked.includes('btn')){
        clicked.includes('left') ? plane.move(65) : plane.move(68);
    }
})

let gameObj = [];
let plane = new Plane(0, 95, 0);
plane.summonObject();
gameObj.push(plane);


document.addEventListener('keyup', (event) => {
    let code = event.keyCode;
    plane.move(code, gameObj);
})



let enemyBulletId = 0;
let enemyId = 0;

let startTime;
let times = 0;

let score = document.querySelector('#score');
let scoreNum = 0;
score.innerHTML = scoreNum;

let notifMsg = document.querySelector('#notif-message');

if (window.innerWidth > 768){
    notifMsg.innerHTML = 'Click A to move left and D to move right';
}


function play(time){
    let enemyData = gameObj.filter(data => data.type == 'enemy' && data.dead == false);
    let enemyBullet = gameObj.filter(data => data.type == 'enemy-bullet' && data.dead == false);
    let plane = gameObj.filter(data => data.type == 'plane');

    if (startTime == undefined){
        startTime = time;
        times += 1;
        
        if (times % 2 == 0){            
            for (let i = 0; i < 5; i++){
                let enemy = new Enemy(0, 0, enemyId);
                enemy.x = enemy.randomLeftRight();
                enemy.y = enemy.randomHeight();
            
                enemy.summonObject();
                gameObj.push(enemy);

                enemyId += 1;
            }

            scoreNum += 1;
            score.innerHTML = scoreNum;
        }
    }

    if (time - startTime > 1000){
        startTime = undefined;
        notifMsg.innerHTML = '';

        for (let i of enemyData){
            let enemyBullet = new EnemyBullet(i.x + 0.5, i.y, enemyBulletId);
            enemyBullet.summonObject();
            gameObj.push(enemyBullet);
            enemyBulletId += 1;
        }
    }

    let planee = plane[0].getObject();

    for (let a of enemyBullet){
        let bullet = a.getObject();

        if (isCollision(planee, bullet)){
            plane[0].dead = true;
            bullet.dead = true;

            planee.remove();
            bullet.remove();
            notifMsg.innerHTML = 'You Lose';

            setTimeout(() => window.location.reload(), 1000);
        }

        else{
            a.shoot();
        }
    }

    for (let a of enemyData){
        let enemy = a.getObject();

        if (isCollision(planee, enemy)){
            plane[0].dead = true;
            enemy.dead = true;

            planee.remove();
            enemy.remove();
            notifMsg.innerHTML = 'You Lose';
            
            setTimeout(() => window.location.reload(), 1000);
        }

        a.updatePos();
    }


    requestAnimationFrame(play);
}

requestAnimationFrame(play);