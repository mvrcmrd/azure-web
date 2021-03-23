/*************************************************************************************
* Functiopns associated to the Yahtzee game. In order to better understand           *
* this code, this is the set of ids of html elements managed by these functions:     *
*	diceImgx (x from 1 to 5): Image of every dice                                    *
*	diceKeptx: The combobox used to keep the value of this dice in the next roll     *
*	dicex: The input box storing the numerical value of each dice (hidden)           *
*	diceTdx: The cell storing the image of the dice                                  *
*	optx (x from 1 to 13): The different options we can select in every round        *
*	scrx: The cell in the score table to store the scores of every round             *
*	options: Combobox with the different options to select and the last one selected *
*	totals: Input box totalizing the points of the player                            *
*************************************************************************************/


/*
	Controls the number of roll dices before annotating in the game card
	This variable is increased every time dices are rolled and resetted
	when annotations in one of the options (function gameCards ())
	
*/
var num_rolls = 0;

function Initialize() {
	// Clear the 'options' combobox
	document.getElementById('options').value = '';
	HandleDices ();
}

/*****************************************************************************
* Handle a roll. First of all it removes the existing dices and later rolls  *
* dices again if we still have pending tries. If we have already try three   *
* times, an error pop-up window will be launched to state this fact.         *
*****************************************************************************/
function HandleDices() {
	num_rolls += 1;
	if (num_rolls <= 3) {
		// Remove dices (if they exist or are not checked)
		for (var i = 1 ; i <= 5 ; i++) {
			RemoveDice (i);
		}
		// Roll dices
		for (var i = 1 ; i <= 5 ; i++) {
			RollSixSidedDice(i);
		}
	} else {
		alert ("You have only three tries");
	}
}


// Remove a specific dice, if it exists
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

/*****************************************************************************
* Roll a specific dice. The dice will be rolled if the associated combobox   *
* is not checked. After the dice is rolled out, the right image is displayed *
* and the value is stored in the associated hidden input element for further *
* calculations                                                               *
*****************************************************************************/
function RollSixSidedDice(i) {
	// Random number between 1 and 6
	var numberDice = Math.floor(Math.random()*6) + 1;
	// Prepare the identifiers of the dice and the checkbox associated to the dice
	var id = 'dice' + i;
	var diceKept = 'diceKept' + i;
	var diceKeptChecked = document.getElementById(diceKept).checked;
	// If the dice was not reserved from the previous try
	if (!diceKeptChecked) {
		// Store in the input box the numeric value of the dice
		document.getElementById(id).value = numberDice;
		diceImg = 'diceImg' + i;
		// Create the img tag
		var newImage = document.createElement('img');
		newImage.setAttribute ('id', diceImg);
		// Associate the right picture to this img tag
		newImage.src = 'images/dice-' + numberDice + '.jpg';
		var id = 'diceTd' + i;
		// Append this tag to the table where we have all dices
		document.getElementById(id).appendChild (newImage);
	}
}


/*********************************************************************
* This function clears all combobox associated to dices to keep them *
* for next tries.                                                    *
*********************************************************************/
function ClearKepts() {
	var diceKept;
	for (var i = 1 ; i <= 5 ; i++) {
		diceKept = 'diceKept' + i;
		document.getElementById(diceKept).checked = false;
		document.getElementById('roll').focus();
	}
}

/**************************************************************
* This function reset the game. In turn, the function:        *
*	Clear all combobox associated to dices                    *
*	Clear scores table                                        *
*	Enables the different options (disabled during the game)  *
*	Clear options combobox                                    *
*	Clear the total input                                     *
*	Roll dices again                                          *
**************************************************************/
function ResetGame() {
	ClearKepts();
	var scoreTable;
	var optSelect;
	for (var i = 1 ; i <= 13 ; i++) {
		scoreTable = 'scr' + i;
		optSelect = 'opt' + i;
		document.getElementById(scoreTable).value = "";
		document.getElementById(optSelect).disabled = false;
	}
	document.getElementById('options').value = '';
	document.getElementById('totals').value = '';
	num_rolls = 0;
	document.getElementById('roll').focus();
	HandleDices ();
}

