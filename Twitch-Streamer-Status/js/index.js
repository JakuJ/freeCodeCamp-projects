var streamers = ["freecodecamp","riotgames","nervarien","terakilobyte","habathcx","RobotCaleb","medrybw","comster404","brunofin","thomasballinger","noobs2ninjas","beohoff","syndicate","summit1g","esl_csgo","nightblue3","sodapoppin"];
var kolor = "",
    card_id = 0;
  function printAll(streamer, info){
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/" + streamer + "?callback=?&client_id=j15r3tcqv1ies1opd4ve46kq74106un",
        dataType: "json",
        data: "",
        success: function(response){
          console.log(response);
          kolor = info != null ? 'rgb(92,184,92)' : 'rgb(217,83,79)';
          card_id = Math.floor(Math.random()*1000000);   
          $("#results").append(
                  "<div class='card' id='"+card_id+"'><div class='row'><div class='col-md-1'>" + (response["logo"] == null ? "<img src='https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png' alt='missing_image'>" : "<img src='" + response["logo"] + "'>") + "</div><div class='col-md-2'><h5>" + response["display_name"] + "</h5></div><div class='col-md-9'><p><b>Status:</b> <a href='"+response["url"]+"'>"+ (response["status"] == null ? "No status available" : response["status"]) +"</a>"+(info != null ? "   <br><b>Streaming:</b> " + "<a href = 'http://lmgtfy.com/?q="+(info.split(' ').join('+'))+"'>" + info + "</p></a>" : "<br><b>Not streaming</b></p>")+"</div></div></div>"
                  );
        $("#"+card_id).css("background", kolor);
        },
        error: function() {
                $("#results").append(
                "<div class='card' style='background-color: rgb(217,83,79);'><div class='row'><div class='col-xs-12'><h6>Streamer '" + streamer + "' has closed their Twitch account or the account never existed</h6></div></div></div>");
               }
    });
    return card_id;
}

function getInfo(streamer, activity){
  $("#results").empty();
  //check if active
  $.getJSON("https://api.twitch.tv/kraken/streams/" + streamer + "?callback=?&client_id=j15r3tcqv1ies1opd4ve46kq74106un", function(response){
    console.log(response);
    switch(activity){
      case 0: printAll(streamer, (response["stream"] != null ? response["stream"]["game"] : null)); break;
      case 1: if(response["stream"] != null){printAll(streamer, response["stream"]["game"]);} break;
      case 2: if(response["stream"] == null){printAll(streamer, null);} break;
    }
  });
}

$(function(){
  $(".btn-primary").click(function(){
    $("#results").empty();
    for(var i = 0; i < streamers.length; i++){
      getInfo(streamers[i], 0);
    }
  })
  $(".btn-success").click(function(){
    $("#results").empty();
    for(var i = 0; i < streamers.length; i++){
      getInfo(streamers[i], 1);
    }
  })
  $(".btn-danger").click(function(){
    $("#results").empty();
    for(var i = 0; i < streamers.length; i++){
      getInfo(streamers[i], 2);
    }
  })
})