const express = require("express");
var Sentiment = require("sentiment");
var sentiment = new Sentiment();

const app = express();

//const csvFilePath = "./resulttt.csv";
const csv = require("csvtojson");
/*csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    // console.log(jsonObj);
    for (let h = 0; h < jsonObj.length; h++) {
      //  const m = jsonObj[h];
      var result = sentiment.analyze(jsonObj[h].text);

      if (result.positive.length) {
        console.log("positive is :" + jsonObj[h].text);
        // let pos = s[h];
      } /* else if (result.negative.length) {
        console.log("negitive is :" + s[h]);
        let neg = s[h];
      } else {
        console.log("natural is :" + s[h]);
        let nat = s[h];
      }
      // console.log(result);
    }
  });
*/
// Async / await usage
//const jsonArray = await csv().fromFile(csvFilePath);

//C:\Users\SALAHHASANIN\twitter_search.py\Scripts\python.exe
//start server
app.listen(2020, function() {
  console.log("http://localhost:2020");
});
