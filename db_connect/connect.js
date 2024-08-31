
const dotenv=require('dotenv');// remembeer
const mongoose = require('mongoose');
// something to secure our db
mongoose.set("strictQuery", true);
dotenv.config()

// connecting our db

const db_url = process.env.MONGO_URL;
const con = mongoose.connect(`${db_url}`).then(() => {
    console.log("connected to database\n",db_url);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = con;
console.log("database conection string is ready to use");