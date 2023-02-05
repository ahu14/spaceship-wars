import GameObject from './GameObject.js';
import Bullet from "./Bullet.js";

export default class Plane extends GameObject{
    constructor(x, y, id, type, dead, getObject){
        super(x, y, type, dead, getObject);

        this.type = 'plane';
        this.id = 0;

        this.width = 4;
        this.height = 4;

        this.bulletId = 0;
    }

    move(code, gameObj){
        let plane = this.getObject();
        code == 65 && this.x > 0 ? this.x -= 4 : this.x;
        code == 68 && this.x < 96 ? this.x += 4 : this.x;
        if (code == 32){
            let bullet = new Bullet(this.x + 0.5, this.y, this.bulletId);
            bullet.summonObject();
            gameObj.push(bullet);
            this.bulletId += 1;
        }

        plane.style.left = this.x + 'vw';
    }
}