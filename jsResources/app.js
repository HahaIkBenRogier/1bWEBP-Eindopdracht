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
		console.log(field + " -- " + value)
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
			$("#StartScreen").css("display", "block");
			$("#LoginPanel").removeAttr("style");
			StartScreen(user_array.length - 1);
			$(".right-panel").hide("slide", { direction: "left" }, 350);
		}
	})

	function StartScreen(id) {
		$(".menuItems").show()
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
			$(".right-panel").hide("slide", { direction: "left" }, 350);
			$("#ProfilePanel").animate({width:'toggle'},350);
			$(".container").css("width", "calc(100% - 860px)");
		});

		$("button.Profile#ProfileEdit").click(function() {
			$(".right-panel").hide("slide", { direction: "left" }, 350);
			$("#ProfilePanel").animate({width:'toggle'},350);

			$(".container").css("width", "calc(100% - 860px)");
		})

		var volledigeNaam = surname_array[id] + " " + lastname_array[id];

		$("button.newPost#postStatus").on("click", function(){
			var status = $("#writeStatus").val();
			var toevoegen = "<div class='post'><div class='postAuthorIMG' style='background-image: url(imgResources/postAvatars/" + img_array[id] + ");'></div><div class='postAuthor'>"+ volledigeNaam +"</div><div class='postDate'>nu</div><div class='postMessage'>"+status+"</div><div class='postLikes'>	<div class='likeButton'>Duim!</div>	<div class='amountLikes'>0</div></div><div class='postDelete'>Verwijder bericht</div><div class='postCommentInput'><input type='text' class='postCommentInput'></input><button class='postCommentAdd'>Reageren</button></div><div class='postComments'></div></div>";
			$(".posts").prepend(toevoegen);
			var amountPosts = $(".middle-panel#StartScreen .Profile .Statsbar #messages span").text();
			amountPosts++;
			$(".middle-panel#StartScreen .Profile .Statsbar #messages span").text(amountPosts);
			$("#writeStatus").removeAttr("value");
		});

		$("body").on("click", ".likeButton", function(){
			var likes = $(this).siblings(".middle-panel#StartScreen .posts .post .postLikes .amountLikes").text();
			likes++;
			$(this).siblings(".middle-panel#StartScreen .posts .post .postLikes .amountLikes").text(likes);
		});

		$("body").on("click", ".commentDelete", function(){
			$(this).closest('.postComment').remove();
		});

		$("body").on("click", ".postDelete", function(){
			$(this).closest('.post').remove();
			var amountPosts = $(".middle-panel#StartScreen .Profile .Statsbar #messages span").text();
			amountPosts--;
			$(".middle-panel#StartScreen .Profile .Statsbar #messages span").text(amountPosts);
		});

		$("body").on("click", ".postCommentAdd", function(){
			var input = $(this).siblings("input.postCommentInput").val();
			var comment = "<div class='postComment'><div class='commentAuthorIMG' style='background-image: url(imgResources/commentAvatars/"+ img_array[id] +");'></div><div class='commentAuthor'>" + volledigeNaam + "</div><div class='commentMessage'>"+ input +"</div><div class='commentDate'>nu</div><div class='commentDelete'>Verwijder reactie</div></div>";
			$(this).parent().siblings(".postComments").prepend(comment);
		});		

		$(".right-panel#ProfilePanel img#coverPhoto").attr("src", headerpath);	
		$(".right-panel#ProfilePanel img#coverPhoto").click(function() {

			function newRandomHeader () {
				var randomNumber = Math.floor(Math.random()*headimg_array.length);
				return headimg_array[randomNumber];
			}	
			var newHeaderfolder = "imgResources/header_thumb/" ;
			var newHeaderpath = newHeaderfolder + newRandomHeader();
			$(".right-panel#ProfilePanel img#coverPhoto").attr("src", newHeaderpath);	
		})
		$(".right-panel#ProfilePanel button#saveCover").click(function() {
			var newHeaderIMG = $(".right-panel#ProfilePanel img#coverPhoto").attr("src");
			$(".Profile div.headerIMG").css("background-image", "url(" + newHeaderIMG + ")");  
		})

		$(".right-panel#ProfilePanel img#profilePhoto").attr("src", imgpath);	
		$(".right-panel#ProfilePanel img#profilePhoto").click(function() {

			function newRandomProfile () {
				var randomNumber = Math.floor(Math.random()*img_array.length);
				return img_array[randomNumber];
			}	
			var newProfilefolder = "imgResources/avatars/" ;
			var newProfilepath = newProfilefolder + newRandomProfile();
			$(".right-panel#ProfilePanel img#profilePhoto").attr("src", newProfilepath);	
		})
		$(".right-panel#ProfilePanel button#saveProfile").click(function() {
			var newHeaderIMG = $(".right-panel#ProfilePanel img#profilePhoto").attr("src");
			$("img.Profile#profileImg").attr("src", newHeaderIMG); 
		})

	}

	$(".menuItems #openFriends").click(function () {
		$(".right-panel").hide("slide", { direction: "left" }, 350);
		Friendspanel();
	})

	$(".menuItems #openTimeline").click(function () {
		$(".right-panel").hide("slide", { direction: "left" }, 350);
	})

	$(".menuItems #openMessages").click(function () {
		$(".right-panel").hide("slide", { direction: "left" }, 350);
		MessagesPanel();
	})

	function Friendspanel () {
		$(".right-panel#FriendsList").animate({width:'toggle'},350);
		$(".container").css("width", "calc(100% - 860px)");

		var i = 0;
		while(i < 8) {
			var randomFollowing = Math.floor(Math.random()*user_array.length);
			var Followinguser = user_array[randomFollowing];
			var Followingname = surname_array[randomFollowing] + " " + lastname_array[randomFollowing];
			var Follwingdiv = "<div class='following' id='followingmain'><div class='following' id='followingnames'><span>" + Followingname + "</span> " + Followinguser + "</div><div class='following' id='followingbutton'><div class='following button on'>Volgend!</div><div class='following button off' style='display: none;'>Volgen!</div></div></div>";
			$("#friends-here").prepend(Follwingdiv);
			i++;
		}

		$("body").on("click",".following.button", function () {
			$(this).parent().children("div").toggle()
		})

	}

	function MessagesPanel () {
		$(".right-panel#MessagesPanel").animate({width:'toggle'},350);
		for (var i = user_array.length - 1; i >= 0; i--) {
			var Msgdiv =  "<div>" + surname_array[i] + " " + lastname_array[i] + "</div>";
			$(".PeopleToMessageWith").append(Msgdiv);
		}

		$(".convo button").click(function() {
			var msgText = $(".convo textarea#msgfield").val();
			var msgDiv = "<div class='convo msg right'><span>" + msgText + "</span></div>";
			$(".convo div.convo-field").prepend(msgDiv);
		})
	}

})