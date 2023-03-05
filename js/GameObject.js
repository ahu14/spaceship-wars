export default class GameObject{
    constructor(x, y, type, dead, id){
        this.x = x;
        this.y = y;
        this.type = type;
        this.dead = false;
        this.id = id;

        this.width = 0;
        this.height = 0;
    }

    getBody(){
        return document.querySelector('body');
    }

    getObject(type, id){
        let data = document.getElementById(`${this.type}-${this.id}`);
        return data;
    }

    summonObject(id){
        let obj;

        if (this.type == 'enemy'){
            obj = document.createElement('img');
            obj.src = "./Assets/enemyShip.png";
            obj.className = 'enemy';
        }

        else{
            obj = document.createElement('div');
            obj.className = `${this.type}`;
        }

        obj.id = `${this.type}-${this.id}`;

        obj.style.left = this.x + 'vw';
        obj.style.top = this.y + 'vh';

        obj.style.setProperty('--width', this.width);
        obj.style.setProperty('--height', this.width);
        
        this.getBody().append(obj);
    }

    removeObject(data, type, id){
        let obj = this.getObject(this.type, this.id);
        obj.remove();
    }
}