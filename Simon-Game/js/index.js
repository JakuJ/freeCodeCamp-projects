$(function(){
  var sounds = [];
  var sequence = [];
  var clicks = [];
  var timeouts = [];
  var strictEnabled = false;
  var count = 0;
  sounds[0] = new Audio();
  sounds[0].src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
  sounds[1] = new Audio();
  sounds[1].src = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
  sounds[2] = new Audio();
  sounds[2].src = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
  sounds[3] = new Audio();
  sounds[3].src = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
  var darkenAll = function(){
    for(let i = 0; i < 4; i++){
      $(".t"+i).removeClass("light");
    }
  }
  var activate = function(){
    $("button").removeClass("unclickable");
  }
  var deactivate = function(){
    $(".button").addClass("unclickable");
    $("button").addClass("unclickable");
  }
  var purge = function(){
    for(let i = 0; i < timeouts.length; i++){
      clearTimeout(timeouts[i]);
    }
    timeouts = [];
  }
  var toggleStrict = function(){
    if($(".strict_led").hasClass("light")){
      $(".strict_led").removeClass("light");
      strictEnabled = false;
    }
    else{
      $(".strict_led").addClass("light");
      strictEnabled = true;
    }
  }
  var displayCount = function(count){
    if(count == -1) {$("#count").html("--");}
    else if(count <= 9) {$("#count").html("0" + count);}
    else if(count >= 10) {$("#count").html(count);}
  }
  var playSound = function (name){
    sounds[name].currentTime = 0.05;
    sounds[name].play();
  }
  var blink = function(text){
    $("#count").html(text);
      timeouts.push(setTimeout(function(){$("#count").html("");}, 250));
      timeouts.push(setTimeout(function(){$("#count").html(text);}, 500));
      timeouts.push(setTimeout(function(){$("#count").html("");}, 750));
      timeouts.push(setTimeout(function(){displayCount(count)}, 1000));
  }
  var playSequence = function(sequence){
    //take and regain control
    deactivate();
    timeouts.push(setTimeout(function(){
      activate();
      $(".button").removeClass("unclickable");
      darkenAll();
    }, (sequence.length + 1) * 1000));
    //play sounds
    for(let i = 0; i < sequence.length; ++i){
      timeouts.push(setTimeout(function(){
        playSound(sequence[i]);
        if(i == 0){
          darkenAll();
        }
        //lighten up the corresponding button
        $(".t" + sequence[i]).addClass("light");
        //darken it back
        timeouts.push(setTimeout(function(){
            $(".t" + sequence[i]).removeClass("light");}, 800));
        }, 1000 * (i + 1)));
    }
  }
  //God I love recursion
  var nextStep = function(correctLast){
    if(correctLast){ 
      sequence.push(Math.floor(Math.random() * 4));
      count += 1;
      timeouts.push(setTimeout(function(){displayCount(count);}, 1000));
    }
    else{
      //blink -- when error
      blink("--");
    }
    darkenAll();
    timeouts.push(setTimeout(playSequence(sequence), 1000));
    clicks = [];
    $(".button").unbind().mousedown(function(){
      var which = $(this).attr('class').split(/\s+/)[1][1];
      //light up and play sound
      $(".t"+which).addClass("light");
      playSound(which);
      clicks.push(which);
    }).mouseup(function(){
      darkenAll();
      var index = clicks.length - 1;
      //player's mistake
      if(sequence[index] != clicks[index]){
        if(strictEnabled){
          count = 0;
          sequence = [];
          clicks = [];
          purge();
          nextStep(true);
        }
        purge();
        nextStep(false);
      }
      //don't do anything until all clicks are done
      if(clicks.length < sequence.length){
        return;
      }
      else{
        if(clicks.length == 20){
          purge();
          blink("win");
          count = 0;
          sequence = [];
          clicks = [];
          nextStep(true); 
        }
        else{
          purge();
          nextStep(true);
        }
      }
    });
  }
  $("#myonoffswitch").unbind().click(function(){
    if($("#myonoffswitch").prop("checked")){
      activate();
      $("#count").css("color", "#F00");
    }
    else{
      purge();
      deactivate();
      darkenAll();
      if(strictEnabled){
        toggleStrict();
      }
      sequence = [];
      clicks = [];
      count = 0;
      displayCount(-1);
      $("#count").css("color", "#A00");
    }
  });
  $("#start").click(function(){
    if($("#myonoffswitch").prop("checked") == false){
      return;
    }
    $(".button").removeClass("unclickable");
    sequence = [];
    clicks = [];
    count = 0;
    purge();
    darkenAll();
    nextStep(true);
  });
  $("#strict").click(function(){
    toggleStrict();
  });
})