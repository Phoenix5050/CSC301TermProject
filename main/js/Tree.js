var courseArray =[];
var RelArray =[]; 
function generateTree() {
	
	var $ = go.GraphObject.make;
	Tree = $(go.Diagram, "gradTree");
	var nodeDataArray=[{key:"alpha"}, {key:"beta"}];
	var linkDataArray=[{to:"beta", from:"alpha"}];
	Tree.model = new go.GraphLinksModel(nodeDataArray,linkDataArray);


}
function addCourse() {
    //var courses = ["CSC108F3", "CSC148F3", "CSC207F3", "CSC209F3", "CSC301F3", "MAT102F2", "MAT153W1", "STA256W4"]; //list of courses to add
	var courseCode = document.getElementById("code").value;
	var cName = "";
	var cYear = "";
	var cSeason = "";
	var cCampus = "";
	var cDist = "";
	var url = "http://localhost:8080/api/v1/searchCourseTree?course="+courseCode;
	if (courseCode.length==0){
		document.getElementById("courseError").innerHTML = "<p>Course blank/missing</p>";
		return;
	} else {
		//document.getElementById("courseError").innerHTML = "<p></p>";
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
					alert("ERROR"); 
					console.log("Error:"+response.status);  
					return;  
				}
				// Examine the text in the response  
				response.json().then(function(data) {  
					document.getElementById("courseName").innerHTML = "Name:" + data["Name"];
					document.getElementById("courseYear").innerHTML = "Year:" + data["Year"];
					document.getElementById("courseSeason").innerHTML = "Season:" + data["Season"];
					document.getElementById("courseCampus").innerHTML = "Campus:" + data["Campus"];
					document.getElementById("courseDist").innerHTML = "Dist:" + data["Dist"];
					//cName = data["Name"];
					//cYear = data["Year"];
					//cSeason = data["Season"];
					//cCampus = data["Campus"];
					//cDist = data["Dist"];
					//document.getElementById("loginError").innerHTML = "<p>"+data["Name"]+"</p>";
					
				});  
			});
			//alert(courseCode+" "+cName+" "+cYear+" "+cSeason+" "+cCampus+" "+cDist); 
	}
	

    
}
function addCourseDB(code){
	
	
	
}

function dupCourse(courseList, course)
{

}