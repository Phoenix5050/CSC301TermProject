
var courseArray = new Array();
var RelArray =new Array; 
var Courses = new Array; 
var Mod;
var file; 
function generateTree() {
	
	var $ = go.GraphObject.make;
	Tree = $(go.Diagram, "gradTree");
	var simpletemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Ellipse",
        new go.Binding("fill", "color")),
      $(go.TextBlock,
        new go.Binding("text", "key")),
      {
        toolTip:
          $("ToolTip",
            $(go.TextBlock, { margin: 4 },
              new go.Binding("text", "desc"))
          )
      }
    );
	var templmap = new go.Map();
	templmap.add("simple", simpletemplate);
	//diagram.nodeTemplateMap = templmap;
			
	courseArray.push({key:"alpha", color:"orange",category: "simple"});
	courseArray.push({key:"beta", color:"orange", category: "simple"});
	Tree.model = new go.GraphLinksModel(courseArray,RelArray);
	Mod = Tree; 
	file = Tree.model.toJson();
}
function save(){
 file = Mod.model.toJson(); 
}
function load(){
Mod.model = go.Model.fromJson(file); 
}


class Course {

constructor(code, name, year, season, campus, dist){
	this.code = code;
	this.name = name;
	this.year =year;
	this.season =season;
	this.campus =campus;
	this.dist =dist;

}
addCourse(){
	//alert(this.code);
	if(this.dist ="CSC"){
		var temp = {key: String(this.code), color:"red"};
	}
	var temp = {key: String(this.code)};
	Tree.model.addNodeData(temp);
	Courses.push(this);
	
}

}







function addCourse() {
    //var courses = ["CSC108F3", "CSC148F3", "CSC207F3", "CSC209F3", "CSC301F3", "MAT102F2", "MAT153W1", "STA256W4"]; //list of courses to add
	var courseCode = document.getElementById("code").value;
	var course = {};
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
					cName = data["Name"];
					cYear = data["Year"];
					cSeason = data["Season"];
					cCampus = data["Campus"];
					cDist = data["Dist"];
					document.getElementById("courseName").innerHTML = "Name:" + cName;
					document.getElementById("courseYear").innerHTML = "Year:" + cYear;
					document.getElementById("courseSeason").innerHTML = "Season:" + cSeason;
					document.getElementById("courseCampus").innerHTML = "Campus:" + cCampus;
					document.getElementById("courseDist").innerHTML = "Dist:" + cDist;
					var elmt = new Course(courseCode,cName,cYear,cSeason,cCampus,cDist);
					elmt.addCourse(); 
				});  
			});
			 
	}
	

    
}
function addCourseDB(code){
	
	
	
}

function dupCourse(courseList, course)
{

}