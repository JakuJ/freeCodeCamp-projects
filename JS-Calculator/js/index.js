var ced = false,
    aced = true,
    evaled = false,
    red = "#DD1100",
    green = "rgb(81,140,85)";

function reduceHistory(history){
  var history_arr = history.split('');
  while(true){
    if(((history_arr[history_arr.length - 1] <= 9 && history_arr[history_arr.length - 1] >= 0) || history_arr[history_arr.length - 1] == '.') && history.match(/[+-/×]/g) && history_arr.length){
      history_arr.pop();
    }
    else{
      break;
    }
  }
  return history_arr.join('');
}

function roundResult(result){
  var eindex = result.toString().indexOf('e');
  if(eindex == -1 && result.toString().length >= 15){
    result = result.toExponential();
  }
  result = result.toString().split('');
  eindex = result.indexOf('e');
  while(eindex != -1 && result.length >= 16){
    result.splice(eindex-1, 1);
    eindex = result.indexOf('e');
  }
  return result.join('').replace(/\.0+e\+0/,"");
}

$(function(){
  $("button").click(function(){
    var value = $(this).attr("value");
    var last = document.getElementById("current").innerHTML;
    var history = document.getElementById("history").innerHTML;
    $("#history").css("color", green);
    if((last.length >= 16 || history.length >= 35) && !value.match(/[+-/x=]/)){
      $("#history").css("color", red);
      $("#history").html("DIGIT LIMIT MET");
      $("#current").html("0");
      return 0;
    }
    switch(value){
      case "ac":{
        $("#history").html("0");
        aced = true;
      }
      case "ce":{
        $("#current").html("0");
        ced = aced == true ? false : true;
        if(!aced){   
          $("#history").html(reduceHistory(history));
        }
        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":{
        if(evaled){
          $("#current").html("0");
          $("#history").html("");
          last = "0";
          history = "0";
          evaled = false;
        }
        if(value == '.' && last.toString().match(/\./g)){
          break;
        }
        if((last == '0' && value != '.') || last == "+" || last == "-" || last == "x" || last == "/"){
          $("#current").empty();
          if((aced == true && ced == false) || history == "DIGIT LIMIT MET") $("#history").empty();
        }
        $("#current").append(value);
    $("#history").append(value);
        aced = false;
        ced = false;
        break;
      }
      case "+":
      case "-":
      case "/":
      case "x": {
        if(evaled){         $("#history").html(document.getElementById("current").innerHTML);
          evaled = false;
        }
        $("#current").html(value);
        if(!history[history.length - 1].match(/[+-/x]/)){
          $("#history").append(value);
        }
        else{
          history = history.split('');
          history.pop();
          $("#history").html(history.join(''));
          $("#history").append(value);
        }
        break;
      }
      case "=":{
        if(last.match(/[+x/-]/) || history.match(/([+x/-]\.)$/)){
          break;
        }
        try{
          $("#current").html(roundResult(eval(history.replace(/x/g,"*"))));
        }
        catch(e){
          $("#current").html("What?!");
        }
        finally{
          evaled = true;
          break;
        }  
      }
   }
}
);});