export default class Map {
    constructor() {
        this.start_point = {};
        this.enemy_spawn = {};
        this.spawn_counter = 0;
        this.enemy_counter = 0;
        this.brick = [];
        this.walls = [];
        this.eagle = {};
        this.is_loaded = false;
    }

    load_map(map) {
        if (!this.is_loaded) {
            this.start_point = map.start_point;
            this.spawn_counter = map.spawn_counter;
            this.enemy_counter = map.enemy_counter;
            this.enemy_spawn = map.enemy_spawn;
            this.brick = map.brick;
            this.walls = map.walls;
            this.eagle = map.eagle;
            this.is_loaded = true;
        }
    }

    get_enemy_counter() {
        if (this.is_loaded) {
            return this.enemy_counter;
        }
    }

    get_spawn_counter() {
        if (this.is_loaded) {
            return this.spawn_counter;
        }
    }

    get_enemy_spawn_point() {
        if (this.is_loaded) {
            return this.enemy_spawn;
        }
    }

    get_eagle_point() {
        if (this.is_loaded) {
            return this.eagle;
        }
    }

    get_start_point() {
        if (this.is_loaded) {
            return this.start_point;
        }
    }

    get_walls_array() {
        if (this.is_loaded) {
            return this.walls;
        }
    }

    get_brick_array() {
        if (this.is_loaded) {
            return this.brick;
        }
    }
}