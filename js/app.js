'use strict';

// function constructor
let allImages = [];
let selected = [];
function Gallery (item){
  this.image_url = item.image_url;
  this.title = item.title;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
  allImages.push(this);
}
// Methods
Gallery.prototype.render = function(){
  let image = $('.photo-template').clone();
  $('main').append(image);
  image.find('h2').text(this.title);
  image.find('img').attr('src', this.image_url);
  image.find('p').text(this.description);
  image.removeClass('photo-template');
  image.attr('class',this.keyword);
}

Gallery.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('json/page1.json', ajaxSettings).then((data) => {
    data.forEach((item) => {
      let gallery = new Gallery(item);
      gallery.render();
      if(!selected.includes(gallery.keyword)) {
        selected.push(gallery.keyword);
        $('select').append(`<option value = ${gallery.keyword}>`+ gallery.keyword +'</option>')
      }
    });
  });
};

$(() => Gallery.readJson());


$('document').ready(function filterSelected(){
  $('select').on('change', function(){
    let userSelection = $(this).val();
    if(userSelection === 'default'){
      $('section').fadeIn();
      $('.hide').hide();
    }else{
      $('section').hide();
      $(`.${userSelection}`).fadeIn();
    }
  })
})
