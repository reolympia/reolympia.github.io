//Get instagram feed
var feed = new Instafeed({
    get: 'user',
    limit: '20',
    userId: '4216308421',
    resolution:'low_resolution',
    accessToken: '4216308421.1677ed0.e0b080ce41b342738b64c25c78298cdc',
    template:'<div class="col-md-4 col-xs-6"> <a href={{link}} class=thumbnail> <img src={{image}}> </a> </div>'
});

feed.run();