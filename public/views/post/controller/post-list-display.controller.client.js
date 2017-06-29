(function () {
    angular
        .module('WAM')
        .controller('postListDisplayController', postListDisplayController);

    function postListDisplayController($routeParams,  $location, currentUser, postService, userService, $timeout) {
        var model = this;

        model.userId = currentUser._id;
        model.publisherId = $routeParams.publisherId;

        model.initSlick = initSlick;
        model.displayPost = displayPost;
        model.subscribe = subscribe;

        function init() {
            renderUser(currentUser);
            onLoadJquery();
            postService
                .displayPostsForPublisher(model.publisherId)
                .then(function(posts){
                    renderPosts(posts)
                });

            userService
                .findPublisherById(model.publisherId)
                .then(function(publisher) {
                    renderPublisher(publisher)
                });

        }
        init();

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
            }, 500)
        }

        function initSlick() {
            $compile(angular.element(".slick-cloned"))(model);
        }

        function renderPosts(posts) {
            model.posts = posts;
            onLoadJquery();
        }

        function renderPublisher(publisher) {
            model.publisher = publisher
        }

        function renderUser (user) {
            model.user = user;
        }

        function displayPost(postId) {
            $location.url("/post/"+postId+"/display");
        }

        function subscribe() {
            userService
                .subscribe(model.publisherId)
                .then(function(){
                    model.message = 'Congrats! You just subscribed to '+model.publisher.firstName
                        +" "+model.publisher.lastName+"!";
                });
        }
    }
})();
