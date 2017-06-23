(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        function register(isValid, newUser) {
            model.submitted = true;
            if (isValid) {
                if(newUser.password !== newUser.password2) {
                    model.error = "passwords must match";
                    return;
                }

                userService
                    .findUserByUsername(newUser.username)
                    .then(
                        function (user) {
                            model.error = "Sorry, "+newUser.username+" is taken";
                        },
                        function (response) {
                            delete newUser.password2;
                            return userService
                                .register(newUser)
                                .then(function () {
                                    $location.url('/profile');
                                });
                        }
                    )
            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();