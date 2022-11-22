import Plane from "./Plane.js";
import EnemyPlane from "./EnemyPlane.js";

let shootTime = 0;

let body = document.body;
let enemy_plane = new EnemyPlane(body);

let jetPlane = document.querySelector('.jet-plane');
let plane = new Plane(body, jetPlane);


setInterval(() => {
    if (shootTime > 20){
        shootTime = 0;

        for (let i = 0; i < enemy_plane._left.length; i++){
            enemy_plane.summonBullet(enemy_plane._left[i]);
        }
    }

    shootTime++;
    enemy_plane.checkBullet();

    let data = plane.bulletPosition(
        enemy_plane._left, enemy_plane._plane
    );

    enemy_plane._left = data.position;
    enemy_plane._plane = data.enemy;
}, 100)

document.addEventListener('keyup', (event) => {
    let code = event.keyCode;
    plane.move(code);
})