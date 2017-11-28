
export default class Map{
    constructor(){
        this.start_point = {};
        this.enemy_spawn = {};
        this.walls = [];
        this.eagle = {};
        
    }

    load_map(map){
        var values = JSON.parse(map);
        this.start_point = values.start_point;
        this.enemy_spawn = values.enemy_spawn;
        this.walls = values.walls;
        this.eagle = values.eagle;
    }

    get_enemy_spawn_point(){
        return this.enemy_spawn;
    }

    get_eagle_point(){
        return this.eagle;
    }

    get_start_point(){
        return this.start_point;
    }

    get_walls_array(){
        return this.walls;
    }
}