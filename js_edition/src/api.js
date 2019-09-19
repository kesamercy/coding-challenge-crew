const fs = require("fs");

// there is a better way to do the file reading but at the time when i was writing the code, for one reason or another, i couldn't get it to work with readFile
// so i went with readFileSync but i am fully aware that it is synchronous file reading is not the best option and ideally, should be done in asynchronus way! 

const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");

const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);

console.log(members.payload[2].name);
console.log(absences.payload[2].endDate);


function absentEmployees(members, absences) {

    var listOfEmployeesAbsent = new Map();


    //set up the github repto

    //get the id of the user 

    //call the function to return a list of absences for the user 

    //add that list with their name to the list of employees absent hash map

    //go to the next person and do the same 

    //have a variable that holds the list of absences for the emplpyye

    //get the list of the absences 

    //get the names of the employees absent 

}

function getListOfAbsencesForUser(userId) {

    //go to the absences and check for matching with their id 

    //return a list for all the times they were absent 


}

//first thing is save the data from the json file into a ds

//get the userid and get the names of the people

//write different functions for each of the requirements listed / given

//think of data structures you can use in js....to store the data and parse it.