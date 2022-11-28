const Alpaca = require("@alpacahq/alpaca-trade-api");
require('dotenv').config();

const alpaca = new Alpaca({
  keyId: process.env.API_KEY,
  secretKey: process.env.API_SECRET,
  });

  symbol = ["AAPL","SPY","TSLA"];
(async ()=>{

    // 
    // https://alpaca.markets/docs/api-references/market-data-api/stock-pricing-data/historical/#multi-bars 
    // documentation for this api call
    // 
    
  const bars = await alpaca.getMultiBarsV2(symbol,
    {
        start: "2022-10-28",
        end: "2022-11-27",
        timeframe: "1Day",
        limit: 50,
      });


      let barsData = [];
   for (const b of bars) {
     barsData.push(b);
   }
   console.log("Last 10 daily bars for SPY");
  //  console.log(barsData);

   console.table(barsData[0][1]);
   console.table(barsData[1][1]);
   console.table(barsData[2][1]);

})();