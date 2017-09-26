//Why do I have to do this?
$(function(){
  var playerSign, aiSign, randCell;
  var toCheck = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  var check3 = function(c1, c2, c3){
        if($(".cell" + c1).html() == $(".cell" + c2).html() && $(".cell" + c1).html() == $(".cell" + c3).html() && $(".cell" + c2).html() == $(".cell" + c3).html() && ($(".cell" + c1).html() == 'X' || $(".cell" + c1).html() == 'O')){
          return $(".cell" + c1).html();
        }
        else{
          return false;
        }
  }
  var checkEnd = function(){
    for(var i = 0; i < toCheck.length; i++){
        var result = check3(toCheck[i][0], toCheck[i][1], toCheck[i][2]);
        if(result){
          //ended
          $("#board").hide();
          $("#winner").show();
          $("#winner").html(result + '<br>Won!');
          setTimeout(function(){
            $("#winner").hide();
            $("#winner").html("");
            $("#choice").show();
            for(var i = 0; i <= 8; i++){
              $(".cell"+i).html(" ");
            }
          }, 2000);
          return;
        }
    }
    //check for tie
    var tie = true;
    for(var i = 0; i < 9; i++){
      if($(".cell"+i).html() != "X" && $(".cell"+i).html() != "O"){
        tie = false;
      }
    }
    if(tie){
      $("#board").hide();
      $("#winner").show();
      $("#winner").html('Nobody won!');
      setTimeout(function(){
        $("#winner").hide();
        $("#winner").html("");
        $("#choice").show();
        for(var i = 0; i <= 8; i++){
          $(".cell"+i).html(" ");
        }
      }, 2000);
    }
  }
  $("#board").hide();
  $("#winner").hide();
  $("#winner").html("");
  $(".btn-choice").click(function(){
    playerSign = $(this).attr('value');
    aiSign = playerSign == "X" ? "O" : "X";
    $("#choice").hide();
    $("#board").show();
    $(".cell").unbind().click(function(){
      //check if already X or O
      if($(this).html() == 'X' || $(this).html() == 'O'){
        return;
      }
      //player move
      $(this).html(playerSign);
      checkEnd();
      //ai move
      if($("#winner").html() != ""){
        return;
      }
      for(var i = 0; i < 99; i++){
        randCell = Math.floor(Math.random()*9);
        if($(".cell"+randCell).html() != "X" && $(".cell"+randCell).html() != "O"){
          break;
        }
      }
     setTimeout(function(){
       $(".cell"+randCell).html(aiSign);
     },100); 
      setTimeout(function(){
      checkEnd();}, 200);
    });
  });
});