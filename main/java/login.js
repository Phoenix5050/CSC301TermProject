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
		window.location.href = "Course Search.html"
	}
}