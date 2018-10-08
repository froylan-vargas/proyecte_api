const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twitter = require('twitter');
const boll = require('bollinger-bands');
const macd = require('macd');
const ma = require('moving-averages');
const moment = require("moment");
const fetch = require("node-fetch");

const twitterClient = new twitter({
    consumer_key: 'MTquifSXcAPrU1lH95xnYPGdl',
    consumer_secret: '1l88tt0EI7Vh2PjXGY4O7Fnu0MphLozkIIQyMH9ekma1MWVpry',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAJ9p8gAAAAAAXm%2FSAdFTl5UyrxfFPnQGYwxo%2FjM%3Du99tgcBLUHT2xToThlbJiB0zmFkqzcXT4ed3mFnDVbIYapzOCz'
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/crypto', (req, res) => {
    var startDate = moment(new Date(moment(new Date()).subtract(365, 'days').calendar())).format('YYYY-MM-DD');
    var endDate = moment(new Date()).format('YYYY-MM-DD');
    var currencyApiUrl = 'https://api.nomics.com/v1/exchange-rates/history';
    var key = '10bea72252e19dee1862e3d5958bef73';
    var currency = 'BTC';
    var start = startDate + 'T00:00:00Z';
    var end = endDate + 'T00:00:00Z';
    var completeUrl = `${currencyApiUrl}?key=${key}&currency=${currency}&start=${start}&end=${end}`;
    fetch(completeUrl).then(function(response){
        response.json().then(function(data){
            res.json(data);
        })
    });
})

app.get('/bollinger', (req, res) => {
    const { datum, size, times } = req.query;
    var datumArray = JSON.parse(datum);
    const bollingerBands = boll(datumArray, size, times);
    res.json(bollingerBands);
})

app.get('/macd', (req, res) => {
    const { data, slowPeriods, fastPeriods, signalPeriods } = req.query;
    var dataArray = JSON.parse(data);
    const macdResult = macd(dataArray, slowPeriods, fastPeriods, signalPeriods);
    res.json(macdResult);
})

app.get('/ma', (req, res) => {
    const { data, size } = req.query;
    var dataArray = JSON.parse(data);
    const maResult = ma.wma(dataArray, size, 2);
    res.json(maResult);
})

app.get('/tweets', (req, res) => {
    const { searchTerm } = req.query;
    twitterClient.get('search/tweets', {
        q: `${searchTerm} -RT -l:en`,
    },
        function (error, tweets, response) {
            res.json(tweets);
        });
});

app.listen(process.env.PORT);
//app.listen(4000);
