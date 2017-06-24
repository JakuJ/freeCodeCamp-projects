var canvas = document.getElementById('timer');
var ctx = canvas.getContext("2d");
function drawTimer(percent, text, time, kolor){
	//erase
	ctx.clearRect(0, 0, 500, 500);
	//fill
	ctx.strokeStyle = '$333333';
	ctx.fillStyle = kolor;
	ctx.arc(250,250,200,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();
	//rectangle
	ctx.fillStyle = '#333333';
	ctx.fillRect(50, 50, 400, 400 - percent * 400 / 100);
	//border
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 3;

	ctx.arc(250,250,200,0,2*Math.PI);
	ctx.stroke();
	//text
	ctx.fillStyle = 'white';
	ctx.textBaseline="middle";
	ctx.textAlign="center";
	ctx.font = "50px Audiowide";
	ctx.fillText(text, 250, 200);
	ctx.font = "40px Audiowide";
	ctx.fillText(secondsToHms(time), 250, 350);
}
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    ); 
  }
$(document).ready(function(){
	drawTimer(0, "Session", 0, 'gold');
});
var app = angular.module("clock", []);
app.controller('clockCtrl', function($scope, $interval){
	$scope.breakLength = 5;
  $scope.sessionLength = 25;
	var timeLeft = $scope.sessionLength * 60;
	var originalTime = $scope.sessionLength;
  var sessionName = 'Session';
	var runTimer = false;
	$scope.changeBreak = function(delta){
		if($scope.breakLength <= 1 && delta == -1){
			$scope.breakLength = 1;
			return 0;
		}
		$scope.breakLength += delta;
	}
	$scope.changeSession = function(delta){
		if($scope.sessionLength <= 1 && delta == -1){
			$scope.sessionLength = 1;
			return 0;
		}
		$scope.sessionLength += delta;
	}

	$scope.runClock = function(){
    if(!runTimer){
			runTimer = true;
			if(sessionName == 'Session'){
				if(originalTime != $scope.sessionLength){
					originalTime = $scope.sessionLength;
				  timeLeft = originalTime * 60;
				}
			}
			else{
				if(originalTime != $scope.breakLength){
					originalTime = $scope.breakLength;
				  timeLeft = originalTime * 60;
				}
			}	
		}
		else{
			runTimer = false;
			$interval.cancel(running);
		}
		if(runTimer){
			running = $interval(updateTimer, 1000);
		}
  }
	function updateTimer(){
		timeLeft -= 1;
		if(timeLeft < 0){
			changeMode();
		}
		else{
			drawTimer((originalTime * 60 - timeLeft)/(originalTime * 60) * 100, sessionName, timeLeft, sessionName == 'Session' ? '#99CC00' : '#FF4444');
		}
	}
	function changeMode(){
		if(sessionName == 'Session'){
			sessionName = 'Break';
			timeLeft = $scope.breakLength * 60;
		  originalTime = $scope.breakLength;
		}
		else {
			sessionName = 'Session';
			timeLeft = $scope.sessionLength * 60;
		  originalTime = $scope.sessionLength;
		}
	}
});