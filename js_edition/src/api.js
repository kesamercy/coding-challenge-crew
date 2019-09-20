const fs = require("fs");

// there is a better way to do the file reading but at the time when i was writing the code, for one reason or another, i couldn't get it to work with readFile
// so i went with readFileSync due to the time constraints becasue it was important to get the code working in a given time, but i am fully aware that it is synchronous file reading is not the best option and ideally, should be done in asynchronus way, readFile! 

const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");

const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);

console.log(members.payload[2].userId);
console.log(absences.payload[2].endDate);

const listOfemployeesAbsent = absentEmployees(members, absences);

console.log(listOfemployeesAbsent);

function absentEmployees(members, absences) {

    var daysAbsent = {
        startDate: 0,
        endDate: 0
    }
    console.log("the days absent", daysAbsent);
    var ListOfAllDaysAbsent = [];
    var employeeName = "none yet";
    var userId = 0;
    var collectionOfAllEmployeesAbsent = new Map();
    const absencesLength = absences.payload.length;

    let i = 0;
    do {
        console.log("value for i ", i);

        userId = absences.payload[i].userId;
        console.log("the user id ", userId);
        daysAbsent.startDate = absences.payload[i].startDate;
        daysAbsent.endDate = absences.payload[i].endDate;
        employeeName = getNameForUserId(userId);
        console.log("the name of the user ", employeeName);
        collectionOfAllEmployeesAbsent.set(employeeName, ListOfAllDaysAbsent.push(daysAbsent));
        ++i;
    } while (i < absencesLength);

    //debug this code and see why it is failing....

    console.log(collectionOfAllEmployeesAbsent);

    return collectionOfAllEmployeesAbsent;
}

function getNameForUserId(userId) {

    var membersLength = members.payload.length;
    var userIdName = "none yet";

    console.log("length of members files", membersLength);

    for (i = 0; i < membersLength; ++i) {

        if (members.payload[i].userId == userId) {

            //get the name of the user 
            userIdName = members.payload[i].name;
            console.log("the name ", userIdName);

            return userIdName;
            break;
        }

    }



}