Meteor.startup(function() {
    // init display
    display = new ROT.Display();
    document.body.appendChild(display.getContainer());

    // init username
    Session.set('username', prompt('type your username'));

    // draw map whenever username or level change
    Tracker.autorun(function() {
        var username = Session.get('username');
        if (username) {
            var level = getLevel(username);
        }
        if (username && level) {
            drawMap();
            // TODO: the Tracker is too smart and is considering the drawMap() call to be dependent on entities
            // TODO: this is causing the entire map to be redrawn every time anything changes
            // TODO: a more efficient alternative would be to use the watcher below to observe changes to the positions
            // TODO: of entities, and redraw only the two relevant cells
        }
    });

    // watch entities for changes
    var entityWatcher = Redis.matching('entity::*::position').observe({
        changed: function(newDoc, oldDoc) {
            var entity = newDoc._id.split('::')[1];
            var old_coords = oldDoc.value;
            var new_coords = newDoc.value;
            console.log('entity '+entity+' moved from '+old_coords+' to '+new_coords);
        }
    });

    // set listener
    $(document).on('keyup', function (e) {
        var code = e.keyCode;
        console.log('pressed: '+code);
        var username = Session.get('username');
        if (code in wasdKeymap && username) {
            console.log('calling move '+username+' '+wasdKeymap[code]);
            Meteor.call('move', username, wasdKeymap[code]);
        }
    });
});
