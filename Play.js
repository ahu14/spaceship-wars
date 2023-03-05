import Plane from "./js/Plane.js";
import Enemy from "./js/EnemyPlane.js";
import EnemyBullet from "./js/EnemyBullet.js";
import { gameObj, filterAll, filterData, updateData } from "./js/FilterData.js";

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


document.addEventListener('click', (event) => {
    let clicked = event.target.className;

    if (clicked.includes('btn')){
        clicked.includes('left') ? plane.move(65) : plane.move(68);
    }

    else{
        plane.move(32, gameObj);
    }
})

let setY = window.innerHeight > window.innerWidth ? 79 : 89;
let plane = new Plane(0, setY, 0);
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
    notifMsg.innerHTML = 'Click < to move left, > to move right and click the screen to shoot';
}


function play(time){
    updateData();

    let allEnemy = filterAll('enemy');
    let enemyData = filterData('enemy');
    let plane = filterData('plane')[0];
    let bullet = filterData('plane-bullet');

    if (startTime == undefined){
        startTime = time;
        times += 1;
        
        if (times % 4 == 0){
            for (let i = 0; i < 3; i++){
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
        notifMsg.innerHTML = "";

        for (let i of enemyData){
            let margin = window.innerHeight > window.innerWidth ? 6.8 : 2.65;
            let enemyBullet = new EnemyBullet(i.x + margin, i.y, enemyBulletId);
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

                allEnemy = filterAll('enemy');
            }
        }

        i.shoot();
    }

    let planeObj = plane.getObject();

    for (let d of allEnemy){
        let enemy = d.getObject();
        d.type == "enemy-bullet" ? d.shoot() : d.updatePos();

        if (isCollision(planeObj, enemy)){
            plane.dead = true;
            enemy.dead = true;

            planeObj.remove();
            enemy.remove();
            notifMsg.innerHTML = 'You Lose';
            
            setTimeout(() => window.location.reload(), 1000);
        }
    }


    requestAnimationFrame(play);
}

requestAnimationFrame(play);
