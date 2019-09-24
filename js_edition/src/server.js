const express = require("express");
const app = express();
const port = 3000;
const api = require("./api.js");
const path = require("path");

// define a route to download a file
app.use(express.static(path.join(__dirname, "./json_files")));

app.get("/", (req, res) => {
    res.download(path.join(__dirname, "./absentEmployees.ics"));
});

// app.get("/", (req, res) => {
//     console.log(req.query);
//     var allData = "";
//     var icalData = api.generateIcalData();
//     var userId = "noneyet";

//     if (req.query == userId) {
//         console.log("you have a user id request");
//     }
//     allData = icalData.toString();
//     console.log(allData);
//     res.send(allData);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//things left
//2. know the id being sent
//3. return the values based on the id sent -- call the getabsent dates for user and return these dates