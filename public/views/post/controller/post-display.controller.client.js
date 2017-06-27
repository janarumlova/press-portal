(function () {
    angular
        .module('WAM')
        .controller('postDisplayController', postDisplayController);

    function postDisplayController($routeParams,  $location, currentUser, postService, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.postId = $routeParams.postId;

        model.editPost = editPost;
        model.savePost = savePost;

        function init() {
            model.user = currentUser;
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    model.post = post
                });

        }

        init();

        function editPost(postId) {
            $location.url("/post/"+postId+"/edit");
        }
        function savePost() {
            userService.savePost(model.post)
                .then(function (response) {
                    model.message = "Post saved to My Posts!"
                    $location.url("/profile");
                });
        }
    }
})();
