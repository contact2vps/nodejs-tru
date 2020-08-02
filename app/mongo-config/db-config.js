const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST+"/"+process.env.DB_NAME+"?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
			  useUnifiedTopology: true,
			  useNewUrlParser: true
	   });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;

/*const MongoClient = require('mongodb').MongoClient;
const objectid = require('mongodb').ObjectID;		
const uri ="mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST+"/"+process.env.DB_NAME+"?retryWrites=true&w=majority";

module.exports.connection = {clientconnection:MongoClient,connectionstring:uri,obj_id:objectid};*/