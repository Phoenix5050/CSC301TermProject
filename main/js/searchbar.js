//let courseResponse='';   
const out = handleSearch("CSC108H5")
console.log(out);
async function handleSearch(course){
	//var course = document.getElementById("searchBar").value
	
	var url = "http://localhost:8080/api/v1/searchCourse?course="+course;

	const response = await fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'omit', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	}
	);
	const json = await response.json();
	return json['SearchResponse'];
// 	}).then( 
//         function(response) {
//             if (response.status !== 200) {  
//                 console.log("Error:"+response.status);
//                 //courseResponse = "Fetch Error :-S"+err;
//                 //return;   
//             }
//             else{
//             // Examine the text in the response  
//                 response.json().then(function(data) {  
// 				courseResponse = data["SearchResponse"];
//  				console.log(courseResponse);
//  				//return courseResponse;
//             });
//                         console.log(courseResponse);

//             }
//             console.log(courseResponse);
//             return response.text();
//         }  
//     )
//     .catch(function(err) {  
//         document.write('Fetch Error :-S', err);
//         console.log('Fetch Error :-S'+err)  
//     });
//     //return response.text();
}
// function testFunction(randomText){
// 	const container = document.querySelector("#searchcontainer");
// 	container.appendChild(document.createTextNode("Successfully executed form searchbar.js and got"+randomText));
// 	console.log("Successfully executed form searchbar.js");
// }