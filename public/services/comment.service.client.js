(function(){
    angular
        .module('WAM')
        .service('commentService', commentService);
    
    function commentService($http) {

        var api = {
            findAllCommentsForPost: findAllCommentsForPost,
            deleteCommentByAdmin: deleteCommentByAdmin,
            deleteComment: deleteComment,
            createComment: createComment
        };
        return api;

        function createComment(postId, comment) {
            var url = "/api/post/"+postId+"/comment";
            return $http.post(url, comment)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllCommentsForPost(postId) {
            var url = "/api/post/"+postId+"/comment";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteComment(postId, commentId) {
            var url = "/api/post/"+postId+"/comment/+"+commentId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteCommentByAdmin(postId, commentId) {
            var url = "/api/admin/post/"+postId+"/comment/"+commentId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();