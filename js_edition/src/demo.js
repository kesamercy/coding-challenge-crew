const api = require("./api.js");
cal = ics();
generateIcalData(cal);

// You can use this for easy debugging
makelogs = function(obj) {
    console.log("Events Array");
    console.log("=================");
    console.log(obj.events());
    console.log("Calendar With Header");
    console.log("=================");
    console.log(obj.calendar());
};