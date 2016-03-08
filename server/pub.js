Meteor.publish('map', function (user) {
    if (!user) return [];
    var level = getLevel(user);
    if (!level) return [];
    return Redis.matching('map::' + level + '::*');
});

Meteor.publish('entities', function (user) {
    if (! user) return [];
    return Redis.matching('entity::*'); // TODO: only return the entities in user's level or FOV
});
