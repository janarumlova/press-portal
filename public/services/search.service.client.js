(function(){
    angular
        .module('WAM')
        .service('searchService', searchService);
    
    function searchService($http) {

        var api = {
            searchNewsByCategory: searchNewsByCategory
        };
        return api;

        function searchNewsByCategory(category) {
            var url = "/api/"+category;
            return $http.get(url)
                .then(function (response) {
                    return response.data.articles;
                });
        }

        // function searchNewsByCategory(category) {
        //     var sortBy = 'top';
        //     var key = '32fabf41cbef4019b7e8c4b278ca168d';
        //     // if (process.env.MLAB_NEWS_API_KEY) {           // check if running remotely
        //     //     key = process.env.MLAB_NEWS_API_KEY;  // get from env variable
        //     // }
        //
        //     // key = process.env.MLAB_NEWS_API_KEY;  // get from env variable
        //
        //     var url = ''
        //         + 'https://newsapi.org/v1/articles?source='
        //         + category
        //         + '&sortBy='
        //         + sortBy
        //         + '&apiKey='
        //         + key;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data.articles;
        //         });
        // }
    }
})();


