$(document).ready(function() {

  $(".slideshow").owlCarousel({

    navigation : false, // Show next and prev buttons
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem:true,
    autoPlay: 3000,
    stopOnHover: true

    // "singleItem:true" is a shortcut for:
    // items : 1,
    // itemsDesktop : false,
    // itemsDesktopSmall : false,
    // itemsTablet: false,
    // itemsMobile : false

  });
});