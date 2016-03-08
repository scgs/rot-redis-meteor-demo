isPassable = function(char) {
    return char == '.';
};

isTransparent = function(char) {
    return char == '.';
};

getLevel = function(entity){
    return Redis.get('entity::'+entity+"::level");
};
