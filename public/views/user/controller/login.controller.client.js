(function() {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService, $scope) {

        var model = this;

        model.login = login;

        function login(isValid) {
            model.submitted = true;
            if (isValid) {
                userService
                    .login(model.username, model.password)
                    .then(function (found) {
                        $location.url('/profile');
                        }, function () {
                        model.error = "Wrong Credentials!";
                    });
            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();