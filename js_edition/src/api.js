const fs = require("fs");
const ics = require("ics");

const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");

const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);
const absencesLength = absences.payload.length;
const membersLength = members.payload.length;
var namesOfAbsentEmployees = [];

runProgram();

function generateIcalData() {
    var employeesAbsent = getListOfAbsentEmployees();
    var icalFormatForListOfAbsences = [];

    for (let i = 0; i < namesOfAbsentEmployees.length; ++i) {
        var datesForOneEmployee = employeesAbsent.get(namesOfAbsentEmployees[i]);
        for (let j = 0; j < datesForOneEmployee.length; j++) {
            var newStartDate = parseDate(datesForOneEmployee[j].startDate);
            var newEndDate = parseDate(datesForOneEmployee[j].endDate);
            const event = {
                title: namesOfAbsentEmployees[i] +
                    " is absent due to " +
                    datesForOneEmployee[j].reasonForAbsence,
                start: newStartDate,
                end: newEndDate
            };
            ics.createEvent(event, (error, value) => {
                if (error) {
                    console.log(error);
                    return;
                }
                icalFormatForListOfAbsences.push(value);
            });
        }
    }
    return icalFormatForListOfAbsences;
}

function getAbsencesForDateRange(startDateRequested, endDateRequested) {
    var employeeAbsencesInDateRange = [];

    for (let j = 0; j < absencesLength; j++) {
        var beginDate = absences.payload[j].startDate;
        var endingDate = absences.payload[j].endDate;
        if (beginDate >= startDateRequested && endingDate <= endDateRequested) {
            var userId = absences.payload[j].userId;
            var name = getNameForUserId(userId);
            var absentEmployee = {
                startDate: beginDate,
                endDate: endingDate,
                employeeName: name
            };
            employeeAbsencesInDateRange.push(absentEmployee);
        }
    }
    return employeeAbsencesInDateRange;
}

function getAllAbsentDatesForUserId(userId) {
    var listOfAllDaysAbsent = [];

    for (let i = 0; i < absencesLength; i++) {
        if (absences.payload[i].userId == userId) {
            var daysAbsent = {
                startDate: absences.payload[i].startDate,
                endDate: absences.payload[i].endDate,
                reasonForAbsence: absences.payload[i].type
            };
            listOfAllDaysAbsent.push(daysAbsent);
        }
    }
    return listOfAllDaysAbsent;
}

function getListOfAbsentEmployees() {
    var collectionOfAllEmployeesAbsent = new Map();

    for (let i = 0; i < absencesLength; ++i) {
        var userId = absences.payload[i].userId;
        var listOfAllDaysAbsent = getAllAbsentDatesForUserId(userId);
        var employeeName = getNameForUserId(userId);
        collectionOfAllEmployeesAbsent.set(employeeName, listOfAllDaysAbsent);
    }
    return collectionOfAllEmployeesAbsent;
}

function getNameForUserId(userId) {
    for (let i = 0; i < membersLength; ++i) {
        if (members.payload[i].userId == userId) {
            var userIdName = members.payload[i].name;
            namesOfAbsentEmployees.push(userIdName);
            return userIdName;
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

function runProgram() {
    generateIcalData();
    writeToIcsFile();
}

function writeToIcsFile() {
    var arrayOfAbsentEmployees = generateIcalData();
    var stringOfAbsentEmployees = arrayOfAbsentEmployees.toString();

    fs.writeFile("absentEmployees.ics", stringOfAbsentEmployees, err => {
        if (err) throw err;
        console.log("AbsentEmployees file saved!");
    });
}

module.exports = {
    generateIcalData: generateIcalData,
    writeToIcsFile: writeToIcsFile,
    getAllAbsentDatesForUserId: getAllAbsentDatesForUserId,
    getAbsencesForDateRange: getAbsencesForDateRange
};