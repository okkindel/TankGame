
export default class Map{
    constructor(){
            this.start_point = {};
            this.enemy_spawn = {};
            this.walls = [];
            this.eagle = {};
            this.is_loaded = false;
        
    }

    load_map(map){
        if(!this.is_loaded){
            var values = JSON.parse(map);
            this.start_point = values.start_point;
            this.enemy_spawn = values.enemy_spawn;
            this.walls = values.walls;
            this.eagle = values.eagle;
            is_loaded = true;
        }
    }

    get_enemy_spawn_point(){
        if(this.is_loaded){
            return this.enemy_spawn;
        }
    }

    get_eagle_point(){
        if(this.is_loaded){
            return this.eagle;
        }
    } 

    get_start_point(){
        if(this.is_loaded){
            return this.start_point;
        }
    }

    get_walls_array(){
        if(this.is_loaded){
            return this.walls;
        }
    }
}