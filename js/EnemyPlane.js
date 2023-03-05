import GameObject from "./GameObject.js";

export default class Enemy extends GameObject{
    constructor(x, y, id, type, dead, getBody, getObject){
        super(x, y, type, dead, getBody, getObject);

        this.id = id;
        this.body = this.getBody();
        this.type = 'enemy';
        this.id = id;

        this.width = 4;
        this.height = 4;
    }

    randomHeight(){
        return Math.floor(Math.random() * 100) * -1;
    }

    randomLeftRight(){
        return Math.floor(Math.random() * 96);
    }

    updatePos(){
        let plane = document.querySelector(`#${this.type}-${this.id}`);

        if (this.y < 100){
            this.y += 0.2;
            plane.style.top = this.y + 'vh';
        }

        else{
            this.dead = true;
            plane.remove();
        }
    }
}