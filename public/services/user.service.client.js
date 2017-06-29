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
            findSubscriptionsForReader: findSubscriptionsForReader,
            findSubscribers: findSubscribers,
            findPublisherById: findPublisherById,
            subscribe: subscribe,
            savePost: savePost,
            findFollowers: findFollowers,
            findFollows: findFollows,
            follow: follow,
            unFollow: unFollow,
            deleteUserByAdmin: deleteUserByAdmin
        };
        return api;

        function findFollows() {
            var url = "/api/follows";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findFollowers() {
            var url = "/api/followers";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function follow(readerId) {
            var url = "/api/follow/"+readerId;
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function unFollow(readerId) {
            var url = "/api/unFollow/"+readerId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function savePost(post) {
            var url = "/api/savePost";
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function subscribe(publisherId) {
            var url = "/api/subscribe/"+publisherId;
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPublisherById(userId) {
            var url = "/api/publisher/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function findSubscriptionsForReader() {
            var url = "/api/subscriptions";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findSubscribers() {
            var url = "/api/subscribers";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPublishers() {
            var url = "/api/publisher";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
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
        function deleteUserByAdmin(userId) {
            var url = "/api/user/"+userId;
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