function handleLogin(){
	var userid = document.getElementById("username").value;
	var password = document.getElementById("password").value;
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
                passResponse = data["PassResponse"];
				if (userResponse == "incorrect"){
					document.getElementById("loginError").innerHTML = "<p>User does not exist</p>";
				} else if (userResponse == "correct" && passResponse == "incorrect"){
					document.getElementById("loginError").innerHTML = "<p>Incorrect Password</p>";
				} else if (userResponse == "correct" && passResponse == "correct"){
					window.location.href = "Course Search.html";
	}
            });  
        }  
    )
    .catch(function(err) {  
        document.write('Fetch Error :-S', err);  
    });
	
	
	/* var loginRequest = new XMLHttpRequest();
	loginRequest.open('GET', url, true);
	loginRequest.setRequestHeader("Content-Type", "plain/text");
	loginRequest.onload = function(){
		if (loginRequest.status == 200){
			var check = JSON.parse(loginRequest.response);
			userResponse = check["UserResponse"];
			passResponse = check["PassResponse"];
		} else {
			console.log(`error ${loginRequest.status}`);
		}
	}
	loginRequest.send();
	 */

}

function customGender(){
	if (document.querySelector('input[name="gender"]:checked').value == "other"){
		document.getElementById("customGender").innerHTML = "<th style=\"text-align:right;\"></th><td><input type=\"text\" id=\"optgender\" value=\"Gender(Optional)\"/></td>";
	} else {
		document.getElementById("customGender").innerHTML = "";
	}
}