(function () {
    angular
        .module('WAM')
        .controller('postDisplayController', postDisplayController);

    function postDisplayController($routeParams,  $location, currentUser, postService) {
        var model = this;

        model.userId = currentUser._id;
        model.postId = $routeParams.postId;

        model.editPost = editPost;

        function init() {
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
    }
})();
