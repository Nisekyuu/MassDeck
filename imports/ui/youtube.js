YoutubeApi.authenticate({
    type: 'key',
    key: 'AIzaSyAcYPyP436stn9-8kReUvhpfKX0PSSFdV0'
});

Meteor.methods({
    searchVideo: function(search) {
        YoutubeApi.search.list({
            part: "id",
            type: "video",
            maxResults: 5,
            q: search,
        }, function (err, data) {
            console.log(err, data);
        });
    }
});