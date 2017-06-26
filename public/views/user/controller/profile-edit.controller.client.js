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

        model.findAllReaders = findAllReaders;
        model.findSubscriptions = findSubscriptions;
        model.findPostsByPublisher = findPostsByPublisher;
        model.findPostsForReader = findPostsForReader;

        function init() {
            renderUser(currentUser);

            userService
                .findAllPublishers()
                .then(function (users) {
                    model.publishers = users
                });
        }
        init();

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
        function addPost() {
            $location.url("/post/new");
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
        function updateUserByUser(isValid, user) {
            if (isValid) {
                userService
                    .updateUserByUser(user)
                    .then(function () {
                        model.message = 'User Updated Successfully!'
                        $location.url("/profile");
                    });

            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();
