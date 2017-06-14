function searchWikipedia (input){
  $("wikipedia-results").empty();
  $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(input) + "&callback=?", function(data){
    if(data[1].length == 0){
      $("#wikipedia-results").html("<div><p>There were no results matching the query.</p><p>The page <strong>\"" + input + "\"</strong> does not exist. You can <a href='https://en.wikipedia.org/wiki/Wikipedia:Articles_for_creation' target='_blank' rel='noopener noreferrer'>ask for it to be created.</a></p><ul><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></ul></div>");
    }
    else{
      $("#wikipedia-results").html("<h3>Results:<br></h3>");
    }
    for(var i = 0; i < data[1].length; i++){
          $("#wikipedia-results").append("<div class='card card-" + i + "'></div>");
          $(".card-"+i).append("<div class='card-content card-content-" + i + "'></div>");
          $(".card-content-"+i).append("<h4>" + data[1][i] + "</h4>");
          $(".card-content-"+i).append("<p>" + data[2][i] + "</p>");
          if(data[2][i].length == 0){
            $(".card-content-"+i).append("<p><i>No description available.</i></p>");
          }
          $(".card-"+i).append("<div class='card-link card-link-" + i + "'></div>");
          $(".card-link-"+i).append("<a href='" + data[3][i] + "' target='_blank' rel='noopener noreferrer'>read more </a>");
          $(".card-link-"+i).append("<a href='https://en.wikipedia.org/w/index.php?title=" + encodeURI(data[1][i]) + "&action=edit' target='_blank' rel='noopener noreferrer'>edit source</a>");
        }
      });
      $("#wikipedia-results").show();
}

$(function() {
      $("#submit").click(function(){
             searchWikipedia($("#wikipediaText").val());
      });
      $("#wikipediaText").keyup(function(event){
        if(event.keyCode == 13){
          $("#submit").click();
        }
      });
});