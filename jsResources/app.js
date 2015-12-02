// Screens
function display(disp) {
	if (disp == "Login") { $("#LoginPanel").css("display", "block") }
	if (disp == "Register") { $("#LoginPanel").css("display", "block"); RegistrationPanel(1); }
	if (disp == "StartScreen") { $("#StartScreen").css("display", "block") }
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

	if (!getQueryVariable("display")) { var screen = "Login"; display(screen); } 
	else { screen = getQueryVariable("display"); display(screen); }
}

// Login Scherm


var attempts = 6;

function Login() {
	// Prompt
	var user_input = $("#username").val();
	var pw_input = $("#password").val();

	// Validation
	function credentialsCheckPassword (value, id) {
		if (pw_array.indexOf(value) != -1) {
			if (pw_array.indexOf(value) == id) {
				confirmCredentials(id);
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

		$("#"+field).css("border", "thick solid red");
		$("#"+field).attr("placeholder", foutMelding);
		$("#"+field ).effect( "shake")
		if (field == "username") {	$("#profileImg").removeAttr("style");	}
	}

	function confirmCredentials(value){
		$("#LoginPanel").css("display", "none")
		$("#StartScreen").css("display", "block")
		StartScreen(value);
	}

	function credentialsCheckUsername (value) {
		if (user_array.indexOf(value) != -1) {
			var id = user_array.indexOf(value);
			var imgfolder = "imgResources/avatars/";
			var imgpath = imgfolder + img_array[id];
			$("#profileImg").css("background-image", "url(" + imgpath + ")");
			credentialsCheckPassword(pw_input, id);
		} else {	errorLogin("username", "error");	}
	}

	function validateField (field, value){
		$("#"+field).removeAttr("style");
		if (!value.trim()) {	errorLogin(field, "empty")	}
		else {	
			if (field == "username") {
				credentialsCheckUsername(user_input);
			}		
		}
	}

	validateField("username",user_input);
	validateField("password",pw_input);

	if (attempts == 0) {
		$(".Login").attr("disabled", "disabled");
		$(".Login-form").effect( "shake");
		alert("Ja nu doettie het niet meer. Jouw schuld");
	}
	
}

function RegistrationPanel (argument){
	if (argument == 1){ // Show
		$(".right-panel").css("display", "block");
		$(".container").css("width", "calc(100% - 860px)");
		$(".Login").attr("disabled", "disabled");
	}
	if (argument == 0) { // Hide
		$(".right-panel").removeAttr("style");
		$(".container").removeAttr("style");
		$(".Login").removeAttr("disabled");
	}
}

// Register

filledInFields = 8;

function Register () {
	

	// INPUT
	var picture_input = $("#r-profilepic").val();
	var surname_input = $("#r-surname").val();
	var lastname_input = $("#r-lastname").val();
	var username_input = $("#r-username").val();
	var mail_input = $("#r-email").val();
	var password_input = $("#r-password").val();
	var passwordC_input = $("#r-password2").val();
	var tos_input = $("#r-tos").prop("checked");

	function R_errorLogin(field, error) {
		filedInFields --;
		alert(filedInFields);
		$("#"+field).css("border", "thick solid red");
		$("#"+field ).effect( "shake")
	}

	function R_credentialsCheck (thing, input) {
		if (thing == "r-username") {
			if (user_array.indexOf(input) != -1) {	R_errorLogin("r-username", "exists")	}
		} if (thing == "r-email") {
			if (mail_array.indexOf(input) != -1) {	R_errorLogin("r-email", "exists")	}
		} if (thing == "r-password") {
			if (input != passwordC_input) {	R_errorLogin("r-password2", "match")	}
		} if (thing == "r-tos") {
			if (input == false) {	$("label").css("border", "thick solid red");	}
		}
	}

	function R_validateField (field, value) {
		$("#"+field).removeAttr("style");
		if (!value) { R_errorLogin(field, "empty")	}
		else {	R_credentialsCheck(field, value);	}
	}

	var rValidateFieldFields =	[	"r-profilepic",	"r-surname",	"r-lastname",	"r-username",	"r-email",	"r-password",	"r-password2",	"r-tos"		];
	var rValidateFieldInput =	[	picture_input,	surname_input,	lastname_input,	username_input,	mail_input,	password_input,	passwordC_input,	tos_input	];

	for (var i = rValidateFieldFields.length - 1; i >= 0; i--) {
		var field = rValidateFieldFields[i];
		var input = rValidateFieldInput[i];
		R_validateField(field, input);
	}

	if (filledInFields == 8) {
		user_array.push(username_input);
		console.log(username_input);
		pw_array.push(password_input);
		console.log(password_input);
		img_array.push(picture_input);
		console.log(picture_input);
		mail_array.push(mail_input);
		console.log(mail_input);
		$("#LoginPanel").css("display", "none");
		$("#StartScreen").css("display", "block");
		// DEZE DOET HET NIET // StartScreen(user_array.length + 1);
	}
}

function StartScreen(id) {
	var a = user_array[id];
	document.getElementById("MessageStartscreen").innerHTML = a;
}