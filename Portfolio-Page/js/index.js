$(function(){
  $(".home_scroll").click(function() {
    $('html, body').animate({
        scrollTop: $(".home").offset().top
    }, 500);
  });
  $(".about_scroll").click(function() {
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 500);
  });
  $(".projects_scroll").click(function() {
    $('html, body').animate({
        scrollTop: $("#projects").offset().top
    }, 500);
  });
  $(".contact_scroll").click(function() {
    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 500);
  });
});