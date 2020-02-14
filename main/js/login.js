/*
var r=require("request");
var txUrl = "http://localhost:7474/";
function cypher(query,params,cb) {
  r.post({uri:txUrl,
          json:{statements:[{statement:query,parameters:params}]}},
         function(err,res) { cb(err,res.body)})
}*/
function handleLogin(){
	var userid = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	
	var query="MATCH (n:User {userid=" + userid + " , password=" + password +"})";  //QUERY TO USE WHEN IMPLEMENTING DATABASE FOR LOGIN FEATURE
	
	if (userid == "admin" && password == "admin"){
		window.location.href = "Course Search.html";
	}
}

function customGender(){
	if (document.querySelector('input[name="gender"]:checked').value == "other"){
		document.getElementById("customGender").innerHTML = "<th style=\"text-align:right;\"></th><td><input type=\"text\" id=\"optgender\" value=\"Gender(Optional)\"/></td>";
	} else {
		document.getElementById("customGender").innerHTML = "";
	}
}