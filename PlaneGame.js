import GameObject from './GameObject.js';

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
        plane.style.left = this.x + 'vw';
    }
}