import Map from './map'

test("Try to receive data from not loaded map", () =>{
    var map = new Map();
    expect(map.get_enemy_spawn_point()).toBe(undefined);
});