(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, currentUser, userService, postService) {

        var model = this;

        model.role = currentUser.role;
        model.username = currentUser.firstName;
        model.userId = currentUser._id;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.createPost = createPost;
        // model.getArticlesForUser = getArticlesForUser;

        function init() {
            model.display = "welcome";
            userService
            .findUserById(model.userId)
            .then(renderUser, userError);

            renderUser(currentUser);
        }
        init();

        function createPost(isValid, newPost) {
            if (isValid) {
                return postService
                    .createPost(newPost)
                    .then(function () {
                        model.message = "You just added a new post!";
                        $location.url('/profile');
                    });
            }
            else {
                model.error = 'One or more fields are required';
            }
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

        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

        function updateUser(user) {
            userService
                .updateUserByUser(user)
                .then(function () {
                    $location.url('/profile');
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