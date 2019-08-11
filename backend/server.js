const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const passportSetup = require('./config/passport-setup');
// const keys = require('./config/keys');
// const routes = require("./routes");
const router = express.Router();

const PORT = process.env.PORT || 8080;

// Require all models
const Models = require('./models');

// Initialize Express
const app = express();
app.use(cors());
// Middleware defined
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Make public a static folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.dbURI || "mongodb://localhost/StockExchangeDB", { useNewUrlParser: true });

// Routes
let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//set up Auth routes
// app.use(routes);

// this is our get method
// this method fetches all available data in our database
// router.get('./getData', (req, res) => {
//   res.send('test');
  // Model.User.find({})
  // .then(function(response) {
  //   // If all Notes are successfully found, send them back to the client
  //   res.json(response);
  // })
  // .catch(function(err) {
  //   // If an error occurs, send the error back to the client
  //   res.json(err);
  // });
  // console.log(req);
  // console.log(res);

// });

router.get('/getData/:username', (req, res) => {
  Models.User.findOne({username: req.params.username},(err, data) => {
    console.log(data);
    // if (err) return res.json({ success: false, error: err });
    // return res.json({ success: true, data: data });
  });
});

router.post('/putData', (req, res) => {
  let model = new Model();

  const { username, googleID } = req.body;

  model.username = username;
  model.googleID = googleID;
  model.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/updateData', (req, res) => {

});

app.get('/user/:username', function(req,res) { 
  console.log("TEST");
  Model.User.find({where: {username: req.process.username}})
  .then(function(dbUser) {
    // If we were able to successfully find User, send them back to the client
    console.log(dbUser);
    res.json(dbUser);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
});
// append /api for our http requests
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});