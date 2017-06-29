(function () {
    angular
        .module('WAM')
        .controller('publisherListController', publisherListController);

    function publisherListController($location, $routeParams, currentUser, userService, postService, $timeout) {

        var model = this;

        model.role = currentUser.role;
        model.publisherId = $routeParams.publisherId;

        model.editProfile = editProfile;
        model.logout = logout;
        model.unregisterUser = unregisterUser;
        model.addPost = addPost;
        model.myPosts = myPosts;
        model.displayPosts = displayPosts;
        model.savedPosts = savedPosts;
        model.showReaders = showReaders;

        function init() {
            renderUser(currentUser);
            userService
                .findAllPublishers()
                .then(function (users) {
                    model.publishers = users;
                    onLoadJquery();
                });
            if (currentUser.role === "READER"){
                renderFollowing();
                renderFollowers();
                renderSubscriptions();
            }

            onLoadJquery();
        }

        init();



        function renderSubscriptions() {
            userService
                .findSubscriptionsForReader(currentUser._id)
                .then(function(subscriptions) {
                    model.subscriptions = subscriptions
                });
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
                .then(function (following) {
                    model.iFollow = following;
                });
        }

        function onLoadJquery() {
            $timeout(function () {
                $(document).ready(function(){

                    $('.img-slider').slick({
                        infinite: true,
                        speed: 500,
                        fade: true,
                        cssEase: 'linear',
                        autoplayspeed: 2000
                    });


                    $('.category-cards').slick({
                        infinite: true,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        responsive: [
                            {
                                breakpoint: 1900,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: 999,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: 500,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }]
                    });
                    $('.posts-display')
                        .slick({
                            infinite: true,
                            slidesToShow: 3,
                            slidesToScroll: 2,
                            arrows: false,
                            fade: true,
                            asNavFor: '.posts-display',
                            responsive: [
                                {
                                    breakpoint: 1900,
                                    settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 999,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 2
                                    }
                                },
                                {
                                    breakpoint: 500,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                }]
                        })
                        .on('init', function(event){
                            $scope.showslick = true
                        });
                    $('#slider-for').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        fade: true,
                        asNavFor: '#slider-nav'
                    });
                });
            }, 300)
        }
        function renderUser(user) {
            model.user = user;

        }

        function displayPosts(publisherId) {
            $location.url("/publisher/"+publisherId+"/display");
        }
        
        function editProfile() {
            $location.url("/profile/edit");
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
        function showReaders() {
            $location.url("/reader");
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
    }
})();
