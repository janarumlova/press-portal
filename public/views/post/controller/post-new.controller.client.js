(function () {
    angular
        .module('WAM')
        .controller('postNewController', postNewController);

    function postNewController($location, currentUser, postService, userService) {

        var model = this;

        model.userId = currentUser._id;
        model.editProfile = editProfile;
        model.showPublishers = showPublishers;
        model.myPosts = myPosts;

        model.unregisterUser = unregisterUser;
        model.logout = logout;

        model.createPost = createPost;

        function init() {
            if(currentUser.role === 'PUBLISHER') {
                renderSubscribers();
                postService
                    .findPostsByPublisher()
                    .then(renderPosts);
            }
            renderUser(currentUser);
        }
        init();

        function renderSubscribers() {
            userService
                .findSubscribers()
                .then(function(subscribers) {
                    model.subscribers = subscribers
                });
        }
        function findSubscribers() {
            userService
                .findSubscribers()
                .then(function (subscribers) {
                    model.subscribers = subscribers;
                });
        }

        function renderUser (user) {
            model.user = user;
        }

        function renderPosts (posts) {
            model.posts = posts;
        }

        function editProfile() {
            $location.url("/profile/edit");
        }

        function showPublishers() {
            $location.url("/publisher");
        }
        function myPosts() {
            $location.url("/post");
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

        function createPost(isValid, newPost) {
            if (isValid) {
                return postService
                    .createPost(newPost)
                    .then(function () {
                        model.message = "You just added a new post!";
                        $location.url('/post');
                    });
            }
            else {
                model.error = 'One or more fields are required';
            }
        }
    }
})();



