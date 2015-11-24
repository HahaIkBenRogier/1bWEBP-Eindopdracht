// Login Scherm
	function Login() {
		// Variables
		var user_array = "Rogier";
		var pw_array = "1234";
		var img_array = "imgResources/Rogier.png";

		// Prompt
		var user_input = document.getElementById("username").value;
		var pw_input = document.getElementById("password").value;

		// Validation
		function errorLogin (field, error) {
			console.log("errorLogin getriggerd");
			if (field == "username") {
				console.log("errorLogin username");
				document.getElementById("username").style.border = "thick solid red";
				document.getElementById('profileImg').removeAttribute("style");
				if (error == "empty") {
					console.log("errorLogin username empty");
					document.getElementById("username-empty").style.display = "block";
					document.getElementById("username-error").style.display = "none";
				}
				if (error == "error") {
					console.log("errorLogin username error");
					document.getElementById("username-error").style.display = "block";
					document.getElementById("username-empty").style.display = "none";
				}
			}
			if (field == "password") {
				console.log("errorLogin password");
				document.getElementById("password").style.border = "thick solid red";
				if (error == "empty") {
					console.log("errorLogin password empty");
					document.getElementById("password-empty").style.display = "block";
					document.getElementById("password-error").style.display = "none";
				}
				if (error == "error") {
					console.log("errorLogin password error");
					document.getElementById("password-error").style.display = "block";
					document.getElementById("password-empty").style.display = "none";
				}
			}
		}
		function confirmCredentials(name, value){
			console.log("confirmCredentials");
			window.location.href = "http://stackoverflow.com";
		}
		function credentialsCheck (name, value) {
			console.log("credentialsCheck");
			if (name == "username") {
				console.log("credentialsCheck username");
				if (value == user_array) {
					console.log("credentialsCheck username goed");
					document.getElementById("username-error").style.display = "none";
					document.getElementById("username-empty").style.display = "none";
					document.getElementById("username").removeAttribute("style");
					document.getElementById('profileImg').style.backgroundImage= "url(" + img_array + ")";
					credentialsCheck("password", pw_input);
				} else {
					console.log("credentialsCheck username else");
					errorLogin(name, "error");
				}
			}
			if (name == "password") {
				console.log("credentialsCheck password");
				if (value == pw_array) {
					console.log("credentialsCheck password goed");
					confirmCredentials("username", user_input);
					document.getElementById("password").removeAttribute("style");
					document.getElementById("password-error").style.display = "none";
					document.getElementById("password-empty").style.display = "none";
				} else {
					console.log("credentialsCheck password else");
					errorLogin(name, "error");
				}
			}
		}
		function validateField (field, value){
			console.log("validateField");
			if (!value.trim()) {
				console.log(field + " leeg validateField")
				errorLogin(field, "empty")
			}
			else {
				console.log("Joe validateField");
				credentialsCheck("username", user_input);
			}
		}

		validateField("username",user_input);
		validateField("password",pw_input);
		
	}

	function RegistrationPanel (argument){
		if (argument == 1){ // Show
			document.getElementsByClassName("re-panel")[0].style.display = "block";
			document.getElementsByClassName("c-panel")[0].style.width = "calc(100% - 860px)";
			// Kleuren grijs maken en zorgen dat het duidelijk wordt dat hier niet geklikt kan worden
			document.getElementsByClassName("Login")[1].disabled = "disabled";
			document.getElementsByClassName("Login")[2].disabled = "disabled";
			document.getElementsByClassName("Login")[3].disabled = "disabled";
			document.getElementsByClassName("Login")[4].disabled = "disabled";
		}
		if (argument == 0) { // Hide
			document.getElementsByClassName("re-panel")[0].removeAttribute("style");
			document.getElementsByClassName("c-panel")[0].removeAttribute("style");
			document.getElementsByClassName("Login")[1].removeAttribute("disabled");
			document.getElementsByClassName("Login")[2].removeAttribute("disabled");
			document.getElementsByClassName("Login")[3].removeAttribute("disabled");
			document.getElementsByClassName("Login")[4].removeAttribute("disabled");
		}
	}

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

		console.log(picture_input);
		console.log(surname_input);
		console.log(lastname_input);
		console.log(username_input);
		console.log(mail_input);
		console.log(password_input);
		console.log(passwordC_input);
		console.log(tos_input);

	}