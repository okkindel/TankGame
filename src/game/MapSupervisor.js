import Map from './map'

export default class MapSupervisor {
    static currentMapCounter = 0;

    constructor(mapList) {
        this.mapList = mapList;
    }

    getMapList() {
        return this.mapList;
    }

    getCurrentMap() {
        let currentMap = new Map();
        currentMap.load_map(require('./maps/' + this.mapList[MapSupervisor.currentMapCounter]));
        MapSupervisor.currentMapCounter += 1;    // next call will give next map
        console.log("CURRENT MAP: " + MapSupervisor.currentMapCounter);
        return currentMap;
    }

    fetchMapFromServer(id) {
        // TODO: fetch map
    }
}