const fs = require("fs");
const ics = require('ics');

// there is a better way to do the file reading but at the time when i was writing the code, for one reason or another, i couldn't get it to work with readFile
// so i went with readFileSync due to the time constraints becasue it was important to get the code working in a given time, but i am fully aware that it is synchronous file reading is not the best option and ideally, should be done in asynchronus way, readFile! 

const membersContentsFromFile = fs.readFileSync("json_files/members.json");
const absencesContentsFromFile = fs.readFileSync("json_files/absences.json");

const members = JSON.parse(membersContentsFromFile);
const absences = JSON.parse(absencesContentsFromFile);

const listOfemployeesAbsent = absentEmployees(members, absences);

// test the ical on a separate file and see how it works
//then transfer the data to the api.js file



console.log("list of employees absent", listOfemployeesAbsent);

function absentEmployees(members, absences) {
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

    for (let i = 0; i < membersLength; ++i) {
        if (members.payload[i].userId == userId) {

            userIdName = members.payload[i].name;
            return userIdName;
        }
    }
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

//an ics file is generated and the contnet is read to the ics fiel

const event = {
    start: [2018, 5, 30, 6, 30],
    duration: { hours: 6, minutes: 30 },
    title: 'Bolder Boulder',
    description: 'Annual 10-kilometer run in Boulder, Colorado',
    location: 'Folsom Field, University of Colorado (finish line)',
    url: 'http://www.bolderboulder.com/',
    geo: { lat: 40.0095, lon: 105.2669 },
    categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
    status: 'CONFIRMED',
    organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
    attendees: [
        { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
        { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
    ]
}

ics.createEvent(event, (error, value) => {
    if (error) {
        console.log(error)
        return
    }

    console.log(value)
});