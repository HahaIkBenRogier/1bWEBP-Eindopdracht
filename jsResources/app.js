// Screens
function display(disp) {
	if (disp == "Login") { $("#LoginPanel").animate({width:'toggle'},350) }
	if (disp == "Register") { $("#LoginPanel").animate({width:'toggle'},350); RegistrationPanel(1); }
	if (disp == "StartScreen") { $("#StartScreen").animate({width:'toggle'},350) }
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
		$("#LoginPanel").hide("slide", { direction: "left" }, 350);
		$("#StartScreen").show("slide", { direction: "left" }, 350);
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

	function loginBlocked () {
		$(".Login").attr("disabled", "disabled");
		$("#LoginBlocked").fadeIn("fast");
		$(".Login-form").effect( "shake");
		var sec = 30;
		var timer = setInterval(function() { 
   			$("#LoginBlocked span").text(sec--);
   			if (sec == -1) {
     	 		$("#LoginBlocked").fadeOut("fast");
     	 		$(".Login").removeAttr("disabled");
     	 		$(".Login").removeAttr("style");
  	   			clearInterval(timer);
  	   			attempts = 6;
  		 	} 
		}, 1000);

	}

	if (attempts == 0) { loginBlocked()	}
	
}

function RegistrationPanel (argument){
	if (argument == 1){ // Show
		//$(".right-panel").css("display", "block");
		$(".right-panel").animate({width:'toggle'},350);
		$(".container").css("width", "calc(100% - 860px)");
		$(".Login").attr("disabled", "disabled");
	}
	if (argument == 0) { // Hide
		$(".right-panel").hide("slide", { direction: "left" }, 350);
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
		filledInFields --;
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
		pw_array.push(password_input);
		img_array.push(picture_input);
		mail_array.push(mail_input);
		RegistrationPanel(0);
		$("#StartScreen").css("display", "block");
		$("#LoginPanel").removeAttr("style");
		StartScreen(user_array.length - 1);
	}
}

function StartScreen(id) {
	var a = user_array[id];
	document.getElementById("MessageStartscreen").innerHTML = a;

	for (var i = user_array.length - 1; i >= 0; i--) {
		if (i === id) {
			console.log(user_array[i] + " DIT IS HEM!")
		} else {console.log(user_array[i]);}
	}

}