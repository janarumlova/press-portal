(function () {
    angular
        .module('WAM')
        .controller('postListDisplayController', postListDisplayController);

    function postListDisplayController($routeParams,  $location, currentUser, postService, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.publisherId = $routeParams.publisherId;

        model.initSlick = initSlick;
        model.displayPost = displayPost;
        model.subscribe = subscribe;

        function init() {
            renderUser(currentUser);
            postService
                .displayPostsForPublisher(model.publisherId)
                .then(function(posts){
                    renderPosts(posts)
                });

            userService
                .findPublisherById(model.publisherId)
                .then(function(publisher) {
                    renderPublisher(publisher)
                });
        }
        init();

        function initSlick() {
            $compile(angular.element(".slick-cloned"))(model);
        }

        function renderPosts(posts) {
            model.posts = posts;
        }

        function renderPublisher(publisher) {
            model.publisher = publisher
        }

        function renderUser (user) {
            model.user = user;
        }

        function displayPost(postId) {
            $location.url("/post/"+postId+"/display");
        }

        function subscribe() {
            userService
                .subscribe(model.publisherId)
                .then(function(){
                    model.message = 'Congrats! You just subscribed to '+model.publisher.firstName
                        +" "+model.publisher.lastName+"!";
                });
        }
    }
})();
