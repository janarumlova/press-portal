(function(){
    angular
        .module('WAM')
        .service('postService', postService);
    
    function postService($http) {

        var api = {
            createPost: createPost,
            findPostsByPublisher: findPostsByPublisher,
            findPostsForReader: findPostsForReader,
            findPostById: findPostById,
            updatePostByPublisher: updatePostByPublisher,
            displayPostsForPublisher: displayPostsForPublisher,
            subscribe: subscribe,
            deletePost: deletePost,
            findAllPosts: findAllPosts,
            deletePostByAdmin: deletePostByAdmin,
            saveSearchPost: saveSearchPost

        };
        return api;


        // function searchNewsByCategory(category) {
        //     var url = "/api/newsApi/"+category;
        //     console.log("HERE");
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data.articles;
        //         });
        // }

        function findAllPosts() {
            var url = "/api/post";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePost(postId) {
            var url = "/api/deletePost/"+postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePostByAdmin(publisherId, postId) {
            var url = "/api/user/"+publisherId+"/post/"+postId;
            return $http.delete(url)
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

        function findPostById(postId) {
            var url = "/api/post/"+postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostsForReader() {
            var url = "/api/readerPost";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPostsByPublisher() {
            var url = "/api/publisherPost";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function displayPostsForPublisher(publisherId) {
            var url = "/api/publisher/"+publisherId+"/display";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPost(newPost){
            var url = "/api/createPost";
            return $http.post(url, newPost)
                .then(function (response) {
                    return response.data;
                });
        }

        function saveSearchPost(post) {
            var url = "/api/createSearchPost";
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePostByPublisher(postId, updatedPost) {
            var url = "/api/assignment/user/"+postId+"/edit";
                return $http.put(url, updatedPost)
                    .then(function (response) {
                        return response.data;
                    });
        }
        //
        // function updateUser(userId, user) {
        //     var url = "/api/assignment/user/"+userId;
        //     return $http.put(url, user)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function deleteUser(userId) {
        //     var url = "/api/assignment/user/"+userId;
        //     return $http.delete(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function unregister() {
        //     var url = "/api/assignment/unregister";
        //     return $http.post(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function register(userObj) {
        //     var url = "/api/register";
        //     return $http.post(url, userObj)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function checkAdmin() {
        //     var url = "/api/assignment/checkAdmin";
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        // function loggedIn() {
        //     var url = "/api/assignment/loggedIn";
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        // function logout() {
        //     var url = "/api/assignment/logout";
        //     return $http.post(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function login(username, password) {
        //     var url = "/api/assignment/login";
        //     var credentials = {
        //         username: username,
        //         password: password
        //     };
        //     return $http.post(url, credentials)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function findUserByUsername(username) {
        //     var url = "/api/assignment/user?username="+username;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function findUserById(userId) {
        //     var url = '/api/assignment/user/'+ userId;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function findUserByCredentials(username, password) {
        //     var url = "/api/assignment/user?username="+username+"&password="+password;
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
        //
        // function findAllUsers() {
        //     var url = "/api/assignment/user";
        //     return $http.get(url)
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }
    }
})();