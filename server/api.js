Meteor.methods({
    move: function(entity, direction) { // TODO: in the future use Meteor.user() instead of entity
        console.log('received call move ' + entity + ' ' + direction);

        // check actionLock
        if (Redis.get('entity::' + entity + '::actionLock') == 1) {
            Redis.set('entity::' + entity + '::queue', direction);
            console.log('entity actionLocked, returning');
            return;
        }

        // compute new coords
        var diff = ROT.DIRS[8][direction];
        var oldCoords = Redis.get('entity::' + entity + '::position').split(',');
        var newX = parseInt(oldCoords[0]) + diff[0];
        var newY = parseInt(oldCoords[1]) + diff[1];
        var new_coords = newX + ',' + newY;

        // check passability
        var level = getLevel(entity);
        if (!isPassable(Redis.get('map::' + level + '::' + new_coords))) {
            console.log('destination '+new_coords+' impassable, returning');
            return;
        }

        // TODO: make sure another entity isn't in the way

        // set actionLock
        Redis.set('entity::'+entity+'::actionLock', 1);

        // execute move
        console.log('executing move to '+new_coords);
        Redis.set('entity::'+entity+'::position', new_coords);

        // after the animation...
        Meteor.setTimeout(function() {
            // unlock
            Redis.set('entity::'+entity+'::actionLock', 0);

            // execute a move if there is one in the queue
            // TODO: the queue somehow lags behind what the actual last input from the user was
            if (Redis.get('entity::'+entity+'::queue') >= 0) {
                Redis.set('entity::'+entity+'::queue', -1);
                Meteor.call('move', entity, direction);
            }
        }, Redis.get('entity::'+entity+'::moveTime'));
    },

    target: function(targeter, targetee) { // TODO: in the future use Meteor.user() instead of targeter
        // TODO: write this
    }
});
