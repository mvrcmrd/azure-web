
Azure-Web 1.00
---------------

val Copyright (C) 2021
Maria Rodriguez
Lewis University
mariavictoriavrod@lewisu.edu

Azure-web is free software distributed under the GNU LGPL. 
Read LICENSE for more information about license.


This site is hosting, so far, two main pages:
	- A page with personal information
	- A page implementing the popular dice game Yahtzee
There is an initial page that allow you to navigate to these pages.

This pages has been developed directly in HTML, using JavaScript to manage
all the dynamic topics of these pages (JavaScript has been used in Yahtzee game).

Page with personal information.
-------------------------------
This is a static web page with soem personal information and several links to
specifc sites.
In order to homogeneize the look and feel, I have created a css sheet to be
reused in the different web applications that I use.

Yahtzee web page
----------------
In this page, there is a link to another page with the game instructions.
There is a section with the dices and a checkbox that allow us to keep the current value
of this dice in the next roll.
According to the game rules, after three rolls (maximum) you have to select an option
found in the game card.
You cannot repeat an option (the application disable it once it has been selected and remains
disabled until the game is resetted)
The application checks the correctness of your choice and if the choice is wrong
it gives you zero points.
There is a reset button that restarts the game, cleaning input boxes, checkboxes...
	
Usage:
	In order to access the application, launch your preferred web browser and access to the
	initial page. 
	In test environment: http://localhost
	In production: https://azure-web-ercm.azurewebsites.net	

The distribution package contains the following files:

	index.html					- Initial web page linking other pages
	knowing-mvrc.html			- Web page with personal information
	yahtzee-game.html			- Web page implementing Yahtzee game
	yahtzee-instructions.html	- Instructions for Yahtzee game
	README.md					- This file
	LICENSE						- License terms
	css\my-style.css			- Html style file
	js\js_functions.js			- JavaScript functions
	images\dice-x.jpg			- Dices images (x from 1 to 6)
	images\MariaRodriguez.jpg	- My picture
	
Installation
	The application is hosted in Azure Web App. To access it, enter the following URL in a browser:
	https://azure-web-ercm.azurewebsites.net
			
---
Acknowledge:
Dice images have been taken from the site:
https://es.123rf.com/photo_34140429_ilustraci%C3%B3n-de-un-conjunto-de-dados-de-color-rojo.html


End of document
