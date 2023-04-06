export default class GameObject{
    constructor(x, y, type, dead, id){
        this.x = x;
        this.y = y;
        this.type = type;
        this.dead = false;
        this.id = id;
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

        else if (this.type == 'plane'){
            obj = document.createElement('img');
            obj.src = "./Assets/player.png";
            obj.className = 'plane';
        }

        else{
            obj = document.createElement('div');
            obj.className = `${this.type}`;
        }

        obj.id = `${this.type}-${this.id}`;
        obj.style.setProperty('--x', this.x);
        obj.style.setProperty('--y', this.y);
        
        this.getBody().append(obj);
    }

    removeObject(data, type, id){
        let obj = this.getObject(this.type, this.id);
        obj.remove();
    }
}