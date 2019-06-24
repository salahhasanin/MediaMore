const express = require("express");
//var Sentiment = require("sentiment");
//var sentiment = new Sentiment();
//var Twit = require("twit");

var Sentiment = require("sentiment");
const csv = require("csvtojson");
var sentiment = new Sentiment();

const app = express();

//const csvFilePath = "./oxoxoooooo.csv";

(function() {
  var childProcess = require("child_process");
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
    //  console.log("spawn called");
    //  console.log(arguments);
    var result = oldSpawn.apply(this, arguments);
    return result;
  }
  childProcess.spawn = mySpawn;
})();

app.get("/search", function callName(req, res) {
  var spawn = require("child_process").spawn;

  var process = spawn(
    "C:/Users/SALAHHASANIN/twitter_search.py/Scripts/python.exe",
    ["testOnly.py", req.query.search]
  );

  process.stdout.on("data", function(data) {
    console.log(data.toString());
  });
});
/*csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    // console.log(jsonObj);
    for (let h = 0; h < jsonObj.length; h++) {
      //  const m = jsonObj[h];
      var result = sentiment.analyze(jsonObj[h].text);
      /* if (result.negative.length) {
        console.log("negative is :" + jsonObj[h].text);
      }

       if (result.positive.length) {
        console.log("positive is :" + jsonObj[h].text);
        //console.log("-----------------------------------");
        // let pos = jsonObj[h].text;
      }
      
      // console.log("-----------------------------------");
      // let pos = jsonObj[h].text;

     nelse if (result.negative.length) {

      
        console.log("negitive is :" + jsonObj[h].text);
        // console.log("-----------------------------------");
        // let neg = jsonObj[h].text;
        //else {
        console.log("natural is :" + jsonObj[h].text);
        // console.log("-----------------------------------");
        // let nat = jsonObj[h].text;
    }

      // console.log(result);
    }
    console.log("-----------------------------------");
  });
*/
//C:\Users\SALAHHASANIN\twitter_search.py\Scripts\python.exe
//start server
app.listen(7777, function() {
  console.log("http://localhost:7777");
});
