const express = require('express');
const twitter = require('twitter');
const bodyParser = require('body-parser');
const cors = require('cors');

const twitterClient = new twitter({
    consumer_key: 'MTquifSXcAPrU1lH95xnYPGdl',
    consumer_secret: '1l88tt0EI7Vh2PjXGY4O7Fnu0MphLozkIIQyMH9ekma1MWVpry',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAJ9p8gAAAAAAXm%2FSAdFTl5UyrxfFPnQGYwxo%2FjM%3Du99tgcBLUHT2xToThlbJiB0zmFkqzcXT4ed3mFnDVbIYapzOCz'
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/tweets', (req,res) => {
    const { searchTerm } = req.query;
    twitterClient.get('search/tweets', {q: searchTerm}, function(error, tweets, response) {
        res.json(tweets);
     });
});

app.listen(process.env.PORT);
