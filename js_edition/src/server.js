const express = require("express");
const app = express();
const port = 3000;
const api = require("./api.js");
const path = require("path");

app.use(express.static(path.join(__dirname, "./json_files")));

app.get("/", (req, res) => {
    if (req.query.startDate && req.query.endDate) {
        var startDate = req.query.startDate;
        var endDate = req.query.endDate;
        var datesInRange = api.getAbsencesForDateRange(startDate, endDate);
        var stringForDatesInRange = JSON.stringify(datesInRange);
        res.send(stringForDatesInRange);
    } else if (req.query.userid) {
        var userId = req.query.userid;
        var daysAbsentForUser = api.getAllAbsentDatesForUserId(userId);
        var stringOfDaysAbsent = JSON.stringify(daysAbsentForUser);
        res.send(stringOfDaysAbsent);
    } else {
        res.download(path.join(__dirname, "./absentEmployees.ics"));
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));