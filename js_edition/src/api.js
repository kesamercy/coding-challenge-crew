const fs = require("fs");
const ics = require("ics");
// var FileSaver = require("file-saver");

// there is a better way to do the file reading but at the time when i was writing the code, for one reason or another, i couldn't get it to work with readFile
// so i went with readFileSync due to the time constraints becasue it was important to get the code working in a given time, but i am fully aware that it is synchronous file reading is not the best option and ideally, should be done in asynchronus way, readFile!

//create a gloabal variable tha has the names of the users that are absent
var namesOfAbsentEmployees = [];

const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");

const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);

const listOfemployeesAbsent = absentEmployees(members, absences);
generateIcalData();

// test the ical on a separate file and see how it works
//then transfer the data to the api.js file

// console.log("list of employees absent", listOfemployeesAbsent);

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

    //stopped when you were trying to loop through these elements..cart

    //try the normal for loop or figure out how to use the for each loop

    for (let index = 0; index < namesOfAbsentEmployees.length; ++index) {
        var datesForOneEmployee = employeesAbsent.get(
            namesOfAbsentEmployees[index]
        );

        for (let j = 0; j < datesForOneEmployee.length; j++) {
            const event = {
                title: namesOfAbsentEmployees[index] +
                    "is" +
                    datesForOneEmployee[index].reasonForAbsence,
                dtstart: [datesForOneEmployee[index].startDate],
                dtend: [datesForOneEmployee[index].endDate],
                status: "ABSENT"
            };
        }

        break;
    }

    employeesAbsent.forEach(dates => {
        console.log(employeesAbsent.get("Max"), "the names");
        const event = {
            title: employeesAbsent.keys() + "is" + dates.reasonForAbsence,
            dtstart: dates.startDate,
            dtend: dates.endDate,
            status: "ABSENT"
        };
        icalAbsences.push(event);
    });

    // ics.createEvents(icalAbsences, (error, value) => {
    //     icalAbsences.forEach(event => {
    //         if (error) {
    //             console.log(error);
    //             return;
    //         }
    //         console.log(event);
    //     });
    // });

    //get the list of absences for each user

    //go through and generate an ical event for each user's absence

    //out put the absences into a ics file

    //download them
}

//generate the ical file

//get the reason why they are absent --- vaction

//get the reason why they are asbent ----- sickness

//generate multiple events for the days an employee is absent

//generate multiple events for all the employees

//save the output to ics file

//use js function to download the ics file on a page

//remove the repeated absencess from the list returned for each absence

//think about modifiying the functions so you can load the data into memory

//create an on click event, when the button is clikced, then generate
//the ical event and then download the ical event.

//the create ical event is only called when the button is clicked

//an ics file is generated and the contnet is read to the ics fiel..