(function(){
    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUserByAdmin: updateUserByAdmin,
            updateUserByUser: updateUserByUser,
            deleteUser: deleteUser,
            login: login,
            loggedIn: loggedIn,
            logout: logout,
            register: register,
            unregister: unregister,
            checkAdmin: checkAdmin,
            findAllUsers: findAllUsers,
            findAllPublishers: findAllPublishers,
            findAllReaders: findAllReaders,
            findSubscriptions: findSubscriptions,
            findPublisherById: findPublisherById
        };
        return api;

        function findPublisherById(userId) {
            var url = "/api/publisher/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findSubscriptions() {
            var url = "/api/subscriptions";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPublishers() {
            console.log("here");
            var url = "/api/publisher";
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                },function (err) {
                    console.log(err);
                });
        }

        function findAllReaders() {
            var url = "/api/reader";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister() {
            var url = "/api/unregister";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function register(userObj) {
            var url = "/api/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            var url = "/api/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function loggedIn() {
            var url = "/api/loggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUserByAdmin(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUserByUser(user) {
            var url = "/api/updateUser";
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = '/api/user/'+ userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = "/api/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();