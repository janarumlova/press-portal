(function () {
    angular
        .module('WAM')
        .controller('postListDisplayController', postListDisplayController);

    function postListDisplayController($routeParams,  $location, currentUser, postService, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.publisherId = $routeParams.publisherId;

        model.displayPost = displayPost;

        function init() {
            postService
                .displayPostsForPublisher(model.publisherId)
                .then(function (posts) {
                    model.posts = posts;
                    });

            userService
                .findPublisherById(model.publisherId)
                .then(function (publisher) {
                    model.publisher = publisher
                });
        }
        init();

        function displayPost(postId) {
            $location.url("/post/"+postId+"/display");
        }
    }
})();
