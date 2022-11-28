const Alpaca = require("@alpacahq/alpaca-trade-api");

require('dotenv').config();

API_KEY = process.env.API_KEY;
API_SECRET = process.env.API_SECRET;

const alpaca = new Alpaca({
  keyId: API_KEY,
  secretKey: API_SECRET,
  paper: true,
});

const options = {
    start: new Date(new Date().setDate(new Date().getDate() - 1)), // 1 day ago
    end: new Date(), // Current date
    timeframe: "15Min",
  };

  async function getHistoricalBars(symbol) {
    let bars = [];
    let resp = alpaca.getCryptoBars(symbol, options);
    for await (let bar of resp) {
      bars.push(bar);
    }
    return bars;
  }
  
  symbol = "ETHUSD";
  barsPromise = getHistoricalBars(symbol);
  barsPromise.then((bars) =>
    bars.forEach((bar) => {
      console.table(bar);
    })
  );