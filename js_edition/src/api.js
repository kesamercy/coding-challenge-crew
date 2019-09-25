const fs = require("fs");
const ics = require("ics");

const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");

const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);
const absencesLength = absences.payload.length;
const membersLength = members.payload.length;
var namesOfgetListOfAbsentEmployees = [];

getListOfAbsentEmployees(members, absences);
generateIcalData();
writeToIcsFile();

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

function getNameForUserId(userId) {
    for (let i = 0; i < membersLength; ++i) {
        if (members.payload[i].userId == userId) {
            var userIdName = members.payload[i].name;
            namesOfgetListOfAbsentEmployees.push(userIdName);
            return userIdName;
        }
    }
}

function generateIcalData() {
    var employeesAbsent = getListOfAbsentEmployees();
    var icalFormatForListOfAbsences = [];

    for (let index = 0; index < namesOfgetListOfAbsentEmployees.length; ++index) {
        var datesForOneEmployee = employeesAbsent.get(
            namesOfgetListOfAbsentEmployees[index]
        );
        for (let j = 0; j < datesForOneEmployee.length; j++) {
            var newStartDate = parseDate(datesForOneEmployee[j].startDate);
            var newEndDate = parseDate(datesForOneEmployee[j].endDate);
            const event = {
                title: namesOfgetListOfAbsentEmployees[index] +
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

function parseDate(oldDate) {
    var newDate = oldDate.split("-");

    for (let k = 0; k < newDate.length; k++) {
        var intValueOfString = newDate[k];
        newDate[k] = parseInt(intValueOfString, 10);
    }
    return newDate;
}

function writeToIcsFile() {
    var arrayOfAbsentEmployees = [];
    arrayOfAbsentEmployees = generateIcalData();
    stringOfAbsentEmployees = arrayOfAbsentEmployees.toString();

    fs.writeFile("absentEmployees.ics", stringOfAbsentEmployees, err => {
        if (err) throw err;

        console.log("AbsentEmployees file saved!");
    });
}

function getAbsencesForDateRange(startDateRequested, endDateRequested) {
    var allDatesWhenEmployeesAbsentInRange = [];

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
            allDatesWhenEmployeesAbsentInRange.push(absentEmployee);
        }
    }
    return allDatesWhenEmployeesAbsentInRange;
}

module.exports = {
    generateIcalData: generateIcalData,
    writeToIcsFile: writeToIcsFile,
    getAllAbsentDatesForUserId: getAllAbsentDatesForUserId,
    getAbsencesForDateRange: getAbsencesForDateRange
};