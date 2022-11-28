const Alpaca = require("@alpacahq/alpaca-trade-api");
require('dotenv').config();

const alpaca = new Alpaca({
    keyId: process.env.API_KEY,
     secretKey: process.env.API_SECRET,
  });

  symbol = "SPY";
(async ()=>{

    // 
    // https://alpaca.markets/docs/api-references/market-data-api/stock-pricing-data/historical/#bars
    // documentation for this api call
    // 
    
  const bars = await alpaca.getBarsV2(symbol,
    {
        start: "2022-10-28",
        end: "2022-11-27", // it cannot be latest time, we need to keep it 15min behind for free API data.
        timeframe: "1D", // timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D' available
        limit: 100, // I have tested this upto 100000
      });


      let barsData = [];
   for await (const b of bars) {
     barsData.push(b);
   }
   console.log("Last 10 daily bars for SPY");
   console.table(barsData);

})();