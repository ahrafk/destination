require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');

const port = 3000

mongoose.connect(process.env.DATABASEURL)
const db = mongoose.connection;

db.once('open', function(){
  console.log("Connected to MongoDB successfully!");
});
db.on('error', function(){
  console.log(err);
});

app.use(express.json())

// -------------------------------------------
//                 ADMIN
// -------------------------------------------

const adminRoutes = require('./routes/addDetails')

app.use('/admin/countries', adminRoutes)

// -------------------------------------------
//                 USERS
// -------------------------------------------

const travellerRouter = require('./routes/traveller')

app.use('/traveller', travellerRouter)

// ---------------------------------------------

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})