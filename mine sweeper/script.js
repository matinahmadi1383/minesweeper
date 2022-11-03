var level = 1
var cells = [];
var bomb = 2;
var timer=0
var check = [];
var win = 0;
var timeLeft = 10;
var loss = false;
var Elapsed_time=0;
for (var i = 0; i < 100; i++) {
	if(i<bomb)
		cells[i] = true;
	else
		cells[i] = false;
}
for (var i = 0; i < 100; i++) {
	check[i] = false;
}
shuffle(cells);
reloadSell();
var glass_break = new Audio('break2.mp3');
var bomb_play = new Audio('bomb2.mp3');
var boop_play = new Audio('boop2.mp3');
$(function () {
	creat()
	$("#tryAgain").click(function () {
		t=1000;
		starting_timer = false;
		Elapsed_time += timer;
		Elapsed_time-=1;
		if ($("#tryAgain").html()=="tryAgain") {
			alert(`your Elapsed time is:${Elapsed_time}s`);
			Elapsed_time=0;
		}
		timer=0;
		$(".cell").remove();
		shuffle(cells);
		creat()
		$("#tryAgain").css({
			"display":"none"
		})
		$("#result").html("")
		win=0;
		if (level==1) {
			bomb=2;
			timeLeft=10;
		}
		if (level==2) {
			bomb=5;
			timeLeft=50;
		}
		if (level==3) {
			bomb=10;
			timeLeft=100;
		}
		if (level==4) {
			bomb=15;
			timeLeft=200;
		}
		if (level==5) {
			bomb=20;
			timeLeft=300;
		}
		for (var i = 0; i < 100; i++) {
			if(i<bomb)
				cells[i] = true;
			else
				cells[i] = false;
		}
		for (var i = 0; i < 100; i++) {
			check[i] = false;
		}
		$("#Play").css({
			"display":"inline-block"
		})
		$("#timeLeft").css({
			"display":"inline-block"
		})
		loss=false;
		shuffle(cells);
		reloadSell();
		creat();
	})
});
function reloadSell() {
	if (cells[9]==true) {
		shuffle(cells);
		reloadSell();
	}
}
var t = 1000;
var starting_timer = false;
function play_time() {
	setTimeout(function () {
		if (timer>=100)
			$("#time").css({
				"right":"33%"
			})
		else if (timer<100)
			$("#time").css({
				"right":"35%"
			})
		clock(timer);
		if (timer>=timeLeft) {
			t = 9999999999;
			$(".cell[data-bomb=true").html("&#x1F4A3;")
			$(".cell[data-bomb=true").css({
				"background-color":"red"
			});
			$("#tryAgain").css({
				"display":"inline-block"
			})
			$("#result").html("Game Over")
			bomb_play.play();
			$("#tryAgain").html("tryAgain");
			level=1;
			$("#result").html("time out");
			loss=true;
		}
		$("#time").html(timer);
		timer+=1;
		starting_timer = true;
		play_time();
		// if (level==2)
		// 	timer-=0.5;
	},t)
}
function creat() {
	if (timer>=100)
		$("#time").css({
			"right":"33%"
		})
	if (timeLeft>=100)
		$("#time").css({
			"right":"33%"
		})
	$("#time").html(timeLeft);
	clock(timeLeft);
	$(".cell").remove();
	$("#nLevel").html(level);
	$("#nbomb").html(bomb);
	for (var i = 0; i < cells.length; i++) {
		$("#game").append(`<div class="cell" data-bomb="${cells[i]}" data-id="${i}" id="cellsId${i}"></div>`);
	};
	let j = 0;
	for (var i = 0; i < 100; i++) {
		if (i%10==0)
			j++;
		if (j%2==0)
			$(`#cellsId${i}`).css({
				"background-color":"#7eb80d"
			})
		else
			$(`#cellsId${i}`).css({
				"background-color":"#aad751"
			})
		j++;
	}
	$(".cell").click(function () {
		if (loss==false) {
			$("#Play").css({
				"display":"none"
			})
			$("#timeLeft").css({
				"display":"none"
			})
			if (starting_timer == false)
				play_time()
			if ($(this).attr("data-bomb")=="true") {
				t = 9999999999;
				$(".cell[data-bomb=true").html("&#x1F4A3;")
				$(".cell[data-bomb=true").css({
					"background-color":"red"
				});
				$("#tryAgain").css({
					"display":"inline-block"
				})
				$("#result").html("Game Over")
				bomb_play.play();
				$("#tryAgain").html("tryAgain");
				level=1;
				loss=true;
			}
			else
			{
					cellID = parseInt($(this).attr("data-id"));
					var bombs = checkSell(cellID);
					// glass_break.play();
					boop_play.play();
			}
			win = 0;
			for (var i = 0; i < 100; i++) {
				if (check[i]==true)
					win++;
			}
			if (win+bomb==100){
				t = 99999;
				$("#tryAgain").css({
					"display":"inline-block"
				})
				$("#result").html("you Win.good job")
				$(".cell[data-bomb=true").css({
					"background-color":"red"
				});
				$("#tryAgain").html("Next Level")
				$(".cell[data-bomb=true").html("&#x1F4A3;")
				level++;
			}
		}
	})
}
function checkSell(cellID) {
	var bombs = 0;
	if(cellID==0)
	{
		if(cells[cellID+1]==true)
			bombs++;
		if(cells[cellID+10]==true)
			bombs++;
		if(cells[cellID+10+1]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID+1]==false)
				checkSell(cellID+1)
			if(check[cellID+10]==false)
				checkSell(cellID+10)
			if(check[cellID+10+1]==false)
				checkSell(cellID+10+1)
		}
	}
	else if(cellID==9)
	{
		if(cells[cellID-1]==true)
			bombs++;
		if(cells[cellID+10]==true)
			bombs++;
		if(cells[cellID+10-1]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID-1]==false)
				checkSell(cellID-1)
			if(check[cellID+10]==false)
				checkSell(cellID+10)
			if(check[cellID+10-1]==false)
				checkSell(cellID+10-1)
		}
	}
	else if(cellID==90)
	{
		if(cells[cellID+1]==true)
			bombs++;
		if(cells[cellID-10]==true)
			bombs++;
		if(cells[cellID-10+1]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID+1]==false)
				checkSell(cellID+1)
			if(check[cellID-10]==false)
				checkSell(cellID-10)
			if(check[cellID-10+1]==false)
				checkSell(cellID-10+1)
		}
	}
	else if(cellID==99)
	{	
		if(cells[cellID-1]==true)
			bombs++;
		if(cells[cellID-10]==true)
			bombs++;
		if(cells[cellID-10-1]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID-1]==false)
				checkSell(cellID-1)
			if(check[cellID-10]==false)
				checkSell(cellID-10)
			if(check[cellID-10-1]==false)
				checkSell(cellID-10-1)
		}
	}
	else if(cellID>0 && cellID<9)
	{
		if(cells[cellID+1]==true)
			bombs++;
		if(cells[cellID-1]==true)
			bombs++;
		if(cells[cellID+10]==true)
			bombs++;
		if(cells[cellID+10+1]==true)
			bombs++;
		if(cells[cellID+10-1]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID+1]==false)
				checkSell(cellID+1)
			if(check[cellID-1]==false)
				checkSell(cellID-1)
			if(check[cellID+10]==false)
				checkSell(cellID+10)
			if(check[cellID+10+1]==false)
				checkSell(cellID+10+1)
			if(check[cellID+10-1]==false)
				checkSell(cellID+10-1)
		}
	}
	else if(cellID>90 && cellID<99)
	{
		if(cells[cellID+1]==true)
			bombs++;
		if(cells[cellID-1]==true)
			bombs++;
		if(cells[cellID-10]==true)
			bombs++;
		if(cells[cellID-10+1]==true)
			bombs++;
		if(cells[cellID-10-1]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID+1]==false)
				checkSell(cellID+1)
			if(check[cellID-1]==false)
				checkSell(cellID-1)
			if(check[cellID-10]==false)
				checkSell(cellID-10)
			if(check[cellID-10+1]==false)
				checkSell(cellID-10+1)
			if(check[cellID-10-1]==false)
				checkSell(cellID-10-1)
		}
	}
	else if(cellID%10==0)
	{
		if(cells[cellID-10]==true)
			bombs++;
		if(cells[cellID+10]==true)
			bombs++;
		if(cells[cellID+1]==true)
			bombs++;
		if(cells[cellID+1+10]==true)
			bombs++;
		if(cells[cellID+1-10]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID-10]==false)
				checkSell(cellID-10)
			if(check[cellID+10]==false)
				checkSell(cellID+10)
			if(check[cellID+1]==false)
				checkSell(cellID+1)
			if(check[cellID+1+10]==false)
				checkSell(cellID+1+10)
			if(check[cellID+1-10]==false)
				checkSell(cellID+1-10)
		}
	}
	else if(cellID%10==9)
	{
		if(cells[cellID-10]==true)
			bombs++;
		if(cells[cellID+10]==true)
			bombs++;
		if(cells[cellID-1]==true)
			bombs++;
		if(cells[cellID-1+10]==true)
			bombs++;
		if(cells[cellID-1-10]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID-10]==false)
				checkSell(cellID-10)
			if(check[cellID+10]==false)
				checkSell(cellID+10)
			if(check[cellID-1]==false)
				checkSell(cellID-1)
			if(check[cellID-1+10]==false)
				checkSell(cellID-1+10)
			if(check[cellID-1-10]==false)
				checkSell(cellID-1-10)
		}
	}
	else
	{
		if(cells[cellID-1]==true)
			bombs++;
		if(cells[cellID+1]==true)
			bombs++;
		if(cells[cellID-10]==true)
			bombs++;
		if(cells[cellID-10+1]==true)
			bombs++;
		if(cells[cellID-10-1]==true)
			bombs++;
		if(cells[cellID+10]==true)
			bombs++;
		if(cells[cellID+10+1]==true)
			bombs++;
		if(cells[cellID+10-1]==true)
			bombs++;
		check[cellID]=true;
		if (bombs==0) {
			if(check[cellID-1]==false)
				checkSell(cellID-1)
			if(check[cellID+1]==false)
				checkSell(cellID+1)
			if(check[cellID-10]==false)
				checkSell(cellID-10)
			if(check[cellID-10+1]==false)
				checkSell(cellID-10+1)
			if(check[cellID-10-1]==false)
				checkSell(cellID-10-1)
			if(check[cellID+10]==false)
				checkSell(cellID+10)
			if(check[cellID+10+1]==false)
				checkSell(cellID+10+1)
			if(check[cellID+10-1]==false)
				checkSell(cellID+10-1)
		}
	}
	check[cellID]=true;
	$(`#cellsId${cellID}`).html(bombs);
	if (bombs==2)
		$(`#cellsId${cellID}`).css({
			"color":"green"
		});
	else if (bombs==3)
		$(`#cellsId${cellID}`).css({
			"color":"red"
		});
	else if (bombs==4)
		$(`#cellsId${cellID}`).css({
			"color":"magenta"
		});
	else if (bombs==5)
		$(`#cellsId${cellID}`).css({
			"color":"yellow"
		});
	else if (bombs==6)
		$(`#cellsId${cellID}`).css({
			"color":"orange"
		});
	let j = 0;
	for (var i = 0; i <= cellID; i++) {
		if (i%10==0)
			j++;
		if (j%2==0 & i == cellID)
			$(`#cellsId${cellID}`).css({
				"background-color":"#d1d1d1"
			});
		else
			$(`#cellsId${cellID}`).css({
				"background-color":"#a3a2a0"
			});
		j++;
	}
	if (bombs==0)
		$(`#cellsId${cellID}`).html("");
}
function clock(time) {
	if (time == 0)
		$("#clock").html("&#x1F55B;")
	else if (time == 5)
		$("#clock").html("&#x1F550;")
	else if (time == 10)
		$("#clock").html("&#x1F551;")
	else if (time == 15)
		$("#clock").html("&#x1F552;")
	else if (time == 20)
		$("#clock").html("&#x1F553;")
	else if (time == 25)
		$("#clock").html("&#x1F554;")
	else if (time == 30)
		$("#clock").html("&#x1F555;")
	else if (time == 35)
		$("#clock").html("&#x1F556;")
	else if (time == 40)
		$("#clock").html("&#x1F557;")
	else if (time == 45)
		$("#clock").html("&#x1F558;")
	else if (time == 50)
		$("#clock").html("&#x1F559;")
	else if (time == 55)
		$("#clock").html("&#x1F55A;")
	else if (time == 60)
		$("#clock").html("&#x1F55B;")
	else if (time >60)
		clock(time-60);
}
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}