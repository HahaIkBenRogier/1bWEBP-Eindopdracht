// Screens
function display(disp) {
	if (disp == "Login") {
		document.getElementById("LoginPanel").style.display = "block";
	}
	if (disp == "Register") {
		document.getElementById("LoginPanel").style.display = "block";
		RegistrationPanel(1);
	}
	if (disp == "StartScreen") {
		document.getElementById("StartScreen").style.display = "block";
	}
}

function onload() {
	function getQueryVariable(variable) {
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0;i<vars.length;i++) {
	   		var pair = vars[i].split("=");
	        if(pair[0] == variable){return pair[1];}
			}
			return(false);
	}

	if (!getQueryVariable("display")) {
		var screen = "Login";
		display(screen);
	} else {
		screen = getQueryVariable("display");
		display(screen);
	}
}

// Login Scherm

var user_array = 	["Rogier", 							"Hekman", 				"Koning", 			"ErikHekman",			"ThijsWaardenburg", 		"Ronald", 					"RonaldVanEssen", 			"DitIsRogier", 			"RogierWasHier", 				"SNGRS", 			"HahaIkBenRogier"];
var pw_array = 		["qwerty", 							"adalovelace",			"DMC", 				"Webprogammeren",		"WEBP", 					"NGGUU", 					"Koffie", 					"HU", 					"HU", 							"HU", 				"PerryHetVogelbekdier"];
var img_array = 	["Rogier.png", 						"Hekman.jpg", 			"Koning.jpg",		"ErikHekman.jpeg",		"ThijsWaardenburg.jpg", 	"Ronald.jpg", 				"RonaldVanEssen.jpg",		"DitIsRogier.jpg",		"RogierWasHier.jpg", 			"SNGRS.png",		"HahaIkBenRogier.jpg"];
var mail_array =	["rogier.sangers@student.hu.nl",	"erik.hekman@hu.nl",	"Koning@sngrs.com",	"ErikHekman@sngrs.com",	"thijs.waardenburg@hu.nl",	"ronald.vanessen@hu.nl",	"RonaldVanEssen@sngrs.com", "rogier@ditiswijk.nl",	"rogierwashier@facebook.com",	"mail@sngrs.com",	"shf-adm0@sngrs.com"]

var attempts = 6;

function Login() {
	// Prompt
	var user_input = document.getElementById("username").value;
	var pw_input = document.getElementById("password").value;

	// Validation
	function credentialsCheckPassword (value, id) {
		if (pw_array.indexOf(value) != -1) {
			if (pw_array.indexOf(value) == id) {
				confirmCredentials(id);
				document.getElementById("password").removeAttribute("style");
			}
		} else {
			errorLogin("password", "error");
		}
	}
	function errorLogin (field, error) {
		attempts--;
		function foutMeldingen (error){
			if (error == "empty") { return "Dit veld moet ingevuld worden"}
			if (error == "error") { return "Dit veld is incorrect"}
		}
		var foutMelding = foutMeldingen(error);

		document.getElementById(field).style.border = "thick solid red";
		document.getElementById(field).placeholder = foutMelding;
		$( "#"+field ).effect( "shake")
		if (field == "username") {
			document.getElementById('profileImg').removeAttribute("style");
		}
	}
	function confirmCredentials(value){
		document.getElementById("LoginPanel").style.display = "none";
		document.getElementById("StartScreen").style.display = "block";
		StartScreen(value);

	}
	function credentialsCheckUsername (value) {
		if (user_array.indexOf(value) != -1) {
			var id = user_array.indexOf(value);
			var imgpath = "imgResources/avatars/";
			document.getElementById("username").removeAttribute("style");
			document.getElementById('profileImg').style.backgroundImage= "url(" + imgpath + img_array[id] + ")";
			credentialsCheckPassword(pw_input, id);
		} else {
			errorLogin("username", "error");
		}
	}
	function validateField (field, value){
		if (!value.trim()) {
			errorLogin(field, "empty")
		}
		else {
			credentialsCheckUsername(user_input);
		}
	}

	validateField("username",user_input);
	validateField("password",pw_input);

	if (attempts == 0) {
		$( ".Login-form").effect( "shake");
		alert("Ja nu doettie het niet meer");
		document.getElementsByClassName("Login")[1].disabled = "disabled";
		document.getElementsByClassName("Login")[2].disabled = "disabled";
		document.getElementsByClassName("Login")[3].disabled = "disabled";
		document.getElementsByClassName("Login")[4].disabled = "disabled";
	}
	
}

function RegistrationPanel (argument){
	if (argument == 1){ // Show
		document.getElementsByClassName("right-panel")[0].style.display = "block";
		document.getElementsByClassName("container")[0].style.width = "calc(100% - 860px)";
		// Kleuren grijs maken en zorgen dat het duidelijk wordt dat hier niet geklikt kan worden
		document.getElementsByClassName("Login")[1].disabled = "disabled";
		document.getElementsByClassName("Login")[2].disabled = "disabled";
		document.getElementsByClassName("Login")[3].disabled = "disabled";
		document.getElementsByClassName("Login")[4].disabled = "disabled";
	}
	if (argument == 0) { // Hide
		document.getElementsByClassName("right-panel")[0].removeAttribute("style");
		document.getElementsByClassName("container")[0].removeAttribute("style");
		document.getElementsByClassName("Login")[1].removeAttribute("disabled");
		document.getElementsByClassName("Login")[2].removeAttribute("disabled");
		document.getElementsByClassName("Login")[3].removeAttribute("disabled");
		document.getElementsByClassName("Login")[4].removeAttribute("disabled");
	}
}

// Register

function Register () {
	// INPUT
	var picture_input = document.getElementById("r-profilepic").value;
	var surname_input = document.getElementById("r-surname").value;
	var lastname_input = document.getElementById("r-lastname").value;
	var username_input = document.getElementById("r-username").value;
	var mail_input = document.getElementById("r-email").value;
	var password_input = document.getElementById("r-password").value;
	var passwordC_input = document.getElementById("r-password2").value;
	var tos_input = document.getElementById("r-tos").checked;

	function R_errorLogin(field, error) {
		document.getElementById(field).style.border = "thick solid red";
		$( "#"+field ).effect( "shake")
	}

	function R_credentialsCheck (thing, input) {
		if (thing == "username") {
			if (user_array.indexOf(input) != -1) {	R_errorLogin("r-username", "exists")	}
		} if (thing == "email") {
			if (mail_array.indexOf(input) != -1) {	R_errorLogin("r-email", "exists")	}
		} if (thing == "password") {
			if (input != passwordC_input) {	R_errorLogin("r-password2", "match")	}
		} if (thing == "tos") {
			if (input == false) {	document.getElementsByTagName("label")[0].style.border = "thick solid red";	}
		}	
	}

	function R_validateField (field, value) {
		if (!value.trim()) {
			R_errorLogin(field, "empty")
		}
		else {
			R_credentialsCheck("username", username_input);
			R_credentialsCheck("email", mail_input)
			R_credentialsCheck("password", password_input);
			R_credentialsCheck("tos", tos_input)
		}
	}

	R_validateField("r-profilepic", picture_input);
	R_validateField("r-surname", surname_input);
	R_validateField("r-lastname", lastname_input);
	R_validateField("r-username", username_input);
	R_validateField("r-email", mail_input);
	R_validateField("r-password", password_input);
	R_validateField("r-password2", passwordC_input);
	R_validateField("r-tos", tos_input);

}

function StartScreen(id) {
	var a = user_array[id];
	document.getElementById("MessageStartscreen").innerHTML = a;
}