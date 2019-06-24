var assert = require('assert');
var fake = require('../index');
describe('testiamo i fake tweets', function () {
    it('testiamo getTweets()', function () {
        fake.reset();
        assert.equal(fake.getTweets().length, 0);
    });
    it("Testiamo l'aggiunta di un tweets ed il delete", function () {
        fake.reset();
        fake.addTweets("Salvatore Bonaccorso", "L'Inter è una squadra fortissima");
        assert.equal(fake.getTweets().length, 1);
        assert.equal(fake.getTweets()[0].id, 0);
        fake.addTweets("Sempronio Caligola", "Pippo/Caio/Sempronio sono nomi che utilizzano gli informatici");
        assert.equal(fake.getTweets().length, 2);
        assert.equal(fake.getTweets()[1].id, 1);
        fake.deleteTweetsById(0);
        fake.addTweets("Marco Rossi", "Il Catania vola verso la promozione in serie B");
        assert.equal(fake.getTweets().length, 2);
        assert.equal(fake.getTweets()[1].id, 2);

    })

    it('Testiamo la modifica di un tweets tramite id', function () {
        fake.reset();
        fake.addTweets("Salvatore Bonaccorso", "L'Inter è una squadra fortissima");
        fake.addTweets("Carlo Leonardi", "Il rugby è la mia passione");
        fake.addTweets("Carlo Leonardi", "Se non sai una cosa chiedila a google !");
        fake.editTweetsById(1, 'Adoro la programmazione');
        assert.equal(fake.getTweets()[1].description, 'Adoro la programmazione');
    })

    it('Testiamo il find Tweets by author e il count', function () {
        fake.reset();
        fake.addTweets("Salvatore Bonaccorso", "L'Inter è una squadra fortissima");
        fake.addTweets("Sempronio Caligola", "Pippo/Caio/Sempronio sono nomi che utilizzano gli informatici");
        fake.addTweets("Marco Rossi", "Il Catania vola verso la promozione in serie B");
        fake.addTweets("Carlo Leonardi", "Il rugby è la mia passione");
        fake.addTweets("Carlo Leonardi", "Se non sai una cosa chiedila a google !");
        assert(fake.count(), 4);
        var filterTweets = fake.findTweetsByAuthor("Carlo Leonardi");
        assert(filterTweets.length, 2);
        assert(filterTweets[0].author, "Carlo Leonardi");
        assert(filterTweets[1].author, "Carlo Leonardi");
    })

    it('Testiamo il find tweets by context', function () {
        fake.reset();
        fake.addTweets("Salvatore Bonaccorso", "L'Inter è una squadra fortissima");
        fake.addTweets("Sempronio Caligola", "Pippo/Caio/Sempronio sono nomi che utilizzano gli informatici");
        fake.addTweets("Marco Rossi", "La squadra della Juventus scende in serie B !");
        fake.addTweets("Carlo Leonardi", "Il rugby è la mia passione");
        fake.addTweets("Carlo Leonardi", "Se non sai una cosa chiedila a google !");
        var filterTweets = fake.findTweetsByContext('squadra');
        assert(filterTweets.length, 2);
    })
})