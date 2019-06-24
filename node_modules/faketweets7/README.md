# Fake_Tweets

## To install
```
npm install faketweets7
```
### A simple use of Fake Tweets
```javascript
  var fake = require('faketweets7');
fake.addTweets("Salvatore Bonaccorso", "L'Inter è una squadra fortissima");
fake.addTweets("Carlo Leonardi", "Il rugby è la mia passione");
fake.addTweets("Carlo Leonardi", "Se non sai una cosa chiedila a google !");
fake.deleteTweetsById(1);
fake.editTweetsById(2,'Adoro la programmazione');
fake.findTweetsByAuthor('Salvatore Bonaccorso');
fake.getTweets(); // array of Tweets
fake.findTweetsByContext('google')
fake.reset(); // array of Tweets = []
fake.count(); // array.length of Tweets
```