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
				$("#password").removeAttr("style");
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
			$("#username").removeAttr("style");
			$("#profileImg").css("background-image", "url(" + imgpath + ")");
			credentialsCheckPassword(pw_input, id);
		} else {	errorLogin("username", "error");	}
	}

	function validateField (field, value){
		if (!value.trim()) {	errorLogin(field, "empty")	}
		else {	credentialsCheckUsername(user_input);	}
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
		$("#"+field).css("border", "thick solid red");
		$("#"+field ).effect( "shake")
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