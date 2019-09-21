const fs = require("fs");
const ics = require("ics");

// there is a better way to do the file reading but at the time when i was writing the code, for one reason or another, i couldn't get it to work with readFile
// so i went with readFileSync due to the time constraints becasue it was important to get the code working in a given time, but i am fully aware that it is synchronous file reading is not the best option and ideally, should be done in asynchronus way, readFile!
const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");
const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);

var namesOfAbsentEmployees = [];

const listOfemployeesAbsent = absentEmployees(members, absences);
generateIcalData();

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

//when the user clicks the download button
function downloadEmployeeAbsences() {
    //create a text file
    //create the ical event and save it to the text file
    //create an ical file to write the data to
    // var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
    // FileSaver.saveAs(blob, "hello world.txt");
}

function generateIcalData() {
    var employeesAbsent = absentEmployees();
    var icalAbsences = [];

    for (let index = 0; index < namesOfAbsentEmployees.length; ++index) {
        var datesForOneEmployee = employeesAbsent.get(
            namesOfAbsentEmployees[index]
        );

        for (let j = 0; j < datesForOneEmployee.length; j++) {
            var newStartDate = parseDate(datesForOneEmployee[j].startDate);
            var newEndDate = parseDate(datesForOneEmployee[j].endDate);

            const event = {
                title: namesOfAbsentEmployees[index] +
                    " is " +
                    datesForOneEmployee[j].reasonForAbsence,
                start: newStartDate,
                end: newEndDate
            };
            ics.createEvent(event, (error, value) => {
                if (error) {
                    console.log(error);
                    return;
                }

                console.log(value);
            });
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

//save the output to ics file

//use js function to download the ics file on a page

//start working on the code optimization check list

//think about modifiying the functions so you can load the data into memory

//create an on click event, when the button is clikced, then generate
//the ical event and then download the ical event.

//the create ical event is only called when the button is clicked

//an ics file is generated and the contnet is read to the ics fiel..