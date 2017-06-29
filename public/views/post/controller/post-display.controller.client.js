(function () {
    angular
        .module('WAM')
        .controller('postDisplayController', postDisplayController);

    function postDisplayController($routeParams,  $location, currentUser, postService, userService, commentService) {
        var model = this;

        model.userId = currentUser._id;
        model.postId = $routeParams.postId;

        model.editPost = editPost;
        model.savePost = savePost;
        model.addComment = addComment;
        model.checkAuthor = checkAuthor;
        model.deleteComment = deleteComment;

        function init() {
            renderUser(currentUser);
            renderPost();
            renderComment()
        }
        init();

        function checkAuthor(authorName) {
            var firstName = model.user.firstName;
            var lastName = model.user.lastName;
            var name = firstName + " " + lastName;
            return name === authorName;
        }

        function renderComment() {
            commentService
                .findAllCommentsForPost(model.postId)
                .then(function (comments) {
                    model.comments = comments
                });
        }

        function renderUser(user) {
            model.user = user;
        }

        function renderPost() {
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    model.post = post
                });
        }
        function editPost(postId) {
            $location.url("/post/"+postId+"/edit");
        }

        function savePost() {
            userService.savePost(model.post)
                .then(function (response) {
                    model.message = "Post saved to My Posts!";
                    $location.url("/savedPost");
                });
        }

        function deleteComment(commentId) {
            commentService
                .deleteComment(model.postId, commentId)
                .then(function (response) {
                    model.message = "Comment was deleted!";
                    init();
                    // $location.url('/post/'+model.postId+'/display');
                });
        }

        function addComment(comment) {
            comment.post = model.postId;
            commentService
                .createComment(model.postId, comment)
                .then(function (response) {
                    model.messgage = "Comment was added successfully!";
                    init();
                });
        }

    }
})();
