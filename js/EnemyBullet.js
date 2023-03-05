import GameObject from "./GameObject.js";

export default class EnemyBullet extends GameObject{
    constructor(x, y, id, type, dead, getBody, getObject, removeObject){
        super(x, y, type, dead, getBody, getObject, removeObject);

        this.body = this.getBody();
        this.type = 'enemy-bullet';
        this.id = id;

        this.width = window.innerHeight > window.innerWidth ? 5 : 10;
        this.height = window.innerHeight > window.innerWidth ? 5 : 10;

        this.shoot = () => {
            let enemy = this.getObject(this.type, this.id);

            if (enemy != null){
                if (this.y < 100){
                    this.y += 0.5;
                    enemy.style.top = this.y + 'vh';
                }

                else{
                    this.dead = true;
                    enemy.remove();
                }
            }
        }
    }
}