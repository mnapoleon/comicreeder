var ComicVineCleint = require("comicvine-client");

var client = new ComicVineCleint({
    apikey:"0447b47f0d12e229dfef9cdafec888806410e871",
    //Base URL for all the API requets. Don't change it unless you are using your own proxy or something like that.
    apiUrl: "http://api.comicvine.com",
    cache: false
});

client.collections.pageSize = 20;

var issues = client.Search("Batman", "character");
issues.fetch({
    success: function(results) {
        var bandr = results.where({"name": "Batman"})[0];
        console.log(bandr.get("real_name"));
    },
    error: function(results) {
        console.log(results);
    }
})