(function () {
    angular
        .module('WAM')
        .controller('adminUserController', adminUserController);

    function adminUserController(userService, currentUser, $location){
        var model = this;

        model.deleteUser = deleteUser;
        model.editUser = editUser;
        model.updateUser = updateUser;

        model.monitorUsers = monitorUsers;
        model.editProfile = editProfile;
        model.logout = logout;
        model.unregisterUser = unregisterUser;

        function init() {
            findAllUsers();
            renderUser(currentUser);
        }
        init();

        function renderUser(user) {
            model.user = user;
        }

        function monitorUsers() {
            $location.url("/admin/user");
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

        function updateUser(user) {
            userService
                .updateUserByAdmin(user._id, user)
                .then(function(){
                    findAllUsers();
                    model.message = user.firstName+" updated successfully!";
                    model.curuser={}
                });
        }

        function editUser(user) {
            model.curuser = angular.copy(user);
        }
        //
        // function createUser(user) {
        //     userService
        //         .createUser(user)
        //         .then(findAllUsers);
        // }

        function deleteUser(user) {
            userService
                .deleteUserByAdmin(user._id)
                .then(function(){
                    model.message = user.firstName+" "+user.lastName+" deleted successfully!";
                    init();
                });
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }
    }
})();
