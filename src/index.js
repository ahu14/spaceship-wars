import _ from "lodash";
import "../style.css";
import "../Assets/enemyShip.png";
import "../Assets/pew-pew.mp3";
import "../Assets/player.png";


import { JetPlane, EnemyJet } from "./Plane.js";
import { Bullet, EnemyBullet } from "./Bullet.js";
import { enemy, player, message, settings, clickEvent, keyUp } from "./GameData.js";
import { gameObj, filterAll, filterData, updateData } from "./filterData.js";

function isCollision(objA, objB){
    if (objA != null && objB != null){
        let a = objA.getBoundingClientRect();
        let b = objB.getBoundingClientRect();

        return !(
            ((a.y + a.height) < b.y) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        )
    }
}

function checkX(objA, objB){
    let a = objA.getBoundingClientRect();
    let b = objB.getBoundingClientRect();

    return !(
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    )
}



let plane = new JetPlane(0, 0);
plane.summonObject();
gameObj.push(plane);
document.addEventListener('click', (event) => clickEvent(plane, gameObj, event));
document.addEventListener('keyup', (event) => keyUp(plane, gameObj, event));



let score = document.querySelector('#score');
score.innerHTML = player.score;

let notifMsg = document.querySelector('#notif-message');
let msg = window.innerWidth > 768 ? message.laptop : message.mobile;
notifMsg.innerHTML = msg;



let startTime;
function play(time){
    updateData();

    let allEnemy = filterAll('enemy');
    let enemyData = filterData('enemy');
    let plane = filterData('plane')[0];
    let bullet = filterData('plane-bullet');

    if (startTime == undefined){
        startTime = time;
        
        let newEnemy = new EnemyJet(0, 0, enemy.id);
        newEnemy.x = newEnemy.randomLeftRight();
        newEnemy.y = newEnemy.randomHeight();
        
        newEnemy.summonObject();
        gameObj.push(newEnemy);
        enemy.id += 1;
    }

    if (time - startTime > 1500){
        startTime = undefined;
        notifMsg.innerHTML = message.blank;
    }
    


    let planeObj = plane.getObject();
    
    for (let k of enemyData){
        let enemyObj = k.getObject();

        if (Math.floor(time - startTime) % k.shootTimeInterval == 0 && checkX(planeObj, enemyObj)){
            let enemyBullet = new EnemyBullet(k.x + settings.enemyMargin, k.y, enemy.bulletId);
            enemyBullet.summonObject();
            gameObj.push(enemyBullet);
            enemy.bulletId += 1;
        }
    }


    for (let i of bullet){
        let blt = i.getObject();

        for (let a of allEnemy){
            let enemy = a.getObject();

            if (isCollision(blt, enemy)){
                if (a.type == 'enemy'){
                    player.score += 1;
                    score.innerHTML = player.score;
                }

                i.dead = true;
                a.dead = true;

                blt.remove();
                enemy.remove();

                allEnemy = filterAll('enemy');
            }
        }

        i.shoot();
    }


    for (let d of allEnemy){
        let enemy = d.getObject();
        d.type == "enemy-bullet" ? d.shoot() : d.updatePos();

        if (isCollision(planeObj, enemy)){
            for (let a of gameObj){
                if (a.type == 'plane'){
                    planeObj.style.display = "none";
                }
                
                else{
                    a.dead = true;
                    let obj = a.getObject();
                    obj.remove();
                }
            }


            notifMsg.innerHTML = message.lose;

            setTimeout(() => {
                player.score = 0
                score.innerHTML = player.score;

                planeObj.style.display = "block";
            }, 1500);
        }
    }

    requestAnimationFrame(play);
}

requestAnimationFrame(play);