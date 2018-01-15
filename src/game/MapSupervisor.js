import Map from './map'

export default class MapSupervisor {
    static currentMapCounter = 0;

    constructor(mapType, roundNumber) {
        this.mapType = mapType;
        this.roundNumber = roundNumber;
        MapSupervisor.currentMapCounter = this.roundNumber;
    }

    getMapList() {
        return this.mapList;
    }

    getCurrentMap() {
        let currentMap = new Map();

        currentMap.load_map(this.fetchMapFromServer());
        console.log("CURRENT MAP: " + MapSupervisor.currentMapCounter);
        MapSupervisor.currentMapCounter += 1;    // next call will give next map

        return currentMap;
    }

    fetchMapFromServer() {
        // TODO: fetch map
        let fetchedMap = null;
        /*fetch("http://0.0.0.0:6969/api/get_map", {
            method: 'POST',
            body: JSON.stringify({
                type: this.mapType,
                round: this.map_counter
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        .catch(error => console.error("Error", error))
        .then(response => {
            tempMap = response.map;
            received = true;
            console.log('Received');
        });*/

        var xhr = new XMLHttpRequest();
        var url = "http://0.0.0.0:6969/api/get_map";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json);
            }
        };
        var data = JSON.stringify({type: this.mapType, round: this.map_counter});
        xhr.send(data);


        return fetchedMap.map;
    }
}