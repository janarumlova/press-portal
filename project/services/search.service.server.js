var app = require('../../express');
var https = require("https");

app.get("/api/:category", searchNewsByCategory);

function searchNewsByCategory(req, res) {
    var category = req.params.category;
    var sortBy = 'top';
    var key = process.env.MLAB_NEWS_API_KEY;  // get from env variable

    var url = ''
        + 'https://newsapi.org/v1/articles?source='
        + category
        + '&sortBy='
        + sortBy
        + '&apiKey='
        + key;
    https
        .get(url, function (response) {
            var output = '';
            response
                .on("data",function(chunk){
                    output += chunk;
                    output = JSON.parse(output);
                })
                .on("end", function(){
                    res.json(output);
                })
            });
}
