import EnemyPlane from "./EnemyPlane.js";

export default class Plane{
    constructor(body, plane, score){
        this.body = body;
        this.plane = plane;

        this.planeX = 0;
        this.bulletX = 0;
        this.bullet = [];

        this.scoreNum = 0;
        this.score = score;
    }

    move(code){
        code == 65 && this.planeX > 0 ? this.planeX-- : this.planeX;
        code == 68 && this.planeX < 23 ? this.planeX++ : this.planeX;
        code == 32 ? this.addBullet() : this.planeX;
        this.plane.style.setProperty('--x', this.planeX);
    }

    addBullet(){
        this.bulletX = this.planeX + 0.7;

        let bullet = document.createElement('div');
        bullet.className = "jet-plane-bullet";
        bullet.style.setProperty('--x', this.bulletX);
        bullet.style.setProperty('--y', 1);

        this.bullet.push(bullet);
        document.body.appendChild(bullet);
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


    bulletMove(){
        let bullet = document.getElementsByClassName('jet-plane-bullet');
        console.log(this.score);
        this.score.innerHTML = this.scoreNum;
        
        let shootBullet = () => {
            let enemyPlane = document.querySelectorAll('.enemy-jet');
            let enemyBullet = document.querySelectorAll('.enemy-bullet');

            for (let i of bullet){
                this.alreadyLeftScreen(i);

                for (let a of enemyPlane){                    
                    if (this.crashSomething(i, a)){
                        this.scoreNum++;
                        this.score.innerHTML = this.scoreNum;

                        i.remove();
                        a.remove();
                    }
                }

                for (let o of enemyBullet){
                    if (this.crashSomething(i, o)){
                        i.remove();
                        o.remove();
                    }
                }
            }
        
            requestAnimationFrame(shootBullet);
        }
        
        requestAnimationFrame(shootBullet);
    }
}