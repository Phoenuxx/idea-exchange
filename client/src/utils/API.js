import axios from "axios";
// const router = require('express').Router();
// const passport = require('passport');
const baseURL = "https://www.alphavantage.co/query?function=";
const key = process.env.alpha_vantage;
const db = process.env.dbURI;

export default {
 
  searchIntra: function(query) {
    return axios.get(baseURL + "TIME_SERIES_INTRADAY&datatype=json&symbol=" + query + "&interval=5min&apikey=" + key)
  },
  searchDaily: function(query) {
    return axios.get(baseURL + "TIME_SERIES_DAILY&datatype=json&symbol=" + query + "&apikey=" + key)
  },
  searchWeekly: function(query) {
   return axios.get(baseURL + "TIME_SERIES_WEEKLY&datatype=json&symbol=" + query + "&apikey=" + key)
  },
  searchMonthly: function(query) {
    return axios.get(baseURL + "TIME_SERIES_MONTHLY&datatype=json&symbol=" + query + "&apikey=" + key)
  }, 
  addToList: function(query) {  
    return axios.get(db)
  }
  
};


// // auth login
// router.get('/login', (req, res) => {
//     res.render('login');
//     console.log("login")
// });

// //autho logout
// router.get('/logout', (req,res) => {
//     //handle w/ passport
//     res.send('logging out');
// });

// //auth w/ google
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile']
// }));

// //callback for google redirect
// router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
//     console.log('google cb redirect test');
// })