$(".xzoom, .xzoom-gallery").xzoom({
  tint: '#333',
  Xoffset: 15
});
$(".js-range-slider").ionRangeSlider({
  type: "double",
  min: 1000,
  max: 10000,
  step: 10,
  hide_from_to: true,
  hide_min_max: true,

  onChange: function(data) {
    console.dir(data.from);

    $('.price-from').text(data.from + ' руб.');
    $('.price-to').text(data.to + ' руб.');
  }

});

document.addEventListener('DOMContentLoaded', function() {
  addListeners();
  setRating(); //based on value inside the div
});

function addListeners() {
  var stars = document.querySelectorAll('.star');
  [].forEach.call(stars, function(star, index) {
    star.addEventListener('click', (function(idx) {
      console.log('adding rating on', index);
      document.querySelector('.stars').setAttribute('data-rating', idx + 1);
      document.querySelector('form .hidden-rate').value = idx + 1;

      console.log('Rating is now', idx + 1);
      setRating();
    }).bind(window, index));
  });
}

function setRating() {
  var stars = document.querySelectorAll('.star');
  var rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
  [].forEach.call(stars, function(star, index) {
    if (rating > index) {
      star.classList.add('rated');
      console.log('added rated on', index);
    } else {
      star.classList.remove('rated');
      console.log('removed rated on', index);
    }
  });
}


//  search-block
var searchButton = $('.search > button');
var search = $('.search');
search.each(function() {
  var currentSearch = $(this);
  if (!(currentSearch.hasClass('is-active'))) {
    var btn = currentSearch.find('> button');
    btn.on('click', function() {
      currentSearch.addClass('is-active')
    });
    $(window).click(function() {
      currentSearch.removeClass('is-active');
    });
    currentSearch.click(function(event) {
      event.stopPropagation();
    });
  };
});


//checking if target is not one of nodelist elements`
function check(nodelist, target) {
  var result = [].every.call(nodelist, function(item) {
    return item != target;
  });
  return result;
}

var headerSearchButton = document.querySelector('.header-search-button');
var submitButton = document.querySelector('.header-submit-button');
var headerSearch = document.querySelector('.header-search-input');
var menuOpener = document.querySelector('.menu-opener');
var topNav = document.querySelector('.top-nav');

headerSearchButton.addEventListener('click', function() {
  headerSearch.classList.add('search-is-active');
  submitButton.classList.add('submit-btn-is-active');
});

document.querySelector('body').onclick = function(e) {
  if (e.target != $('.header-search form') && check($('.header-search form *'), e.target)) {
    headerSearch.classList.remove('search-is-active');
    submitButton.classList.remove('submit-btn-is-active');
  }
  if (check($('.top-nav *'), e.target) && check($('.menu-opener *'), e.target) && e.target != menuOpener) {
    topNav.classList.remove('menu-is-active');
  }
};

menuOpener.addEventListener('click', function() {
  topNav.classList.toggle('menu-is-active');
});


// show-filter
var filterBtn = $('.filter__button');
var filter = $('.filter');
console.log(filter);
filterBtn.on('click', function() {
  console.log(filter);
  filter.toggleClass('is-active')
});


// TODO: revork this script(checked on click)
var deliveryCheckers = $('.delivery__checkbox');
if(deliveryCheckers){
  [].forEach.call(deliveryCheckers, function(item){
    item.addEventListener('click', function(){
      [].forEach.call(deliveryCheckers, function(elem){
        elem.classList.remove('checkbox-is-active');
      });
      item.classList.add('checkbox-is-active');
      item.querySelector('input').setAttribute('checked', 'checked');
    })
  })
}

// creates decoration line left of the element(only order.html)
// usage: inside flex container with decoratable elemet;
// decoratable element should have ".to-decorate" class
function setDecorator(){
  if(document.location.pathname.includes('order.html')){
    var orderDecorators = document.querySelectorAll('.order-decorator');
    [].forEach.call(orderDecorators, function(decorator){
      var toDecorate = decorator.parentElement.querySelector('.to-decorate');
      if(!toDecorate){
        return false;
      }
      var decorHeight = toDecorate.clientHeight - 40;
      var decoString = "";
      for (var i = 0; i < Math.floor(decorHeight / 10); i++) {
        decoString += "/\n"
      }
      var decoElement = document.createElement('div');
      decoElement.classList.add('decoLine');
      decoElement.appendChild(document.createTextNode(decoString));
      decorator.appendChild(decoElement)
    })
  }
}

// delete current decoration line (at order.html)
// needs to reinitialize decoration line
function removeDecorator(){
  if(document.location.pathname.includes('order.html')){
    var decoratorLines = document.querySelectorAll('.decoLine');
    [].forEach.call(decoratorLines, function(item){
      item.parentNode.removeChild(item);
    })
  }
}

//decoration initialization
setDecorator();
window.addEventListener('resize', function(){
  removeDecorator();
  setDecorator();
});
