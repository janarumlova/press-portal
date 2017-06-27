/**
 * Created by sidharththapar on 6/25/17.
 */

(function () {
    angular
        .module('WAM')
        .controller('profileEditController', profileEditController);

    function profileEditController($location, currentUser, userService) {

        var model = this;

        model.userId = currentUser._id;

        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.updateUserByUser = updateUserByUser;
        model.editProfile = editProfile;
        model.showPublishers = showPublishers;
        model.addPost = addPost;
        model.myPosts = myPosts;
        model.savedPosts = savedPosts;
        model.showReaders = showReaders;

        model.findAllReaders = findAllReaders;
        model.findSubscriptions = findSubscriptions;
        model.findPostsByPublisher = findPostsByPublisher;
        model.findPostsForReader = findPostsForReader;

        model.monitorUsers = monitorUsers;
        model.monitorComments = monitorComments;
        model.monitorPosts = monitorPosts;

        function init() {
            renderUser(currentUser);
            renderPublishers();

            if(currentUser.role === 'READER'){
                renderFollowing();
                renderFollowers();
                renderSubscriptions();
            }
        }
        init();

        function monitorUsers() {
            $location.url("/admin/user");
        }
        function monitorPosts() {
            $location.url("/admin/post");
        }
        function monitorComments() {
            $location.url("/admin/comment");
        }

        function renderPublishers() {
            userService
                .findAllPublishers()
                .then(function (users) {
                    model.publishers = users
                });
        }

        function renderSubscriptions() {
            userService
                .findSubscriptionsForReader(currentUser._id)
                .then(function(subscriptions) {
                    model.subscriptions = subscriptions
                });
        }

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

        function renderUser (user) {
            model.user = user;
        }

        function findPostsForReader() {
            postService
                .findPostsForReader()
                .then(function (posts) {
                    model.posts = posts;
                });
        }

        function findPostsByPublisher() {
            postService
                .findPostsByPublisher()
                .then(function (posts) {
                    model.posts = posts;
                });
        }

        function findAllReaders() {
            userService
                .findAllReaders()
                .then(function (users) {
                    model.readers = users;
                });
        }
        function findSubscriptions(){
            userService
                .findSubscriptions()
                .then(function (users) {
                    model.publishers = users;
                });
        }

        function editProfile() {
            $location.url("/profile/edit");
        }
        function showPublishers() {
            $location.url("/publisher");
        }
        function showReaders() {
            $location.url("/reader");
        }

        function addPost() {
            $location.url("/post/new");
        }
        function myPosts() {
            $location.url("/post");
        }
        function savedPosts() {
            $location.url("/savedPost");
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
        function updateUserByUser(isValid, user) {
            if (isValid) {
                userService
                    .updateUserByUser(user)
                    .then(function () {
                        $location.url("/profile");
                    });

            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();
