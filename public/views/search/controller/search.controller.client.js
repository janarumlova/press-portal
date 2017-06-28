/**
 * Created by sidharththapar on 6/28/17.
 */
(function() {
    angular
        .module('WAM')
        .controller('searchController', searchController);

    function searchController(userService, postService, $location, searchService, $window) {

        var model = this;

        model.searchNewsDetails = searchNewsDetails;
        model.searchNewsByCategory = searchNewsByCategory;
        model.savePost = savePost;
        model.goToUrl = goToUrl;

        function init() {
            // renderUser(currentUser);
        }
        init();

        // function renderUser(user) {
        //     model.user = user;
        // }

        function goToUrl(url) {
            // $window.location.href = url;
            $window.open(url, "_blank")
        }

        function savePost(article) {
            if(model.user){
                var newArticle = {};
                newArticle.title = article.title;
                newArticle.description = article.description;
                newArticle.imageUrl = article.urlToImage;
                newArticle.sourceUrl = article.url;
                newArticle._publisher = article.author;
                newArticle.dateCreated = article.publishedAt;

                userService.savePost(model.post)
                    .then(function (response) {
                        model.message = "Post saved to My Posts!";
                        $location.url("/profile");
                    });
            }
            else{
                init();
                model.error = "You have to be a registered Reader to save the post";
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