// API that return the metadata of every crypto currency
let CRYPTOCOMPARE_API_URI = "https://www.cryptocompare.com";

// API that returns the cryptocurrencies prices 
let COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

// the amount of milliseconds (ms) after which we should update our currency charts.
let UPDATE_INTERVAL = 60 * 1000;

let app = new Vue({
  el: "#app",
  data: {
    coins: [],
    coinData: {}
  },
  methods: {
    // get all the cryptocurrencies data
    getCoinData: function() {
      let self = this;
      
      axios.get(`${CRYPTOCOMPARE_API_URI}/api/data/coinlist`)
        .then((res) => {
          this.coinData = res.data.Data;
          this.getCoins();
        })
        .catch((err) => {
          this.getCoins();
          console.error(err);
        });
    },

    // get the top 10 cryptocurrencies by value
    getCoins: function() {
      let self = this;

      axios.get(`${COINMARKETCAP_API_URI}/v1/ticker/?limit=10`)
        .then((res) => {
          this.coins = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // retriving the logos of the currencies 
    getCoinImage: function(symbol) {

      // these two simbols do not match the code with the images
      symbol = (symbol === "MIOTA" ? "IOT" : symbol);
      symbol = (symbol === "VERI" ? "VRM" : symbol);

      if(this.coinData[symbol]) {
        let imagePath = this.coinData[symbol].ImageUrl;
        return CRYPTOCOMPARE_API_URI + imagePath;
      }
    },
    // set the color with the currency display losses or gains
    getColor: (num) => {
      return num > 0 ? "color:green;" : "color:red;";
    }
  },
  created: function() {
    this.getCoinData();
  }
});