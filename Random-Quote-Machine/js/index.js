var colors = ['red', 'green', 'orange','blueviolet', 'brown', 'aqua', 'burlywood', 'coral', 'cyan', 'darkred', 'forestgreen', 'turquoise'];

function change_Color() {
  $("body").css("background-color", colors[Math.floor(Math.random()*colors.length)])
}

function new_Quote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/?",
    dataType: "jsonp",
    data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
    success: function (response){
      $("#quote").html("<p id='random_quote' class='lead text-center'><i class='fa fa-quote-left' aria-hidden='true'></i> " + response.quoteText + " <i class='fa fa-quote-right' aria-hidden='true'></i><br/>&dash; " + (response.quoteAuthor == "" ? "Unknown" : response.quoteAuthor) + " &dash;</p>");
      $("#twitter").attr("href", "https://twitter.com/home/?status=" + response.quoteText + ' (' + response.quoteAuthor + ')');
    }
  });
}

$(document).ready(function(){
  new_Quote();
  change_Color();
});

$(".generate").click(function(){
  new_Quote();
  change_Color();
});