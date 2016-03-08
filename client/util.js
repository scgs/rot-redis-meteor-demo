drawMap = function() {
    var mapTiles = Redis.matching('map::1::*').fetch();
    for (var i = 0; i < mapTiles.length; i++) {
        var parts = mapTiles[i].key.split('::')[2].split(',');
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        display.draw(x, y, mapTiles[i].value);
    }

    var entityDisplayChars = Redis.matching('entity::*::displayChar').fetch();
    var entityNames = []; // TODO: come up with a better way to get entity names
    for (var i = 0; i < entityDisplayChars.length; i++) {
        entityNames.push(entityDisplayChars[i].key.split('::')[1]);
    }
    for (var i = 0; i < entityNames.length; i++) {
        var parts = Redis.get('entity::'+entityNames[i]+'::position').split(',');
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        var displayChar = Redis.get('entity::'+entityNames[i]+'::displayChar');
        display.draw(x, y, displayChar);
    }
};
