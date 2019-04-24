$(".js-range-slider").ionRangeSlider({
  type: "double",
  min: 1000,
  max: 10000,
  step: 10,
  hide_from_to: true,
  hide_min_max: true,

  onChange: function (data) {
    console.dir(data.from);

    $('.price-from').text(data.from + ' руб.');
    $('.price-to').text(data.to + ' руб.');
  }

});


//  search-block
var searchButton = $('.search > button');
var search = $('.search');
search.each(function(){
  var currentSearch = $(this);
  if(!(currentSearch.hasClass('is-active'))){
    var btn = currentSearch.find('> button');
    btn.on('click', function(){
      currentSearch.addClass('is-active')
    });
    $(window).click(function(){
      currentSearch.removeClass('is-active');
    });
    currentSearch.click(function(event){
      event.stopPropagation();
    });
  };
});


