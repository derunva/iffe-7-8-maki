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

document.addEventListener('DOMContentLoaded', function(){
  addListeners();
  setRating(); //based on value inside the div
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