(function () {
    angular
        .module('WAM')
        .controller('adminUserController', adminUserController);

    function adminUserController($location, $location, $routeParams, currentUser, userService, postService) {

        var model = this;

        model.editProfile = editProfile;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.allPosts = allPosts;
        model.allUsers = showUsers;
        model.allComments = allComments;
        model.monitorComments = monitorComments;

        model.monitorPosts = monitorPosts;
        model.monitorComments = monitorComments;

        function init() {
            renderUser(currentUser);
            renderAllUsers();
            renderPosts();
            renderComments();
        }
        init();

        function monitorComments() {
            $location.url("/admin/comment");
        }

        function monitorPosts() {
            $location.url("/admin/comment");
        }

        function renderUser(user) {
            model.user = user;

        }
        function renderAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                    init();
                });
        }
        function renderPosts() {
            postService
                .findAllPosts()
                .then(function () {
                    model.posts = posts;
                    init();
                });
        }
        function renderComments() {
            commentService
                .findAllComments()
                .then(function () {
                    model.comments = comments;
                    init();
                });
        }

        function editProfile() {
            $location.url("/profile/edit");
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
