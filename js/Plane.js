import GameObject from './GameObject.js';
import { settings } from "./GameData.js";
import { Bullet } from "./Bullet.js";


export class JetPlane extends GameObject{
    constructor(x, y, id, type, dead, getObject){
        super(x, y, type, dead, getObject);

        this.type = 'plane';
        this.id = 0;

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
            let bullet = new Bullet(this.x + settings.bulletMargin, 90, this.bulletId);
            bullet.summonObject();
            gameObj.push(bullet);

            let sound = new Audio("../Assets/pew-pew.mp3");
            sound.play();
            
            this.shooted = true;
            this.bulletId += 1;
            this.countTime();
        }

        plane.style.left = this.x + 'vw';
    }
}



export class EnemyJet extends GameObject{
    constructor(x, y, id, type, dead, getBody, getObject){
        super(x, y, type, dead, getBody, getObject);

        this.id = id;
        this.body = this.getBody();
        this.type = 'enemy';
        this.id = id;

        this.shootTimeInterval = this.randomTiming();
    }

    randomTiming(){
        let time = Math.floor(Math.random() * 1500);
        return time > 500 ? time : time + 500;
    }

    randomHeight(){
        return Math.floor(Math.random() * 100) * -1;
    }

    randomLeftRight(){
        return Math.floor(Math.random() * 96);
    }


    updatePos(){
        let plane = document.querySelector(`#${this.type}-${this.id}`);
        
        if (plane != null){
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
}