Meteor.startup(function () {
    createLevel('1', 5, 5);
    createEntity('gilgi', '@', '1', 4, 4);
    createEntity('kobold', 'k', '1', 2, 2);
});
