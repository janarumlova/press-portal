(function () {
    angular
        .module('WAM')
        .controller('userListController', userListController);

    function userListController($location, $routeParams, currentUser, userService, postService) {

        var model = this;

        model.role = currentUser.role;
        model.publisherId = $routeParams.publisherId;

        model.editProfile = editProfile;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.addPost = addPost;
        model.myPosts = myPosts;
        model.displayPosts = displayPosts;


        function init() {
            renderUser(currentUser);
            userService
                .findAllPublishers()
                .then(function (users) {
                    model.publishers = users
                });
        }

        init();

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
