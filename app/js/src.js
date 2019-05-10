(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(".xzoom, .xzoom-gallery").xzoom({tint: '#333', Xoffset: 15});
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
  }
  if(check($('.top-nav *'), e.target) && check($('.menu-opener *'), e.target) && e.target != menuOpener){
    topNav.classList.remove('menu-is-active');
  }
  if(check($('.city-list *'), e.target) && check($('input[name="deliveryCity"]'), e.target)){
    if(document.location.pathname.includes("/order.html")){
      document.querySelector(".city-list").classList.remove("city-list-active");
    }
  }
};

menuOpener.addEventListener('click', function(){
  topNav.classList.toggle('menu-is-active');
})


// show-filterr
var filterBtn = $('.filter__button');
var filter = $('.filter');
console.log(filter);
filterBtn.on('click', function(){
  console.log(filter);
  filter.toggleClass('is-active')
});

// slider
$('.main-carousel').flickity({
  // options
  cellAlign: 'center',
  contain: true,
  freeScroll: true,
  pageDots: false
});





},{}]},{},[1])


document.addEventListener('DOMContentLoaded', function(){
  addListeners();
  setRating();
});
function addListeners(){
  var stars = document.querySelectorAll('.star');
  [].forEach.call(stars, function(star, index){
    star.addEventListener('click', (function(idx){
      console.log('adding rating on', index);
      document.querySelector('.stars').setAttribute('data-rating',  idx + 1);
      document.querySelector('form .hidden-rate').value = idx + 1;

      console.log('Rating is now', idx+1);
      setRating();
    }).bind(window,index) );
  });
}
function setRating(){
  var stars = document.querySelectorAll('.star');
  if(!stars.length){
    return false
  }
    var rating = parseInt( document.querySelector('.stars').getAttribute('data-rating') );
    [].forEach.call(stars, function(star, index){
      if(rating > index){
        star.classList.add('rated');
        console.log('added rated on', index );
      }else{
        star.classList.remove('rated');
        console.log('removed rated on', index );
      }
    });
  }


$(function () {
    $(".comment").slice(0, 2).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".comment:hidden").slice(0, 2).slideDown();
    });
});


//slider


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


$('.main-carousel').flickity({
  // options
  cellAlign: 'left',
  contain: true
});


$( function() {
    $( "#datepicker" ).datepicker({
      dateFormat: "d.m.y",
      defaultDate: 0,
      firstDay: 1,
      setDate: +1
    });
  } );

function checkReciver(){
  var senderFields = document.querySelectorAll(".delivery__sender input");
  if(!senderFields[0]){
    return false;
    }
  if(document.querySelector('#reciver-self').checked){
    document.querySelector(".delivery__sender").classList.add('sender-disable');
    [].forEach.call(senderFields, function(field){
      field.required = false;
    })
  } else {
      document.querySelector(".delivery__sender").classList.remove('sender-disable');
      [].forEach.call(senderFields, function(field){
        field.required = true;
      })
  }
  removeDecorator();
  setDecorator();
  setPosition();
}

checkReciver();

var deliveryRadios = document.querySelectorAll(".delivery-radio");
[].forEach.call(deliveryRadios, function(radio){
  var thisRadio = radio.querySelector('input');
  thisRadio.addEventListener('click', function(){
    [].forEach.call(document.querySelectorAll('.radiochecked'), function(elem){
      elem.classList.remove('radiochecked-active')
    });
    [].forEach.call(document.querySelectorAll('.delivery-radio label'), function(elem){
      elem.classList.remove('radiotitle-active');
    });
    radio.querySelector('.radiochecked').classList.add("radiochecked-active");
    radio.querySelector('label').classList.add("radiotitle-active");
    checkReciver();
  })
})



function showCityVariants(){
  if(!document.querySelector("form.delivery")){
    return false;
  }
  var cityExamples = ["Київ", "Харків", "Одеса", "Дніпропетровськ", "Донецьк", "Запоріжжя", "Львів", "Кривий Ріг",
  "Миколаїв", "Маріуполь"];
  var cityField = document.getElementsByName("deliveryCity")[0];
  var cityPropose = document.querySelector(".city-list");
  var cityList = document.querySelector(".city-list ul");

  cityPropose.style.top = offset(cityField).top + 33 + "px";
  cityPropose.style.left = offset(cityField).left + "px";
  window.addEventListener("resize", function(){
    cityPropose.style.top = offset(cityField).top + 33 + "px";
    cityPropose.style.left = offset(cityField).left + "px";
  });
  cityField.addEventListener("keyup", function(){
    cityPropose.classList.add("city-list-active");
    var reg = new RegExp("^" + cityField.value, "i");
    var resultList = [];
    cityExamples.forEach(function(city){
      if(city.match(reg)){
        resultList.push(city);
      }
    });
    [].forEach.call(document.querySelectorAll(".city-list li"), function(elem){
      elem.parentNode.removeChild(elem);
    })
    resultList.forEach(function(item){
      var element = document.createElement("li");
      var cityName = document.createTextNode(item);
      element.addEventListener('click', function(){
        cityField.value = item;
        cityPropose.classList.remove("city-list-active");
      })
      element.appendChild(cityName);
      cityList.appendChild(element);
    })

  })

}


jQuery(document).ready(function(){
    $('.qtyplus').click(function(e){
        e.preventDefault();
        fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal)) {
            $('input[name='+fieldName+']').val(currentVal + 1);
            priseChange(currentVal+1);
        } else {
            $('input[name='+fieldName+']').val(1);
        }
    });
    $(".qtyminus").click(function(e) {
        e.preventDefault();
        fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $('input[name='+fieldName+']').val(currentVal - 1);
            priseChange(currentVal-1);
        } else {
            $('input[name='+fieldName+']').val(1);
        }
    });
    function priseChange(qty) {
      var mainPrise = $('.form__prise .hidden-prise').val();
      console.log(mainPrise+'hhh')
      var newPrise = mainPrise*qty;
      $('.form__prise span').text(formatNumber(newPrise) + ' руб.');
      console.log(newPrise)

    }

    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
});



window.counter
var currentPrice = 1000;
$('.product__button a').on('click', function(e){
  e.preventDefault()
  var price = $(this).data("price")
  currentPrice+=price
    $('#price').text(currentPrice)
  var currentNum = $('#counter').text()
  currentNum++
    $('#counter').text(currentNum)
  var product = $(this).parents('.product');
  var fake_product = product.clone()
  var pos = product.offset()
  console.log(pos)
  fake_product.css({
    position: 'absolute',
    top: pos.top,
    left: pos.left,
    'min-height': 'auto',
    background: '#fff'
  })
  var order = $('.cart-button')
  var order_pos = order.offset()
  $('body').append(fake_product);
  console.log(fake_product)
  fake_product.animate({
    top: order_pos.top,
    left: order_pos.left,

  }, 1000, function(){
    console.log(fake_product.remove())
    fake_product.remove();
  })

})

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

$('.slider.slider_four_in_line').EasySlides({
  'show': 6
})



function setPosition(){
  var cityPropose = document.querySelector(".city-list");
  var cityField = document.getElementsByName("deliveryCity")[0];
  cityPropose.style.top = offset(cityField).top + 33 + "px";
  cityPropose.style.left = offset(cityField).left + "px";
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

showCityVariants();

