import Plane from "./Plane.js";

export default class EnemyPlane{
    constructor(body){
        this._body = body;
        this._left = [];
        this._plane = [];
    }

    randomLeft(){
        return Math.floor(Math.random() * 18);
    }

    summonEnemyPlane(){
        for (let i = 0; i < 3; i++){
            let left = this.randomLeft();
            let enemyPlane = document.createElement('div');

            enemyPlane.setAttribute('class', 'enemy-plane');
            enemyPlane.style.setProperty('--x', left);

            this._left.push(left);
            this.summonBullet(left);

            this._plane.push(enemyPlane);
            this._body.appendChild(enemyPlane);
        }
    }

    summonBullet(left){
        let bullet = document.createElement('div');
        bullet.setAttribute('class', 'enemy-plane-bullet');
        bullet.style.setProperty('--x', left);

        this._body.appendChild(bullet);
    }

    checkBullet(){
        let enemyBullet = document.getElementsByClassName('enemy-plane-bullet');
        let planeJet = document.querySelector('.jet-plane');

        if (this._plane.length == 0){
            this.summonEnemyPlane();
        }

        else{
            if (planeJet !== null){
                for (let i of enemyBullet){
                    if (this.shooted(i, planeJet)){
                        this._body.removeChild(i);
                        this._body.removeChild(planeJet);
                    }
        
                    if (i.offsetTop >= 630){
                        this._body.removeChild(i);
                    }
                }
            }
    
            else{
                window.location.reload();
            }
        }
    }

    shooted(a, b){
        let itemA = a.getBoundingClientRect();
        let itemB = b.getBoundingClientRect();

        return !(
            itemA.bottom < itemB.top ||
            itemA.top > itemB.bottom ||
            itemA.right < itemB.left ||
            itemA.left > itemB.right
        )
    }
}