/****************************************************************************
* Annotate in the game card the points associated to each option            *     
* Previously, the function verifies that dices fullfil option requirements  *
* If they do not, the function annotates a zero in that option.             *
****************************************************************************/
function gameCards() {
	var opt = parseInt (document.getElementById('options').value, 10);
	var totalPoints = 0;
	switch(opt) {
		case 1:
			// Aces
			totalPoints = DoCalcs (1);
			document.getElementById('scr1').value = totalPoints;
			document.getElementById('opt1').disabled = true;
			break;
		case 2:
			// Twos
			totalPoints = DoCalcs (2);
			document.getElementById('scr2').value = totalPoints;
			document.getElementById('opt2').disabled = true;
			break;
		case 3:
			// Threes
			totalPoints = DoCalcs (3);
			document.getElementById('scr3').value = totalPoints;
			document.getElementById('opt3').disabled = true;
			break;
		case 4:
			// Fours
			totalPoints = DoCalcs (4);
			document.getElementById('scr4').value = totalPoints;
			document.getElementById('opt4').disabled = true;
			break;
		case 5:
			// Fives
			totalPoints = DoCalcs (5);
			document.getElementById('scr5').value = totalPoints;
			document.getElementById('opt5').disabled = true;
			break;
		case 6:
			// Sixes
			totalPoints = DoCalcs (6);
			document.getElementById('scr6').value = totalPoints;
			document.getElementById('opt6').disabled = true;
			break;
		case 7:
			// Three of a Kind
			var results = CheckNumbersOfKind (3);
			var totalPoints = results[0];
			var dicesOK = results[1];
			if (dicesOK == 1) {
				document.getElementById('scr7').value = totalPoints;
			} else {
				document.getElementById('scr7').value = 0;
			}
			document.getElementById('opt7').disabled = true;
			break;
		case 8:
			// Four of a Kind
			var results = CheckNumbersOfKind (4);
			var totalPoints = results[0];
			var dicesOK = results[1];
			if (dicesOK == 1) {
				document.getElementById('scr8').value = totalPoints;
			} else {
				document.getElementById('scr8').value = 0;
			}
			document.getElementById('opt8').disabled = true;
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
				document.getElementById('scr9').value = 0;
			}
			document.getElementById('opt9').disabled = true;
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
				document.getElementById('scr10').value = 0;
			}
			document.getElementById('opt10').disabled = true;
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
				document.getElementById('scr11').value = 0;
			}
			document.getElementById('opt11').disabled = true;
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
				document.getElementById('scr12').value = 0;
			}
			document.getElementById('opt12').disabled = true;
			break;
		case 13:
			// Chance
			totalPoints = DoCalcsChance ();
			document.getElementById('scr13').value = totalPoints;
			document.getElementById('opt13').disabled = true;
			break;
		default:
			// code block
	}
	CalcTotals();
	ClearKepts();
	num_rolls = 0;
	document.getElementById('roll').focus();
}

/**************************************************************
* This function sums the value of every dice that match with  *
* the number point passed in the call                         *
* It is used to compute points in the upper section of the    *
* game card                                                   *
**************************************************************/
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

/**************************************************************
* This function sums the value of every dice for the Chance   *
* option of the lower section of the game card                *
**************************************************************/
function DoCalcsChance () {
	var totalPoints = 0;
	for (var i = 1 ; i <= 5 ; i++) {
		var id = 'dice' + i;
		var valDice = parseInt (document.getElementById(id).value, 10);
		totalPoints += valDice;
	}
	return totalPoints;
}

/**************************************************************
* This function checks whether dice fullfil the numbers of a  *
kind rule specified by the parameter "digit"                  *
**************************************************************/
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

/********************************************************************
* This function calculates the number of dices with a specfic value *
* This information is necessary to check whether dices fullfil the  *
* rules of the lower part of the game card                          *
********************************************************************/
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

/**************************************************************
* This function calculates the sum of points in the game card *
**************************************************************/
function CalcTotals () {
	var valPoints;
	var totalPoints = 0;
	// Check first the Upper Section
	for (var i = 1 ; i <= 6 ; i++) {
		var id = 'scr' + i;
		valPoints = parseInt (document.getElementById(id).value, 10);
		if (!isNaN(valPoints)) {
			totalPoints += valPoints;
		}
	}
	if (totalPoints > 63) {
		totalPoints += 25;
		document.getElementById('upper').value = 25;
	} else {
		document.getElementById('upper').value = 0;
	}
	// Now, let us check the Lower Section
	for (var i = 7 ; i <= 13 ; i++) {
		var id = 'scr' + i;
		valPoints = parseInt (document.getElementById(id).value, 10);
		if (!isNaN(valPoints)) {
			totalPoints += valPoints;
		}
	}
	document.getElementById('totals').value = totalPoints;
}
