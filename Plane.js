export default class Plane{
    constructor(body, plane){
        this._body = body;
        this._plane = plane;

        this._bullet = [];
        this._planeX = 0;
    }

    move(keyCode){
        if (keyCode == 65){
            this._planeX > 0 ? this._planeX -= 1 : this._planeX;
            this._plane.style.setProperty('--x', this._planeX);
        }

        else if (keyCode == 68){
            this._planeX < 18 ? this._planeX += 1 : this._planeX;
            this._plane.style.setProperty('--x', this._planeX);
        }

        else if (keyCode == 32){
            this.summonBullets();
        }
    }

    summonBullets(){
        let bullet = document.createElement('div');
        bullet.setAttribute('class', 'jet-plane-bullet');
        bullet.style.setProperty('--x', this._planeX);

        this._bullet.push(bullet);
        this._body.appendChild(bullet);
    }

    bulletPosition(bulletPosition, enemy){
        let enemyPlane = document.getElementsByClassName('enemy-plane');
        let enemyBullet = document.getElementsByClassName('enemy-plane-bullet');

        for (let a of this._bullet){
            for (let o of enemyBullet){
                if (this.getShoot(a, o)){
                    this._bullet.shift();
                    this._body.removeChild(a);
                    this._body.removeChild(o);
                }
            }

            for (let i of enemyPlane){
                if (this.getShoot(a, i)){
                    this._bullet.shift();

                    let x = parseInt(i.style.getPropertyValue('--x'));
                    bulletPosition = bulletPosition.filter(pos => pos !== x);
                    enemy = enemy.filter(plane => plane !== i)

                    this._body.removeChild(a);
                    this._body.removeChild(i);
                }
            }

            if (a.offsetTop < -30){
                this._bullet.shift();
                this._body.removeChild(a);
            }
        }
        
        return {
            'position' : bulletPosition,
            'enemy' : enemy
        }
    }

    getShoot(a, b){
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