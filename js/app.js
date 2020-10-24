'use strict';

// function constructor
let allImages = [];
let selected = [];
// function Gallery (item){
//   this.image_url = item.image_url;
//   this.title = item.title;
//   this.description = item.description;
//   this.keyword = item.keyword;
//   this.horns = item.horns;
//   allImages.push(this);
// }
// Methods
// Gallery.prototype.render = function(){
//   let image = $('.photo-template').clone();
//   $('main').append(image);
//   image.find('h2').text(this.title);
//   image.find('img').attr('src', this.image_url);
//   image.find('p').text(this.description);
//   image.removeClass('photo-template');
//   image.attr('class',this.keyword);
// }
function Gallery(item) {
  for(let key in item){
    this[key] = item[key];
    // console.log(item[key]); object contents
  }
  allImages.push(this);
}

Gallery.prototype.toHTML = function(){
  // console.log(this);
  let imageTemplate = $('#mustache-template').html();
  let html = Mustache.render(imageTemplate, this);
  return html;
}

Gallery.readJson1 = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('json/page1.json', ajaxSettings).then((data) => {
    data.forEach((item) => {
      // console.log(item);
      let gallery = new Gallery(item);
      // gallery.render();
      $('main').append(gallery.toHTML());
      if(!selected.includes(gallery.keyword)) {
        selected.push(gallery.keyword);
        $('select').append(`<option value = ${gallery.keyword}>`+ gallery.keyword +'</option>')
      }
    });
    // console.log(allImages);
  });
};

$(() => Gallery.readJson1());


function filtering(){
  $('select').on('change', function(){
    let userSelection = $(this).val();
    if(userSelection === 'default'){
      $('section').fadeIn();
    }else{
      $('section').hide();
      $(`.${userSelection}`).fadeIn();
    }
  })
}
filtering();
$('#button1').on('click',function(){
  $('section').remove();
  $('select').empty();
  $('select').append('<option value = "default">Filter by Keyword</option>');
  selected =[];
  $(() => Gallery.readJson1());
})

$('#button2').on('click',function(){
  $('section').remove();
  $('select').empty();
  $('select').append('<option value = "default">Filter by Keyword</option>');
  $.ajax('json/page2.json').then((data) => {
    data.forEach((item) => {
      let gallery = new Gallery(item);
      $('main').append(gallery.toHTML());
      if(!selected.includes(gallery.keyword)) {
        selected.push(gallery.keyword);
        $('select').append(`<option value = ${gallery.keyword}>`+ gallery.keyword +'</option>')
      }
    })
  })
  selected =[];
  // $(() => Gallery.readJson2());
  filtering();
})


$('#button3').on('click',function(test){
  $('section').remove();

  allImages.sort((a,b)=> {
    if(a.title.toLowerCase() > b.title.toLowerCase()){
      return 1;
    }
    else if(a.title.toLowerCase()<b.title.toLowerCase()){
      return -1;
    }
    else{
      return 0;
    }
  });

  //render ...
  allImages.forEach((value) =>{
    $('span').append(value.toHTML());

  })
})


$('#button4').on('click',function(){
  allImages.sort((a,b)=> {
    $('section').remove();
    return a.horns-b.horns;
  })
  allImages.forEach(value =>{
    $('span').append(value.toHTML());

  })
})

