import GameObject from "./GameObject.js";

export default class Bullet extends GameObject{
    constructor(x, y, id, type, dead, getBody, getObject, removeObject){
        super(x, y, type, dead, getBody, getObject, removeObject);

        this.body = this.getBody();
        this.type = 'bullet';
        this.id = id;

        this.width = 2;
        this.height = 2; 

        this.shoot = () => {
            let bullet = this.getObject(this.type, this.id);

            if (bullet != null){
                if (this.y > 0){
                    this.y -= 0.5;
                    bullet.style.top = this.y + 'vh';
                }

                else{
                    this.dead = true;
                    bullet.remove();
                }
            }
        }
    }
}