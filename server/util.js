createLevel = function(name, width, height) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            Redis.set('map::'+name+'::'+x+','+y, '.');
        }
    }
};

createEntity = function(name, displayChar, level, x, y){
    Redis.set('entity::'+name+'::displayChar', displayChar);
    Redis.set('entity::'+name+'::level', level);
    Redis.set('entity::'+name+'::position', x+','+y);
    Redis.set('entity::'+name+'::moveTime', 500);
    Redis.set('entity::'+name+'::actionLock', 0);
    Redis.set('entity::'+name+'::queue', -1);
};
