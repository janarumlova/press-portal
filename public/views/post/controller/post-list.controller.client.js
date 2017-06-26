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

        function init() {
            if(currentUser.role === 'PUBLISHER'){
                postService
                    .findPostsByPublisher()
                    .then(renderPosts);
            }

            if(currentUser.role === 'READER'){
                postService
                    .findPostsForReader()
                    .then(renderSavedPosts);
            }
            renderUser(currentUser);
        }
        init();

        function renderUser (user) {
            model.user = user;
        }

        function renderPosts (posts) {
            model.posts = posts;
        }
        function renderSavedPosts(posts) {
            model.savedPosts = posts;
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
        function deletePost(postId) {
            postService
                .deletePost(model.userId, postId)
                .then(function () {
                    $location.url('/post');
                    model.message = "You just deleted the post successfully!";
                }, function () {
                    model.error = 'Post was not deleted!'
                });
        }
    }
})();



