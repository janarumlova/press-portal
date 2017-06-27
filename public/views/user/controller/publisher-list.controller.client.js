(function () {
    angular
        .module('WAM')
        .controller('publisherListController', publisherListController);

    function publisherListController($location, $routeParams, currentUser, userService, postService) {

        var model = this;

        model.role = currentUser.role;
        model.publisherId = $routeParams.publisherId;

        model.editProfile = editProfile;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.addPost = addPost;
        model.myPosts = myPosts;
        model.displayPosts = displayPosts;
        model.savedPosts = savedPosts;
        model.showReaders = showReaders;

        function init() {
            renderUser(currentUser);
            userService
                .findAllPublishers()
                .then(function (users) {
                    model.publishers = users
                });
            if (currentUser.role === "READER"){
                renderFollowing();
                renderFollowers();
                renderSubscriptions();
            }
        }

        init();

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
                .then(function (following) {
                    model.iFollow = following;
                });
        }

        function renderUser(user) {
            model.user = user;

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
        function myPosts() {
            $location.url("/post");
        }

        function savedPosts() {
            $location.url("/savedPost");
        }
        function showReaders() {
            $location.url("/reader");
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
