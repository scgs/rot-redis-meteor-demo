Deps.autorun(function () {
    var user = Session.get('username'); // TODO: in the future use Meteor.user()
    if (! user) return;
    Meteor.subscribe('map', user);
    Meteor.subscribe('entities', user);
});
