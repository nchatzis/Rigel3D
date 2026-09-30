// Figure carousels (Architecture / Experiments): one figure at a time, with the
// caption below swapped to match the figure being shown.
$(document).ready(function() {
  $('.figure-switcher').each(function() {
    var $switcher = $(this);
    var $captions = $switcher.find('.switcher-caption');
    var carousel = bulmaCarousel.attach($switcher.find('.figure-carousel')[0], {
      slidesToShow: 1,
      slidesToScroll: 1,
      loop: true,
      // The defaults show 2-3 slides at narrow widths; always show one
      breakpoints: [{ changePoint: 100000, slidesToShow: 1, slidesToScroll: 1 }]
    })[0];

    var $container = $switcher.find('.slider-container');
    var $items = $container.children('.slider-item');
    var current = 0;

    // Figures differ in height: shrink/grow the carousel to the shown one so
    // the caption sits right under it instead of below a white gap.
    function fitHeight() {
      $container.css('height', $items.eq(current).outerHeight() + 'px');
    }

    carousel.on('before:show', function(state) {
      current = state.next;
      $captions.removeClass('is-active').eq(current).addClass('is-active');
      fitHeight();
    });

    $items.find('img').on('load', fitHeight);
    $(window).on('resize', fitHeight);
    fitHeight();
  });
});
