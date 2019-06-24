var moment = require('moment');
var tweets = [];
var COUNTER = 0;

exports.addTweets = function (author, description) {
    tweets.push(
        {
            'author': author,
            'date': moment().format("DD/MM/YYYY"),
            'description': description,
            id: COUNTER++
        }
    );
    return 'Add a new tweets !';
}

exports.deleteTweetsById = function (id) {
    for (var i = 0; i < tweets.length; i++) {
        if (tweets[i].id === id) {
            tweets.splice(i, 1);
            return tweets;
        }
    }
}

exports.editTweetsById = function (id, description) {
    for (var i = 0; i < tweets.length; i++) {
        if ((tweets[i].id === id) && (tweets[i].description !== description)) {
            tweets[i].description = description;
            tweets[i].date = moment().format("DD/MM/YYYY");
            return tweets;
        }
    }
}

exports.findTweetsByAuthor = function (author) {
    var filteredArray = [];
    for (var tweet of tweets) {
        if (tweet.author === author) {
            filteredArray.push(tweet);
        }
    }
    return filteredArray;
}

exports.findTweetsByContext = function (word) {
    var filteredArray = [];
    for (var tweet of tweets) {
        if (tweet.description.includes(word)) {
            filteredArray.push(tweet);
        }
    }
    return filteredArray;
}

exports.getTweets = function () {
    return tweets;
}

exports.reset = function () {
    tweets = [];
    COUNTER = 0;
}

exports.count = function () {
    return tweets.length;
}
