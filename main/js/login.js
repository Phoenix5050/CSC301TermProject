function handleLogin(){
	var userid = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var userResponse = "";
	var passResponse = "";
	
	var url = "http://localhost:8080/api/v1/checkUser?username="+userid+"&password="+password;
	if (userid.length==0){
		document.getElementById("loginError").innerHTML = "<p>Username blank/missing</p>";
		return;
	} else if (password.length==0){
		document.getElementById("loginError").innerHTML = "<p>Password blank/missing</p>";
		return;
	} else {
		fetch(url, {
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'omit', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		}).then(  
			function(response) {  
				if (response.status !== 200) {  
					console.log("Error:"+response.status);  
					return;  
				}

				// Examine the text in the response  
				response.json().then(function(data) {  
					userResponse = data["UserResponse"];
					passResponse = data["PassResponse"];
					if (userResponse == "incorrect"){
						document.getElementById("loginError").innerHTML = "<p>User does not exist</p>";
					} else if (userResponse == "correct" && passResponse == "incorrect"){
						document.getElementById("loginError").innerHTML = "<p>Incorrect Password</p>";
					} else if (userResponse == "correct" && passResponse == "correct"){
						document.cookie = "username="+userid;
						window.location.href = "Course Search.html";
		}
				});  
			}  
		)
	}
}
function parseCookie(name){
	//REFERENCED FROM: https://www.quirksmode.org/js/cookies.html
	var nameEQ = name + "=";
	var cookieInfo = document.cookie.split(';');
	for(var i=0;i < cookieInfo.length;i++) {
		var c = cookieInfo[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function accountInfo(){
	var username = parseCookie('username');
	
}
function handleRegister(){
	var fname = document.getElementById("firstname").value;
	var lname = document.getElementById("lastname").value;
	var email = document.getElementById("email").value;
	var age = parseInt(document.getElementById("age").value);
	
	var userid = document.getElementById("rusername").value;
	var password = document.getElementById("rpassword").value;
	var cPassword = document.getElementById("confirmPass").value;
	
	var gender = "";
	if (document.querySelector('input[name="gender"]:checked').value == "other"){
		if ((document.getElementById("optgender").value).length == 0){
			gender = "Not Specified";
		} else {
			gender = document.getElementById("optgender").value;
		}
	} else {
		gender = document.querySelector('input[name="gender"]:checked').value;
	}
	
	if (fname.length==0 || lname.length==0 || email.length==0 || age.length==0){
		document.getElementById("registerError").innerHTML = "<p>Unable to Register: Missing/Blank Information</p>";
		return;
	} else if (userExists() == true){
		document.getElementById("registerError").innerHTML = "<p>Username already exists</p>";
		return;
	} else {
		if (password != cPassword){
			document.getElementById("registerError").innerHTML = "<p>Passwords do not match</p>";
			return;
		} else if (password.length == 0){
			document.getElementById("registerError").innerHTML = "<p>Password empty</p>";
			return;
		} else {
			var url = "http://localhost:8080/api/v1/addUser";
			var data = {
						"fname": fname,
						"lname": lname,
						"email": email,
						"username": userid,
						"password": password,
						"gender": gender,
						"age": age};
			fetch(url, {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'omit', // include, *same-origin, omit
				body: JSON.stringify(data),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then((data) => {
				console.log(data); 
			});
		}
	}
}

function userExists(){
	var userid = document.getElementById("rusername").value;
	var password = "checker";
	var userResponse = "";
	var passResponse = "";
	
	var url = "http://localhost:8080/api/v1/checkUser?username="+userid+"&password="+password;
	
	fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'omit', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	}).then(  
        function(response) {  
            if (response.status !== 200) {  
                console.log("Error:"+response.status);  
                return;  
            }

            // Examine the text in the response  
            response.json().then(function(data) {  
				userResponse = data["UserResponse"];
				if (userResponse == "correct"){
					return true;
				} else {
					return false;
				}
            });  
        }  
    )
}

function customGender(){
	if (document.querySelector('input[name="gender"]:checked').value == "other"){
		document.getElementById("customGender").innerHTML = "<th style=\"text-align:right;\"></th><td><input type=\"text\" id=\"optgender\" value=\"Gender(Optional)\"/></td>";
		return true;
	} else {
		document.getElementById("customGender").innerHTML = "";
		return false;
	}
}