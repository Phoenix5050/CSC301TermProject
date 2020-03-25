function generateTable() {
    for (var i = 1; i < 6; i++){
        var row = document.getElementById(i);
        for (var j = 0; j < 8; j++){
            var cell = row.insertCell(j);
            cell.value = 0;
            cell.innerHTML = "________"
        }
    }
}
function addCourse() {
    var courses = ["CSC108F3", "CSC148F3", "CSC207F3", "CSC209F3", "CSC301F3", "MAT102F2", "MAT153W1", "STA256W4"]; //list of courses to add
    while (courses.length > 0){
        var c = courses.pop();
        var year = c.charAt(c.length - 1); // the year of the course
        var sem = c.charAt(c.length - 2);  // the sem of the course
        var inserted = false;
        var index;
        if (year == 1){
            if (sem == "F"){
                index = 0;
            }
            else if (sem == "W"){
                index = 1;
            }
        }
        else if(year == 2){
            if (sem == "F"){
                index = 2;
            }
            else if (sem == "W"){
                index = 3;
            }
        }
        else if(year == 3){
            if (sem == "F"){
                index = 4;
            }
            else if (sem == "W"){
                index = 5;
            }
        }
        else if(year == 4){
            if (sem == "F"){
                index = 6;
            }
            else if (sem == "W"){
                index = 7;
            }
        }
        var row = 1;
        var courseList = [];
        if (dupCourse(courseList, c) == false){
            while (inserted == false){
                if(row > 5){
                    alert("Semester full cannot add: " + c.substring(0,6) + " to year " + year + " and semester " + sem);
                    inserted = true;
                }
                else if(document.getElementById(row).cells[index].value == 1){
                    row++;
                }
                else{
                    document.getElementById(row).cells[index].innerHTML = c.substring(0,6);
                    document.getElementById(row).cells[index].value = 1;
                    courseList.push(c.substring(0,6));
                    inserted = true;
                }
            }
        }
        
        
    }
    
}

function dupCourse(courseList, course)
{
    var count=courseList.length;
    for(var i=0;i<count;i++)
    {
        if(courseList[i]===course.substring(0,6)){
            alert("Course: " + c.substring(0,6) + " already in year " + year + " and semester " + sem);
            return true;
        }
    }
    return false;
}