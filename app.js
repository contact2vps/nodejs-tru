const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const path = require("path");
var session = require('express-session');
var nodemailer = require('nodemailer');
require('dotenv').config();
const InitiateMongoServer = require("./app/mongo-config/db-config.js");
const Mailevent = require("./app/model/send-email.js");
const user = require("./routes/user");
InitiateMongoServer();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './app/views'));

// Middleware
//app.use('/birds', birds)
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());


/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use('/user',user);






// make public directory readable
app.use("/public", express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 8000, function(req, res) {
  	console.log(process.env.PORT);
	var mailOptions = {
	    from: 'vpspapneja@gmail.com',
	    to: 'pankaj@tru.agency',
	    subject: 'Testmail',
	    text: 'Hi, mail sentdddd.'
	};
	//Mailevent(mailOptions);
});
//https://nodejs-tru.herokuapp.com/
const header_details = {
	'metatitle':process.env.metatitle,
	'heading' : process.env.headertitle,
	//'public_path':'http://localhost:'+process.env.PORT+'/public',
	'public_path':'https://nodejs-tru.herokuapp.com'+'/public',
}
const base_url = site_url();

function site_url(){
	let site_url ='';
	//site_url = 'http://localhost:'+process.env.PORT;
	site_url = 'https://nodejs-tru.herokuapp.com';
	return site_url;
}




app.get("/",function (req, res) {
	console.log(base_url);
	res.render('home', { details: header_details});
});

app.get("/signup", function (req, res) { 
    res.render("register", { details: header_details }); 
});
app.get("/signin", function (req, res) { 
    res.render("login", { details: header_details }); 
});