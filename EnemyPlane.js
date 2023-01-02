import Plane from "./PlaneGame.js";

export default class EnemyPlane{
    constructor(body){
        this.body = body;
        this.speed = 0.7;

        this.index = 0;
        this.bulletX = [];
        this.position = this.randomizePosition();
    }

    addPosition(){
        this.position = [];

        for (let i = 0; i < 23; i+=3){
            this.position.push(i);
        }
    }

    randomizePosition(){
        this.addPosition();

        let length = this.position.length - 1;
        
        while (length != 0){
            let random = Math.floor(Math.random() * length);
            length--;

            [this.position[length], this.position[random]] = [
                this.position[random], this.position[length]
            ]
        }

        return this.position;
    }


    summonEnemyPlane(){
        for (let i = 0; i < 2; i++){
            let enemy = document.createElement('div');
            enemy.className = "enemy-jet";
            enemy.style.setProperty('--x', this.position[this.index]);

            this.bulletX.push(this.position[this.index]);
            this.index >= this.position.length - 1 ? this.index = 0 : this.index++;

            document.body.appendChild(enemy);
        }
    }

    addEnemyBullet(){
        for (let a = 0; a < this.bulletX.length; a++){
            let bullet = document.createElement('div');
            bullet.className = "enemy-bullet";

            bullet.style.setProperty('--x', this.bulletX[a] + 0.7);
            bullet.style.setProperty('--y', this.speed);

            document.body.appendChild(bullet);
        }
    }


    checkPlane(){
        let enemyPlane = document.querySelectorAll('.enemy-jet');
        let bulletArray = [];

        if (enemyPlane.length != this.bulletX.length){
            enemyPlane.forEach((element, index) => {
                let x = parseInt(element.style.getPropertyValue('--x'));
                bulletArray.push(x);
            })

            this.bulletX = bulletArray;
        }
    }

    alreadyLeftScreen(bullet){
        let y = parseFloat(bullet.style.getPropertyValue('--y'));

        if (y < 26){
            y += 0.1;
            bullet.style.setProperty('--y', y);
        }

        else{
            bullet.remove();
        }
    }

    crashSomething(a, b){
        let itemA = a.getBoundingClientRect();
        let itemB = b.getBoundingClientRect();

        return !(
            ((itemA.y + itemA.height) < itemB.y) ||
            (itemA.y > (itemB.y + itemB.height)) ||
            ((itemA.x + itemA.width) < itemB.x) ||
            (itemA.x > (itemB.x + itemB.width))
        )
    }


    enemyBulletMove(){
        this.addEnemyBullet();

        let animationId;
        let plane = document.querySelector('.jet-plane');

        let shootEnemyBullet = () => {
            this.checkPlane();

            let enemyPlane = document.querySelectorAll('.enemy-jet');
            let enemyBullet = document.querySelectorAll('.enemy-bullet');

            if (enemyPlane.length == 0){
                this.summonEnemyPlane();
                this.speed += 0.00005;
            }


            if (animationId % 180 == 0){
                this.addEnemyBullet();
            }


            enemyBullet.forEach((element, index) => {
                this.alreadyLeftScreen(element);

                if (this.crashSomething(element, plane)){
                    element.remove();
                    plane.remove();
                    window.location.reload();
                }
            })

            animationId = requestAnimationFrame(shootEnemyBullet);
        }

        requestAnimationFrame(shootEnemyBullet);
    }
}