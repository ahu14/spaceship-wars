import Plane from "./PlaneGame.js";

export default class EnemyPlane{
    constructor(body){
        this.body = body;
        this.randomNum = this.randomNumber();

        this.index = 0;
        this.bulletX = [];
        this.randomIndex = [];
        this.bulletPosition = [];
        this.position = this.randomizePosition();
    }

    addPosition(){
        this.position = [];

        for (let i = 0; i < 23; i+=3){
            this.position.push(i);
        }

        for (let a = 0; a < this.position.length; a++){
            this.randomIndex.push(a);
        }
    }

    randomizeIndex(){
        let pos = this.position.length - 1;

        while (pos != 0){
            let random = Math.floor(Math.random() * pos);
            pos--;

            [this.randomIndex[pos], this.randomIndex[random]] = [
                this.randomIndex[random], this.randomIndex[pos]
            ];
        }

        return this.randomIndex;
    }

    randomizePosition(){
        this.addPosition();
        this.randomizeIndex();

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



    randomNumber(){
        let random = Math.floor(Math.random() * 3);
        return random <= 0 ? random += 1 : random;
    }

    summonEnemyPlane(){
        for (let i = 0; i < this.randomNumber(); i++){
            let enemy = document.createElement('div');
            enemy.className = "enemy-jet";

            let index = this.randomIndex[this.index];
            enemy.style.setProperty('--x', this.position[index]);

            this.bulletPosition.push(this.position[index]);
            this.bulletX.push(this.position[index] + 0.7);

            this.index > this.position.length - 1 ? this.index = 0 : this.index++;
            document.body.appendChild(enemy);
        }
    }

    addEnemyBullet(){
        for (let a = 0; a < this.bulletPosition.length; a++){
            let bullet = document.createElement('div');
            bullet.className = "enemy-bullet";

            bullet.style.setProperty('--x', this.bulletX[a]);
            bullet.style.setProperty('--y', 0);

            document.body.appendChild(bullet);
        }
    }


    checkPlane(){
        let enemyPlane = document.querySelectorAll('.enemy-jet');
        let array = [];
        let bulletArray = [];

        if (enemyPlane.length != this.bulletPosition.length){
            enemyPlane.forEach((element, index) => {
                let x = parseInt(element.style.getPropertyValue('--x'));
                array.push(x);
                bulletArray.push(x + 0.7);
            })

            this.bulletPosition = array;
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
            let enemyPlane = document.querySelectorAll('.enemy-jet');
            let enemyBullet = document.querySelectorAll('.enemy-bullet');
            this.checkPlane();

            if (enemyPlane.length == 0){
                this.summonEnemyPlane();
            }


            if (animationId % 140 == 0){
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

        shootEnemyBullet();
    }
}