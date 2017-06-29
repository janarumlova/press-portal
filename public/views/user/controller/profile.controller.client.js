(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, currentUser, userService, postService) {

        var model = this;

        model.role = currentUser.role;
        model.username = currentUser.firstName;
        model.userId = currentUser._id;

        model.updatePost = updatePost;
        model.deletePost = deletePost;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.createPost = createPost;
        model.editProfile = editProfile;
        model.showPublishers = showPublishers;
        model.showReaders = showReaders;
        model.addPost = addPost;
        model.myPosts = myPosts;

        model.findAllPublishers = findAllPublishers;
        model.findAllReaders = findAllReaders;
        model.findSubscriptions = findSubscriptions;
        model.findPostsByPublisher = findPostsByPublisher;
        model.findPostsForReader = findPostsForReader;
        model.findSubscriptions = findSubscriptions;
        model.savedPosts = savedPosts;
        model.unFollow = unFollow;

        model.monitorUsers = monitorUsers;
        model.monitorComments = monitorComments;
        model.monitorPosts = monitorPosts;
        model.addUser = addUser;

        function init() {
            renderUser(currentUser);
            if (currentUser.role === "READER"){
                renderFollowing();
                renderFollowers();
                renderSubscriptions();
                renderSubscribers();

            }

        }
        init();

        function addUser() {
            $location.url("/admin/user/new");
        }

        function monitorUsers() {
            $location.url("/admin/user");
        }
        function monitorPosts() {
            $location.url("/admin/post");
        }
        function monitorComments() {
            $location.url("/admin/comment");
        }

        function unFollow(follows) {
            userService
                .unFollow(follows._id)
                .then(function(response) {
                    init();
                    $location.url("/profile");
                    model.message = "You unfollowed "
                        +follows.firstName+" "+follows.lastName;
                })
        }

        function renderSubscriptions() {
            userService
                .findSubscriptionsForReader()
                .then(function(subscriptions) {
                    model.subscriptions = subscriptions
                });
        }

        function renderSubscribers() {
           model.subscribers = model.user.subscribers;
        }

        function renderFollowers() {
            userService
                .findFollowers()
                .then(function (followers) {
                    model.followers = followers;
                });
        }
        function renderFollowing() {
            userService
                .findFollows()
                .then(function (follows) {
                    model.iFollow = follows;
                });
        }

        function renderUser (user) {
            model.user = user;
        }

        function findSubscriptions() {
            userService
                .findSubscriptions()
                .then(function (subscriptions) {
                    model.subscriptions = subscriptions;
                });
        }

        function findSubscribers() {
            userService
                .findSubscribers()
                .then(function (subscribers) {
                    model.subscribers = subscribers;
                });
        }

        function findPostsForReader() {
            postService
                .findPostsForReader()
                .then(function (posts) {
                    model.posts = posts;
                });
        }

        function findPostsByPublisher() {
            postService
                .findPostsByPublisher()
                .then(function (posts) {
                    model.posts = posts;
                });
        }

        function findAllReaders() {
            userService
                .findAllReaders()
                .then(function (users) {
                    model.readers = users;
                });
        }
        function findAllPublishers(){
            userService
                .findAllPublishers()
                .then(function (users) {
                    model.publishers = users;
                    $location.url("/publisher");
                });
        }

        function editProfile() {
            $location.url("/profile/edit");
        }

        function showPublishers() {
            $location.url("/publisher");
        }
        function showReaders() {
            $location.url("/reader");
        }

        function addPost() {
            $location.url("/post/new");
        }
        function myPosts() {
            $location.url("/post");
        }
        function savedPosts() {
            $location.url("/savedPost");
        }

        function createPost(isValid, newPost) {
            if (isValid) {
                return postService
                    .createPost(newPost)
                    .then(function () {
                        model.message = "You just added a new post!";
                        $location.url('/profile');
                        // model.display = "posts";
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
                    $location.url('/');
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function updatePost(isValid, post, postId) {
            if (isValid) {
                postService
                    .updatePost(post, postId)
                    .then(function () {
                        model.message = "You just updated the post successfully!";
                        $location.url('/profile');
                    });
            }else {
                model.error = 'One or more fields are required';
            }
        }

        function deletePost(postId) {
            postService
                .deletePost(model.userId, postId)
                .then(function () {
                    $location.url('/post');
                    model.message = "You just deleted the post successfully!";
                }, function () {
                    model.error = 'Post was not deleted!'
                });
        }
    }
})();