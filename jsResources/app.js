// Screens
function display(disp) {
	if (disp == "Login") { $("#LoginPanel").animate({width:'toggle'},350) }
	if (disp == "Register") { $("#LoginPanel").animate({width:'toggle'},350); RegistrationPanel(1); }
	if (disp == "Start") { 
		$("#StartScreen").animate({width:'toggle'},350);
		StartScreen(1);
	}
}

$(document).ready(function(){
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

	// Login Scherm

	var attempts = 6;

	$("input.Login#password").keypress(function(e){

		kc = e.keyCode?e.keyCode:e.which;
	 	sk = e.shiftKey?e.shiftKey:((kc == 16)?true:false);
	 	if(((kc >= 65 && kc <= 90) && !sk)||((kc >= 97 && kc <= 122) && sk)) {
	  		$("#caps").fadeIn("fast");
	  	} else {
	  		$("#caps").fadeOut("fast");
	  	}

	})

	function credentialsCheckPassword (value, id) {
		//alert("credentialsCheckPassword " + value + " " + id)
		if (pw_array.indexOf(value) != -1) {
			//alert("check in array")
			if (pw_array.indexOf(value) == id) {
				//alert("zooi klopt")
				confirmCredentials(id);
			}
			else {
				//alert("zooi klopt niet")
				errorLogin("password", "error");
			}
		} else {
			//alert("zooi klopt niet")
			errorLogin("password", "error");
		}
	}

	function errorLogin (field, error) {
		//alert("errorLogin " + field + " " + error)
		attempts--;
		function foutMeldingen (error){
			if (error == "empty") { return "Dit veld moet ingevuld worden"}
			if (error == "error") { return "Dit veld is incorrect"}
		}
		var foutMelding = foutMeldingen(error);

		$("#"+field).css("border", "thick solid red");
		$("<p>" + foutMelding + "</p>").insertAfter("#"+field).addClass("LoginError");
		$("#"+field ).effect( "shake");
		if (field == "username") {	$("#profileImg").removeAttr("style");	}
	}

	function confirmCredentials(value){
		$("#LoginPanel").hide("slide", { direction: "left" }, 350);
		$("#StartScreen").show("slide", { direction: "left" }, 350);
		StartScreen(value);
	}

	function credentialsCheckUsername (value) {
		//alert("credentialsCheckUsername " + value)
		if (user_array.indexOf(value) != -1) {
			var pw_input = $("#password").val();
			var id = user_array.indexOf(value);
			var imgfolder = "imgResources/avatars/";
			var imgpath = imgfolder + img_array[id];
			$("#profileImg").css("background-image", "url(" + imgpath + ")");
			if (focus = "n") {
				credentialsCheckPassword(pw_input, id);
			}
		} else {	errorLogin("username", "error");	}
	}

	function validateField (field, value){
		//alert("validateField " + field + " " + value)
		var user_input = $("#username").val();
		$("#"+field).removeAttr("style");
		if (!value.trim()) {	
			errorLogin(field, "empty")	
		}
		else {	
			if (field == "username") {
				$(".LoginError").css("display", "none")
				credentialsCheckUsername(user_input);
			}
		}
	}

	$("button.Login#Submit").click(function() {
		//alert("submit klik")
		var user_input = $("#username").val();
		var pw_input = $("#password").val();

		validateField("username",user_input);
		validateField("password",pw_input);

		if (attempts == 0) { loginBlocked()	}

	})

	function loginBlocked () {
			$(".Login").attr("disabled", "disabled");
			$("#LoginBlocked").fadeIn("fast");
			$(".Login-form").effect( "shake");
			$(".Login").removeAttr("style");
	     	$(".LoginError").css("display", "none")
			var sec = 30;
			var timer = setInterval(function() { 
	   			$("#LoginBlocked span").text(sec--);
	   			if (sec == -1) {
	     	 		$("#LoginBlocked").fadeOut("fast");
	     	 		$(".Login").removeAttr("disabled");
	  	   			clearInterval(timer);
	  	   			attempts = 6;
	  		 	} 
			}, 1000);
		}

	/* 
		---	LIVE VALIDATIE DIE HET NIET DOET 	---
		$("#username").focusout(function() {
			 	alert("FUncite doe ther!")
			 	var user_input = $("#username").val();
		        validateField("y", "username", user_input)
		    }); 
	*/

	$("button.Login#showRegister").click(function() {

		$("#RegisterPanel").animate({width:'toggle'},350);
		$(".container").css("width", "calc(100% - 860px)");
		$("#LoginPanel").css("opacity", "0.7");
		$(".Login").attr("disabled", "disabled");

	})

	$("button.Registration#hideRegister").click(function() {

		$(".right-panel").hide("slide", { direction: "left" }, 350);
		$(".container").removeAttr("style");
		$("#LoginPanel").css("opacity", "1");
		$(".Login").removeAttr("disabled");	

	})

	// Register

	filledInFields = 8;

	function R_errorLogin(field, error) {
			function foutMeldingen (error){
				if (error == "empty") { return "Dit veld moet ingevuld worden"}
				if (error == "exists") { return "Deze waarde komt al voor in onze database"}
				if (error == "match") { return "De wachtwoorden komen niet overeen"}
			}
			var foutMelding = foutMeldingen(error);

			filledInFields --;
			//$("#e"+thing).css("display", "none");
			$("#"+field).css("border", "thick solid red");
			$("<p>" + foutMelding + "</p>").insertAfter("#"+field).addClass("RegError").attr("id", "e"+field);
			$("#"+field ).effect( "shake")
		}

	function R_credentialsCheck (thing, input) {
		var passwordC_input = $("#r-password2").val();
		
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

	$("button.Register#submit").click(function() {
		var picture_input = $("#r-profilepic").val();
		var surname_input = $("#r-surname").val();
		var lastname_input = $("#r-lastname").val();
		var username_input = $("#r-username").val();
		var mail_input = $("#r-email").val();
		var password_input = $("#r-password").val();
		var passwordC_input = $("#r-password2").val();
		var tos_input = $("#r-tos").prop("checked");

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
	})

	function StartScreen(id) {
		function randomHeader () {
			var randomNumber = Math.floor(Math.random()*headimg_array.length);
			return headimg_array[randomNumber];
		}	

		var headerfolder = "imgResources/header_thumb/" ;
		var headerpath = headerfolder + randomHeader();

		$(".Profile div.headerIMG").css("background-image", "url(" + headerpath + ")");  

		var imgfolder = "imgResources/avatars/";
		var imgpath = imgfolder + img_array[id];
		$("img.Profile#profileImg").attr("src", imgpath);
		$("p.Profile#username span").text("@"+user_array[id]);
		$("p.Profile#name span").text(surname_array[id] + " " + lastname_array[id]);

		$("img.Profile#profileImg").click(function() {
			$("#ProfilePanel").animate({width:'toggle'},350);
			$(".container").css("width", "calc(100% - 860px)");
		});

		$("body").on("click", ".likeButton", function(){
			alert("hoi")
			var likes = $(this).siblings(".middle-panel#StartScreen .posts .post .postLikes .amountLikes").text();
			likes++;
			$(this).siblings(".middle-panel#StartScreen .posts .post .postLikes .amountLikes").text(likes);
		});

		$("body").on("click", ".commentDelete", function(){
			alert("w00t")
			$(this).closest('.postComment').remove();
		});

		$("body").on("click", ".postDelete", function(){
			$(this).closest('.post').remove();
		});

		var volledigeNaam = surname_array[id] + " " + lastname_array[id];

		$("body").on("click", ".postCommentAdd", function(){
			var input = $(this).siblings("input.postCommentInput").val();
			console.log(input);
			var comment = "<div class='postComment'><div class='commentAuthorIMG' style='background-image: url(imgResources/avatars/"+ img_array[id] +");'></div><div class='commentAuthor'>" + volledigeNaam + "</div><div class='commentMessage'>"+ input +"</div><div class='commentDate'>nu</div><div class='commentDelete'>Verwijder reactie</div></div>";
			console.log(comment);
			$(this).parent().siblings(".postComments").append(comment);
			alert("w00t 4");
		});			

	}

})