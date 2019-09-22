const fs = require("fs");
var FileSaver = require("file-saver");

// there is a better way to do the file reading but at the time when i was writing the code, for one reason or another, i couldn't get it to work with readFile
// so i went with readFileSync due to the time constraints becasue it was important to get the code working in a given time, but i am fully aware that it is synchronous file reading is not the best option and ideally, should be done in asynchronus way, readFile!
const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");
const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);

var namesOfAbsentEmployees = [];

const listOfemployeesAbsent = absentEmployees(members, absences);
generateIcalData();

function getNamesOfAbentEmployees() {
    return namesOfAbsentEmployees;
}

function absentEmployees() {
    var ListOfAllDaysAbsent = [];
    var employeeName = "none yet";
    var userId = 0;
    var collectionOfAllEmployeesAbsent = new Map();
    const absencesLength = absences.payload.length;
    var i = 0;

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

    for (let i = 0; i < absencesLength; i++) {
        if (absences.payload[i].userId == userId) {
            var daysAbsent = {
                startDate: 0,
                endDate: 0,
                reasonForAbsence: "noneyet"
            };
            daysAbsent.startDate = absences.payload[i].startDate;
            daysAbsent.endDate = absences.payload[i].endDate;
            daysAbsent.reasonForAbsence = absences.payload[i].type;
            ListOfAllDaysAbsent.push(daysAbsent);
        }
    }
    return ListOfAllDaysAbsent;
}

function getNameForUserId(userId) {
    var membersLength = members.payload.length;
    var userIdName = "none yet";

    for (let i = 0; i < membersLength; ++i) {
        if (members.payload[i].userId == userId) {
            userIdName = members.payload[i].name;
            namesOfAbsentEmployees.push(userIdName);
            return userIdName;
        }
    }
}

function generateIcalData(cal) {
    var employeesAbsent = absentEmployees();

    for (let index = 0; index < namesOfAbsentEmployees.length; ++index) {
        var datesForOneEmployee = employeesAbsent.get(
            namesOfAbsentEmployees[index]
        );

        for (let j = 0; j < datesForOneEmployee.length; j++) {
            var newStartDate = parseDate(datesForOneEmployee[j].startDate);
            var newEndDate = parseDate(datesForOneEmployee[j].endDate);

            cal.addEvent(
                namesOfAbsentEmployees[index] +
                " is absent due to " +
                datesForOneEmployee[j].reasonForAbsence,
                "mercy is coming home",
                "Bethlehem",
                newStartDate,
                newEndDate
            );
        }
    }
}

function parseDate(oldDate) {
    var newDate = oldDate.split("-");

    for (let k = 0; k < newDate.length; k++) {
        var intValueOfString = newDate[k];
        newDate[k] = parseInt(intValueOfString, 10);
    }
    return newDate;
}