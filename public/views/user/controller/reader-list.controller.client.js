(function () {
    angular
        .module('WAM')
        .controller('readerListController', readerListController);

    function readerListController($location, $routeParams, currentUser, userService, postService) {

        var model = this;

        model.role = currentUser.role;

        model.editProfile = editProfile;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.addPost = addPost;
        model.displayPosts = displayPosts;
        model.savedPosts = savedPosts;
        model.showPublishers = showPublishers;
        model.follow = follow;

        function init() {
            renderUser(currentUser);
            userService
                .findAllReaders()
                .then(function (readers) {
                    model.readers = readers
                });

            renderFollowing();
            renderFollowers();
            userService
                .findSubscriptionsForReader(currentUser._id)
                .then(renderSubscriptions)
            }
        init();

        // function renderReaders() {
        //     userService
        //         .findAllReaders()
        //         .then(function (readers) {
        //             model.readers = readers
        //         });
        // }

        function follow(reader) {
            userService
                .follow(reader._id)
                .then(function (res) {
                    init();
                    model.message= "You have started following "+reader.firstName
                        +"! Check the 'Readers you follow' section.";
                });
        }

        function showPublishers() {
            $location.url("/publisher");
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
                .then(function (following) {
                    model.iFollow = following;
                });
        }

        function renderUser(user) {
            model.user = user;

        }

        function renderSubscriptions(subscriptions) {
            model.subscriptions = subscriptions;
        }


        function displayPosts(publisherId) {
            $location.url("/publisher/"+publisherId+"/display");
        }
        
        function editProfile() {
            $location.url("/profile/edit");
        }
        function addPost() {
            $location.url("/post/new");
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
    }
})();
