export default class PlaneGame{
    constructor(body, plane, life_left){
        this._body = body;
        this._jetPlane = plane;
        this._lifeLeft = life_left;

        this._planeLife = 98;
        this._win = 0;
        this._jetPlaneBullet = [];
        this._jetPlaneX = 0;

        this._enemyPlaneNumber = 1;
        this._enemyPlaneBulletX = [];
        this._enemyPlaneBullet = [];
    }

    move(keyCode){
        if (keyCode == 65){
            this._jetPlaneX > 0 ? this._jetPlaneX -= 1 : this._jetPlaneX;
            this._jetPlane.style.setProperty('--x', this._jetPlaneX);
        }

        else if (keyCode == 68){
            this._jetPlaneX < 23 ? this._jetPlaneX += 1 : this._jetPlaneX;
            this._jetPlane.style.setProperty('--x', this._jetPlaneX);
        }

        else if (keyCode == 32){
            this.summonBullets();
        }
    }

    summonBullets(){
        let bullet = document.createElement('div');
        bullet.setAttribute('class', 'jet-plane-bullet');
        bullet.style.setProperty('--x', this._jetPlaneX);

        this._jetPlaneBullet.push(bullet);
        this._body.appendChild(bullet);
    }
    


    randomLeft(left){
        return Math.floor(Math.random() * 23);
    }

    summonEnemyPlane(){
        for (let i = 0; i < this._enemyPlaneNumber; i++){
            let left = this.randomLeft();
            let enemyPlane = document.createElement('div');

            enemyPlane.setAttribute('class', 'enemy-plane');
            enemyPlane.style.setProperty('--x', left);

            this._enemyPlaneBulletX.push(left);

            this.summonEnemyBullets(left);
            this._body.appendChild(enemyPlane);
        }
    }

    summonEnemyBullets(left){
        let bullet = document.createElement('div');
        bullet.setAttribute('class', 'enemy-plane-bullet');
        bullet.style.setProperty('--x', left);

        this._enemyPlaneBullet.push(bullet);
        this._body.appendChild(bullet);
    }

    

    deleteBullet(data){
        this._jetPlaneBullet = this._jetPlaneBullet.filter(bullet => bullet !== data);
    }

    deleteEnemyBullet(data){
        let getX = parseInt(data.style.getPropertyValue('--x'));
        this._enemyPlaneBullet = this._enemyPlaneBullet.filter(bullet => bullet !== data);
    }

    bulletPosition(bulletPosition){
        let enemyPlane = document.getElementsByClassName('enemy-plane');
        let enemyBullet = document.getElementsByClassName('enemy-plane-bullet');

        if (enemyPlane.length === 0){
            this.summonEnemyPlane();
            this._win++;

            if (this._win < 9){
                if (this._win % 3 === 0){
                    this._enemyPlaneNumber++;
                }
            }

            else{
                alert('you win !');
            }
        }

        this.checkBullet(enemyBullet);

        for (let a of this._jetPlaneBullet){
            for (let o of enemyBullet){
                if (this.isObstacle(a, o)){
                    this.deleteBullet(a);                    
                    this.deleteEnemyBullet(o);

                    a.remove();
                    o.remove();
                }
            }

            for (let i of enemyPlane){
                if (this.isObstacle(a, i)){
                    let x = parseInt(i.style.getPropertyValue('--x'));
                    bulletPosition = bulletPosition.filter(pos => pos !== x);
                    this._enemyPlaneBulletX = this._enemyPlaneBulletX.filter(plane => plane !== x)

                    this.deleteBullet(a);
                    a.remove();
                    i.remove();
                }
            }

            if (a.offsetTop <= 0){
                this.deleteBullet(a);
                a.remove();
            }
        }
    }

    checkBullet(enemy){
        for (let i of enemy){
            if (this.isObstacle(i, this._jetPlane)){
                i.remove();
                this.deleteEnemyBullet(i);

                this._planeLife -= 20;
                this._lifeLeft.style.setProperty('--life', this._planeLife);

                if (this._planeLife <= 0){
                    this._jetPlane.remove();
                }
            }

            if (i.offsetTop >= 630){
                i.remove();
                this.deleteEnemyBullet(i);
            }
        }
    }


    
    isObstacle(a, b){
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