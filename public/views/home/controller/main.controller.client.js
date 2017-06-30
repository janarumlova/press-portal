(function () {
    angular
        .module('WAM')
        .controller('mainController', mainController);

    function mainController(currentUser, searchService, $window, $timeout){
        var model = this;
        model.currentUser = currentUser;
        model.goToUrl = goToUrl;

        function init() {
            searchSportsNews('the-sport-bible');
            searchBusinessNews('bbc-news');
            searchTechNews('techradar');
            onLoadJquery();
        }
        init();

        function goToUrl(url) {
            $window.open(url, "_blank")
        }

        function searchSportsNews(category) {
            searchService
                .searchNewsByCategory(category)
                .then(function (articles) {
                    model.sports = articles;
                    onLoadJquery();
                });
        }

        function searchTechNews(category) {
            searchService
                .searchNewsByCategory(category)
                .then(function (articles) {
                    model.tech = articles;
                    onLoadJquery();
                });
        }

        function searchBusinessNews(category) {
            searchService
                .searchNewsByCategory(category)
                .then(function (articles) {
                    model.business = articles;
                    onLoadJquery();
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
            }, 500)
        }

    }
})();

