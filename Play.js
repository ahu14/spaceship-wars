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
    return Math.floor(Math.random() * 3);
}


document.addEventListener('click', (event) => {
    let clicked = event.target.className;

    if (clicked.includes('btn')){
        clicked.includes('left') ? plane.move(65) : plane.move(68);
    }

    else{
        plane.move(32, gameObj);
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
    notifMsg.innerHTML = 'Click A to move left, D to move right and space for shoot';
}

else{
    notifMsg.innerHTML = 'Click < to move left, > to move right and tap the screen to shoot';
}


function play(time){
    let allEnemy = gameObj.filter(data => data.type.includes('enemy') && data.dead == false);
    let enemyData = gameObj.filter(data => data.type == 'enemy' && data.dead == false);
    let enemyBullet = gameObj.filter(data => data.type == 'enemy-bullet' && data.dead == false);
    let plane = gameObj.filter(data => data.type == 'plane');
    let bullet = gameObj.filter(data => data.type == 'bullet' && data.dead == false);

    if (startTime == undefined){
        startTime = time;
        times += 1;
        
        if (times % 4 == 0){
            for (let i = 0; i < 5; i++){
                let enemy = new Enemy(0, 0, enemyId);
                enemy.x = enemy.randomLeftRight();
                enemy.y = enemy.randomHeight();
            
                enemy.summonObject();
                gameObj.push(enemy);

                enemyId += 1;
            }
        }
    }

    if (time - startTime > 1300){
        startTime = undefined;
        notifMsg.innerHTML = '';

        for (let i of enemyData){
            let enemyBullet = new EnemyBullet(i.x + 0.5, i.y, enemyBulletId);
            enemyBullet.summonObject();
            gameObj.push(enemyBullet);
            enemyBulletId += 1;
        }
    }

    for (let i of bullet){
        let bullet = i.getObject();

        for (let a of allEnemy){
            let enemy = a.getObject();

            if (isCollision(bullet, enemy)){
                if (a.type == 'enemy'){
                    scoreNum += 1;
                    score.innerHTML = scoreNum;
                }

                i.dead = true;
                a.dead = true;

                bullet.remove();
                enemy.remove();
                allEnemy = gameObj.filter(data => data.type.includes('enemy') && data.dead == false);
                enemyData = gameObj.filter(data => data.type == 'enemy' && data.dead == false);
                enemyBullet = gameObj.filter(data => data.type == 'enemy-bullet' && data.dead == false);
            }
        }

        i.shoot();
    }


    let planee = plane[0].getObject();

    for (let j of enemyBullet){
        let enemyBlt = j.getObject();

        if (isCollision(planee, enemyBlt)){
            plane[0].dead = true;
            j.dead = true;

            planee.remove();
            enemyBlt.remove();
            notifMsg.innerHTML = 'You Lose';

            setTimeout(() => window.location.reload(), 1000);
        }

        else{
            j.shoot();
        }
    }

    for (let d of enemyData){
        let enemyPlane = d.getObject();

        if (isCollision(planee, enemyPlane)){
            plane[0].dead = true;
            enemyPlane.dead = true;

            planee.remove();
            enemyPlane.remove();
            notifMsg.innerHTML = 'You Lose';
            
            setTimeout(() => window.location.reload(), 1000);
        }

        d.updatePos();
    }


    requestAnimationFrame(play);
}

requestAnimationFrame(play);