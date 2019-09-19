const fs = require("fs");

// there is a better way to do the file reading but at the time when i was writing the code, for one reason or another, i couldn't get it to work with readFile
// so i went with readFileSync due to the time constraints becasue it was important to get the code working in a given time, but i am fully aware that it is synchronous file reading is not the best option and ideally, should be done in asynchronus way, readFile! 

const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");

const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);

console.log(members.payload[2].userId);
console.log(absences.payload[2].endDate);

//use a data structure to load it into memory first then acces the code there

//decide how you want to load it into memory... all of it or just the content you need?

//define what data you need then load it there into the ds



for (i = 0; i < 42; ++i) {

    // console.log(members.payload[i].userId);

    // if (members.payload[i].userId === 644) {

    //     //get the name 
    //     console.log(members.payload[i].name);

    // }
}

absentEmployees(members, absences);


function absentEmployees(members, absences) {



    //return a list of employees and the days they were absent 

    //how to get a list of people absent 

    //go to the absence list 

    //get the id of the first absent 

    //get the dates when the days absent 

    //get the name of the person 

    var listOfEmployeesAbsent = new Map();

    const absencesLength = absences.payload.length;

    console.log("the len of payload", absencesLength);

    for (i = 0; i < absencesLength; ++i) {

        var userId = absences.payload[i].userId;
        var startDate = absences.payload[i].startDate;
        var endDate = absences.payload[i].endDate;
        //var employeeName = members.payload
        console.log(userId);

    }

    //this function should be calling other functions to do stuff


    //go to the payload go to the first array value

    //get the name of the employees

    //get the start date of their absence 

    //get the end date of their absence 

    //get the creeated at for their absence 

    //get the confirmed at for their absence 
    //get the id of the user 

    //call the function to return a list of absences for the user 

    //add that list with their name to the list of employees absent hash map

    //go to the next person and do the same 

    //have a variable that holds the list of absences for the emplpyye

    //get the list of the absences 

    //get the names of the employees absent 
}

function getDatesForDaysAbsent() {

    //get the start date of their absence 

    //get the end date of their absence 


}

function getDatesWhenAbsenceRequested() {


}

function getNameForUserId() {


}

function collectionOfAbsencesForUser(userId) {

    //go to the absences and check for matching with their id 

    //return a list for all the times they were absent 


}

//get the name of the user 


//get the start and end dates 


//get the start and end dates of the time requested 













//first thing is save the data from the json file into a ds

//get the userid and get the names of the people

//write different functions for each of the requirements listed / given

//think of data structures you can use in js....to store the data and parse it.