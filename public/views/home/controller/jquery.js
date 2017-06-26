$(document).ready(function(){
        $('.img-slider').slick({
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplayspeed: 2000
        });
    });

    $('.category-cards').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });