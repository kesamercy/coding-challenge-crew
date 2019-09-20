const fs = require("fs");

// there is a better way to do the file reading but at the time when i was writing the code, for one reason or another, i couldn't get it to work with readFile
// so i went with readFileSync due to the time constraints becasue it was important to get the code working in a given time, but i am fully aware that it is synchronous file reading is not the best option and ideally, should be done in asynchronus way, readFile! 

const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");

const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);

const listOfemployeesAbsent = absentEmployees(members, absences);

console.log("list of employees absent", listOfemployeesAbsent);

function absentEmployees(members, absences) {

    var ListOfAllDaysAbsent = [];
    var employeeName = "none yet";
    var userId = 0;
    var collectionOfAllEmployeesAbsent = new Map();
    const absencesLength = absences.payload.length;
    let i = 0;

    while (i < absencesLength) {

        userId = absences.payload[i].userId;
        ListOfAllDaysAbsent = getAllAbsentDatesForUserId(userId);
        employeeName = getNameForUserId(userId);
        collectionOfAllEmployeesAbsent.set(employeeName, ListOfAllDaysAbsent);
        ++i;
    }
    return collectionOfAllEmployeesAbsent;
}

function getAllAbsentDatesForUserId(userId) {

    const absencesLength = absences.payload.length;
    var ListOfAllDaysAbsent = [];
    var daysAbsent = {
        startDate: 0,
        endDate: 0
    }

    for (let i = 0; i < absencesLength; i++) {
        if (absences.payload[i].userId == userId) {

            daysAbsent.startDate = absences.payload[i].startDate;
            daysAbsent.endDate = absences.payload[i].endDate;
            ListOfAllDaysAbsent.push(daysAbsent);

        }
    }
    return ListOfAllDaysAbsent;

}

function getNameForUserId(userId) {
    var membersLength = members.payload.length;
    var userIdName = "none yet";
    for (i = 0; i < membersLength; ++i) {
        if (members.payload[i].userId == userId) {
            userIdName = members.payload[i].name;
            return userIdName;
        }
    }
}