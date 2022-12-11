import Plane from "./PlaneGame.js";
import EnemyPlane from "./EnemyPlane.js";

let body = document.body;
let jet_plane = document.querySelector('.jet-plane');
let score = document.querySelector('#score');

let plane = new Plane(body, jet_plane, score);
let enemyPlane = new EnemyPlane(body);


document.addEventListener('click', (event) => {
    let clicked = event.target.className;

    if (clicked.includes('btn')){
        clicked.includes('left') ? plane.move(65) : plane.move(68);
    }

    else{
        plane.move(32);
    }
})


document.addEventListener('keyup', (event) => {
    let code = event.keyCode;
    plane.move(code);
})

plane.bulletMove();
enemyPlane.enemyBulletMove();