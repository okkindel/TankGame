import Map from './map'

export default class MapSupervisor {
    constructor(mapList) {
        this.mapList = mapList;
        this.currentMapCounter = 1;
        this.currentMap = new Map();
    }

    getMapList() {
        return this.mapList;
    }

    getCurrentMap() {
        this.currentMap.load_map(require('./maps/' + this.mapList[this.currentMapCounter]));
        return this.currentMap;
    }

    fetchMapFromServer(id) {
        // TODO: fetch map
    }
}