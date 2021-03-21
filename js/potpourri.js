function Initialize() {
	// Clear the 'options' combobox
	document.getElementById('options').value = '';
	HandleDices ();
}

function HandleDices() {
	// Remove dices (if they exist or are not checked)
	for (var i = 1 ; i <= 5 ; i++) {
		RemoveDice (i);
	}
	for (var i = 1 ; i <= 5 ; i++) {
		RollSixSidedDice(i);
	}
}

function RemoveDice(i) {
	var diceKept = 'diceKept' + i;
	var diceImg = 'diceImg' + i;
	var existImage = document.getElementById(diceImg);
	if (existImage != null) {
		var diceKeptChecked = document.getElementById(diceKept).checked;
		if (!diceKeptChecked) {
			existImage.remove ();
		}
	}
}

function RollSixSidedDice(i) {
	var numberDice = Math.floor(Math.random()*6) + 1;
	var id = 'dice' + i;
	var diceKept = 'diceKept' + i;
	var diceKeptChecked = document.getElementById(diceKept).checked;
	if (!diceKeptChecked) {
		document.getElementById(id).value = numberDice;
		diceImg = 'diceImg' + i;
		var newImage = document.createElement('img');
		newImage.setAttribute ('id', diceImg);
		newImage.src = 'images/dice-' + numberDice + '.jpg';
		var id = 'diceTd' + i;
		document.getElementById(id).appendChild (newImage);
	}
}

function ClearKepts() {
	var diceKept;
	for (var i = 1 ; i <= 5 ; i++) {
		diceKept = 'diceKept' + i;
		document.getElementById(diceKept).checked = false;
	}
}

function ResetGame() {
	ClearKepts();
	var scoreTable;
	for (var i = 1 ; i <= 13 ; i++) {
		scoreTable = 'scr' + i;
		document.getElementById(scoreTable).value = "";
	}
	document.getElementById('options').value = '';
	document.getElementById('totals').value = '';
	HandleDices ();
}

function gameCards() {
	var opt = parseInt (document.getElementById('options').value, 10);
	var totalPoints = 0;
	switch(opt) {
		case 1:
			// Aces
			totalPoints = DoCalcs (1);
			document.getElementById('scr1').value = totalPoints;
			break;
		case 2:
			// Twos
			totalPoints = DoCalcs (2);
			document.getElementById('scr2').value = totalPoints;
			break;
		case 3:
			// Threes
			totalPoints = DoCalcs (3);
			document.getElementById('scr3').value = totalPoints;
			break;
		case 4:
			// Fours
			totalPoints = DoCalcs (4);
			document.getElementById('scr4').value = totalPoints;
			break;
		case 5:
			// Fives
			totalPoints = DoCalcs (5);
			document.getElementById('scr5').value = totalPoints;
			break;
		case 6:
			// Sixes
			totalPoints = DoCalcs (6);
			document.getElementById('scr6').value = totalPoints;
			break;
		case 7:
			// Three of a Kind
			var results = CheckNumbersOfKind (3);
			var totalPoints = results[0];
			var dicesOK = results[1];
			if (dicesOK == 1) {
				document.getElementById('scr7').value = totalPoints;
			} else {
				alert ('Wrong Choice');
			}
			break;
		case 8:
			// Four of a Kind
			var results = CheckNumbersOfKind (4);
			var totalPoints = results[0];
			var dicesOK = results[1];
			if (dicesOK == 1) {
				document.getElementById('scr8').value = totalPoints;
			} else {
				alert ('Wrong Choice');
			}
			break;
		case 9:
			// Full House
			// First check that dices match the "Full House" rule
			var arrayInt = CountDices ();
			var id;
			var valDice;
			var i = 0;
			var dicesOK = 0;
			var two = false;
			var three = false;
			while (i < 6 && dicesOK == 0) {
				if (arrayInt[i] == 2) {
					two = true;
				} else if (arrayInt[i] == 3){
					three = true;
					i++;
				}
				if (two && three) {
					dicesOK = 1;
				} else {
					i++;
				}
			}
			if (dicesOK == 1) {
				document.getElementById('scr9').value = 25;
			} else {
				alert ('Wrong Choice');
			}
			break;
		case 10:
			// Small Straight
			// First check that dices match the "Small Straight" rule
			var arrayInt = CountDices ();
			if ((arrayInt[0] >= 1 && arrayInt[1] >= 1 && arrayInt[2] >= 1 && arrayInt[3] >= 1) ||
				(arrayInt[1] >= 1 && arrayInt[2] >= 1 && arrayInt[3] >= 1 && arrayInt[4] >= 1) ||
				(arrayInt[2] >= 1 && arrayInt[3] >= 1 && arrayInt[4] >= 1 && arrayInt[5] >= 1)) {
				document.getElementById('scr10').value = 30;
			} else {
				alert ('Wrong Choice');
			}
			break;
		case 11:
			// Large Straight
			// First check that dices match the "Large Straight" rule
			var arrayInt = CountDices ();
			if ((arrayInt[0] >= 1 && arrayInt[1] >= 1 && arrayInt[2] >= 1 && 
				arrayInt[3] >= 1 && arrayInt[4] >= 1) || (arrayInt[1] >= 1 && 
				arrayInt[2] >= 1 && arrayInt[3] >= 1 && arrayInt[4] >= 1 && arrayInt[4] >= 1)) {
				document.getElementById('scr11').value = 40;
			} else {
				alert ('Wrong Choice');
			}
			break;
		case 12:
			// Yahtzee
			// First check that dices match the "Yahtzee" rule
			var results = CheckNumbersOfKind (5);
			var totalPoints = results[0];
			var dicesOK = results[1];
			if (dicesOK == 1) {
				document.getElementById('scr12').value = 50;
			} else {
				alert ('Wrong Choice');
			}
			break;
		case 13:
			// Chance
			totalPoints = DoCalcsChance ();
			document.getElementById('scr13').value = totalPoints;
			break;
		default:
			// code block
	}
	CalcTotals();
}

