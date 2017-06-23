(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, currentUser, userService) {

        var model = this;

        model.role = currentUser.role;
        model.username = currentUser.firstName;
        model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        // model.getArticlesForUser = getArticlesForUser;

        function init() {
            userService
            .findUserById(model.userId)
            .then(renderUser, userError);

            renderUser(currentUser);
            // model.articles = {a: "a",b: "c",c: "d"};
        }
        init();

        // function getArticlesForUser(userId) {
        //     userService
        //         .getArticles(userId)
        //         .then(renderArticles);
        // }
        //
        // function renderArticles(articles) {
        //     model.articles = articles;
        // }

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

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function updateUser(userId, user) {
            userService
                .updateUser(userId, user)
                .then(function () {
                    model.message = 'User Updated Successfully!'
                });
        }

        function deleteUser(user) {
            userService
                .deleteUser(model.userId)
                .then(function() {
                    $location.url('/login');
                }, function() {
                    model.error = 'Unregister Failed!'
                });
        }
    }
})();