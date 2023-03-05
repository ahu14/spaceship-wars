import GameObject from './GameObject.js';
import Bullet from "./Bullet.js";

export default class Plane extends GameObject{
    constructor(x, y, id, type, dead, getObject){
        super(x, y, type, dead, getObject);

        this.type = 'plane';
        this.id = 0;

        this.width = 10;
        this.height = 10;

        this.bulletId = 0;
        this.shooted = false;
    }

    countTime(){
        setTimeout(() => this.shooted = false, 250);
    }

    move(code, gameObj){
        let plane = this.getObject();
        code == 65 && this.x > 0 ? this.x -= 5 : this.x;
        code == 68 && this.x < 95 ? this.x += 5 : this.x;

        if (code == 32 && this.shooted == false){
            let margin = window.innerHeight > window.innerWidth ? 4.25 : 2.7;
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