function DoCalcs (points) {
	var totalPoints = 0;
	for (var i = 1 ; i <= 5 ; i++) {
		var id = 'dice' + i;
		var valDice = document.getElementById(id).value;
		if (valDice == points) {
			totalPoints += points;
		}
	}
	return totalPoints;
}

function DoCalcsChance () {
	var totalPoints = 0;
	for (var i = 1 ; i <= 5 ; i++) {
		var id = 'dice' + i;
		var valDice = parseInt (document.getElementById(id).value, 10);
		totalPoints += valDice;
	}
	return totalPoints;
}

function CheckNumbersOfKind (digit) {
	// First check that dices match the "Three of a Kind" rule
	var id;
	var valDice;
	var totalPoints = 0;
	var arrayInt = [0, 0, 0, 0, 0, 0];
	for (var i = 1 ; i <= 5 ; i++) {
		id = 'dice' + i;
		valDice = parseInt (document.getElementById(id).value, 10);
		totalPoints += valDice;
		arrayInt[valDice-1] += 1;
	}
	var i = 0;
	var dicesOK = 0;
	while (i < 6 && dicesOK == 0) {
		if (arrayInt[i] >= digit) {
			dicesOK = 1;
		} else {
			i++;
		}
	}
	return [totalPoints, dicesOK];
}

function CountDices () {
	var id;
	var valDice;
	var arrayInt = [0, 0, 0, 0, 0, 0];
	for (var i = 1 ; i <= 5 ; i++) {
		id = 'dice' + i;
		valDice = parseInt (document.getElementById(id).value, 10);
		arrayInt[valDice-1] += 1;
	}
	return arrayInt;
}

function CalcTotals () {
	var valPoints;
	var totalPoints = 0;
	for (var i = 1 ; i <= 13 ; i++) {
		var id = 'scr' + i;
		valPoints = parseInt (document.getElementById(id).value, 10);
		if (!isNaN(valPoints)) {
			totalPoints += valPoints;
		}
	}
	document.getElementById('totals').value = totalPoints;
}

function DoCalculations() {
    x = document.getElementById("xID").value;
    y = document.getElementById("yID").value;
    console.log("x="+x+" and y="+y);

    x = Number(x);
    y = Number(y);

    sum = x+y;
    difference = x-y;
    product = x*y;
    quotient = x/y;
    test = "2" + 5;

    mathResults = "sum="+sum+"<br>";
    mathResults += "difference="+difference+"<br>";
    mathResults += "product="+product+"<br>";
    mathResults += "quotient="+quotient+"<br>";
    mathResults += "test="+test+"<br>";
    document.getElementById("mathResultsID").innerHTML = mathResults;

    var a = 7;
    var b = 2;
    if (a  == b || a > 5) {
        console.log("123");
        if (b > 3 && a < 8) {
            console.log("456");
        } else {
            console.log("789");
        }
        if (a+b > 9)
        console.log("10");
    }
}