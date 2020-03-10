const searchbarcontainer = document.querySelector('#searchcontainer');
const searchBar = document.querySelector("#searchbar");

const linebreak = document.createElement("br");
searchbarcontainer.appendChild(linebreak);

const courses = document.createElement('table');

//Add to CSS file after
courses.style.width = '100%';
courses.setAttribute('border', '0');

const coursesbody = document.createElement('tbody');

const currentcoursesheader = document.createElement("tr");
const currentcoursesheadertext = document.createElement("H2");
currentcoursesheadertext.innerHTML="Courses currently offered";
currentcoursesheader.appendChild(currentcoursesheadertext);
//currentcoursesheader.style="1px solid red";
//coursesbody.appendChild(currentcoursesheader);
//courses.appendChild(coursesbody);

const fallheader = document.createElement('tr');
const fallheadertext = document.createElement("H3");
fallheadertext.innerHTML='FALL';
fallheader.appendChild(fallheadertext);
//fallheader.setAttribute('border', '1');

coursesbody.appendChild(currentcoursesheader);
coursesbody.appendChild(fallheader);
courses.appendChild(coursesbody);

const coursecode = document.createElement('tr');
const coursecodetext = document.createElement("H4");
coursecodetext.innerHTML='CSC-108';
coursecode.appendChild(coursecodetext);

const coursedetails = document.createElement('tr');
const coursedetailscontainer = document.createElement("div");
coursedetailscontainer.class,coursedetailscontainer.id = "coursedetailscontainer";

//coursedetails.appendChild(document.createTextNode("Prerequisites: \n\n testing"));
// coursedetails.appendChild(linebreak);
// coursedetails.appendChild(document.createTextNode("Corequisites: "));
// coursedetails.appendChild(linebreak);
// coursedetails.appendChild(document.createTextNode("Order Exclusions: "));
// coursedetails.appendChild(linebreak);

const par = document.createElement('p');
par.innerText = 'Prerequisites: \n\nCorequisites: \n\nOrder Exclusions: '
coursedetails.appendChild(par);
coursedetails.appendChild(coursedetailscontainer);
//fallheader.setAttribute('border', '1');

coursesbody.appendChild(currentcoursesheader);
coursesbody.appendChild(fallheader);
coursesbody.appendChild(coursecode);
coursesbody.appendChild(coursedetails);

searchbarcontainer.appendChild(courses);

