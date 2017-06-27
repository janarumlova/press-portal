(function () {
    angular
        .module('WAM')
        .controller('postListSavedController', postListSavedController);

    function postListSavedController($location, currentUser, postService, userService) {
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
        model.showReaders = showReaders;

        function init() {
            renderUser(currentUser);
            renderFollowers();
            renderFollowing();
            renderSubscriptions();
            postService
                .findPostsForReader()
                .then(renderPosts)
        };
        init();

        function renderFollowers() {
            userService
                .findFollowers()
                .then(function (followers) {
                    model.followers = followers;
                });
        }
        function renderFollowing() {
            userService
                .findFollows()
                .then(function (follows) {
                    model.iFollow = follows;
                });
        }

        function renderSubscriptions() {
            userService
                .findSubscriptionsForReader(currentUser._id)
                .then(function(subscriptions) {
                    model.subscriptions = subscriptions
                });
        }

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
        function showReaders() {
            $location.url("/reader");
        }

        function deletePost(postId) {
            postService
                .deletePost(postId)
                .then(function () {
                    init();
                    model.message = "You just deleted the post successfully!";
                }, function () {
                    model.error = 'Post was not deleted!'
                });
        }

    }
})();



