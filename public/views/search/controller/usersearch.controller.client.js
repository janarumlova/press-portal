(function() {
    angular
        .module('WAM')
        .controller('userSearchController', userSearchController);

    function userSearchController(currentUser, postService, $location, searchService, $window) {

        var model = this;

        model.searchNewsDetails = searchNewsDetails;
        model.searchNewsByCategory = searchNewsByCategory;
        model.savePost = savePost;
        model.goToUrl = goToUrl;

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser(user) {
            model.user = user;
        }

        function goToUrl(url) {
            // $window.location.href = url;
            $window.open(url, "_blank")
        }

        function savePost(article) {
            if(model.user.role === 'READER'){
                var newArticle = {};
                newArticle.title = article.title;
                newArticle.description = article.description;
                newArticle.imageUrl = article.urlToImage;
                newArticle.sourceUrl = article.url;
                newArticle._publisher = article.author;
                newArticle.dateCreated = article.publishedAt;

                postService.saveSearchPost(newArticle)
                    .then(function (response) {
                        model.message = "Post saved to My Posts!";
                        $location.url("/savedPost");
                    });
            }
            else{
                model.error = 'Please register as a Reader to save the post';
            }

        }

        function searchNewsDetails(article) {
            model.article = article;
        }

        function searchNewsByCategory(category) {
            searchService
                .searchNewsByCategory(category)
                .then(renderNews);
        }

        function renderNews(articles) {
            model.news = articles;
            model.message = "Look for search results in 'Search Results' tab";
            // $location.url("/search");
        }
    }
})();