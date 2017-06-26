(function () {
    angular
        .module('WAM')
        .controller('postEditController', postEditController);

    function postEditController($routeParams, $location, currentUser, postService, userService) {

        var model = this;

        model.userId = currentUser._id;
        model.postId = $routeParams.postId;
        model.editProfile = editProfile;
        model.showPublishers = showPublishers;
        model.myPosts = myPosts;
        model.addPost = addPost;

        model.unregisterUser = unregisterUser;
        model.logout = logout;

        model.updatePostByPublisher = updatePostByPublisher;

        function init() {
            renderUser(currentUser);
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    model.post = post
                });
        }
        init();

        function renderUser (user) {
            model.user = user;
        }
        function addPost() {
            $location.url("/post/new");
        }

        function editProfile() {
            $location.url("/profile/edit");
        }

        function showPublishers() {
            $location.url("/publisher");
        }
        function myPosts() {
            $location.url("/post");
        }

        function unregisterUser() {
            userService
                .unregister()
                .then(function () {
                    $location.url('#!/');
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updatePostByPublisher(isValid, updatedPost) {
            if (isValid) {
                return postService
                    .updatePostByPublisher(model.postId, updatedPost)
                    .then(function () {
                        model.message = "You just updated a post!";
                        $location.url('/profile');
                        // model.display = "posts";
                    });
            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();



