import GameObject from './GameObject.js';
import Bullet from "./Bullet.js";

export default class Plane extends GameObject{
    constructor(x, y, id, type, dead, getObject){
        super(x, y, type, dead, getObject);

        this.type = 'plane';
        this.id = 0;

        this.width = window.innerHeight > window.innerWidth ? 15 : 6;

        this.bulletId = 0;
        this.shooted = false;
    }

    countTime(){
        setTimeout(() => this.shooted = false, 250);
    }

    move(code, gameObj){
        let plane = this.getObject();
        let margin = window.innerHeight > window.innerWidth ? 85 : 95;

        code == 65 && this.x > 0 ? this.x -= 5 : this.x;
        code == 68 && this.x < margin ? this.x += 5 : this.x;

        if (code == 32 && this.shooted == false){
            let margin = window.innerHeight > window.innerWidth ? 6.8 : 2.65;
            let bullet = new Bullet(this.x + margin, this.y, this.bulletId);
            bullet.summonObject();
            gameObj.push(bullet);

            this.shooted = true;
            this.bulletId += 1;
            this.countTime();
        }

        plane.style.left = this.x + 'vw';
    }
}