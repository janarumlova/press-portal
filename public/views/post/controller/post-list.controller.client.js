(function () {
    angular
        .module('WAM')
        .controller('postListController', postListController);

    function postListController($location, currentUser, postService, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.editProfile = editProfile;
        model.showPublishers = showPublishers;
        model.unregisterUser = unregisterUser;
        model.addPost = addPost;
        model.logout =logout;
        model.deletePost = deletePost;
        model.displayPost = displayPost;
        model.editPost = editPost;

        function init() {
            renderUser(currentUser);
            postService
                    .findPostsByPublisher()
                    .then(renderPosts);
        }
        init();

        function renderUser (user) {
            model.user = user;
        }

        function renderPosts (posts) {
            model.posts = posts;
        }

        function editProfile() {
            $location.url("/profile/edit");
        }

        function showPublishers() {
            $location.url("/publisher");
        }

        function addPost() {
            $location.url("/post/new");
        }
        function displayPost(postId) {
            $location.url("/post/"+postId+"/display");
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

        function editPost(postId) {
            $location.url("/post/"+postId+"/edit");
        }

        function deletePost(postId) {
            postService
                .deletePost(postId)
                .then(function () {
                    init();
                    model.message = "You just deleted the post successfully!";
                }, function (err) {
                    model.error = err
                });
        }
    }
})();



