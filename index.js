// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { is } = require("express/lib/request");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// get end point for dates

// app.get("/api/:timestamp", (req, res) => {
//   const requestDate = req.params.timestamp;

//   console.log(requestDate);

//   if (!requestDate || requestDate === "") {
//     res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
//   } else {
//     const requestDateIntger = parseInt(requestDate);
//     // console.log(typeof requestDateIntger);
//     res.json({
//       unix: new Date(requestDateIntger).getTime(),
//       utc: new Date(requestDateIntger).toUTCString(),
//     });
//   }
// });

app.get("/api/:date?", (req, res) => {
  const requestDate = req.params.date;

  console.log(typeof requestDate);

  if (!requestDate) {
    res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });

    //invalid
  } else if (new Date(requestDate).toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });

    //any valid date
  } else {
    const requestDateString = requestDate.toString();

    res.json({
      unix: new Date(requestDateString).getTime(),
      utc: new Date(requestDateString).toUTCString(),
    });
  }
});

app.listen(3000);
