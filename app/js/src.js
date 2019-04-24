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

//checking if target is not one of nodelist elements`
function check(nodelist, target){
  var result = [].every.call(nodelist, function(item){
    return item != target;
  });
  return result;
};

var searchButton = document.querySelector('.header-search-button');
var submitButton = document.querySelector('.header-submit-button');
var headerSearch = document.querySelector('.header-search-input');
var menuOpener = document.querySelector('.menu-opener');
var topNav =  document.querySelector('.top-nav');

searchButton.addEventListener('click', function(){
  headerSearch.classList.add('search-is-active');
  submitButton.classList.add('submit-btn-is-active');
});

document.querySelector('body').onclick = function(e){
  if(e.target != $('.header-search form') && check($('.header-search form *'), e.target)){
    headerSearch.classList.remove('search-is-active');
    submitButton.classList.remove('submit-btn-is-active');
  };
  if(check($('.top-nav *'), e.target) && check($('.menu-opener *'), e.target) && e.target != menuOpener){
    topNav.classList.remove('menu-is-active');
  };
};

menuOpener.addEventListener('click', function(){
  topNav.classList.toggle('menu-is-active');
})
