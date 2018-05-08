var Car = require('../models/Car');
var Model = require('../models/Model');
var User = require('../models/User');
var FormHelper = require('../helpers/formhelper');

var mailer = require('../handlers/mailer.js');;
var FormHelper = require('../helpers/formhelper');
var winston = require('winston');

/**
 * Ajax handler
 */




exports.ajax = function(req,res) {

	let data = '', response = '';

	switch(req.body.type) {

	
		case 'session-heartbeat' : 

			var temp = {};
			if(typeof req.session !=="undefined" && 'logged' in req.session && req.session.logged == true) {
				temp['logged'] = true;
				temp['user'] = req.session.user;
			} else {
				temp['logged'] = false;
 			}

 			res.json(temp);
 			res.end();

		break;

		case 'logout' : 
			
			req.session.user = '';
			req.session.destroy();

			res.end();

		break;


	}
	
};





exports.entities = function(req,res) {

	var model = req.param('entity');
	var name = req.param('name');
	var entity;

	switch(model) {
		case 'Car' : entity = Car; break;
		case 'User' : entity = User; break;
		case 'Model' : entity = Model; break;
	}

	 FormHelper.listHandler(req,entity,function(results){
	 	  results['entity'] = model;	
	 	  results['name'] = name;	
	      res.json(results);
	      res.end();

	   },100); 
	
};



exports.booking = function(req,res) {

	var booking = req.body.booking;

	delete booking['hall'].user;
	
	req.session.booking = booking;
	req.session.save();	

	res.send({ success : 1 });
	
};



exports.analytics = function(req,res) {

	const logger = winston.createLogger({
		  level: 'info',
		  format: winston.format.json(),
		  transports: [
		    new winston.transports.File({ filename: './logs/analytics.log', level: 'info' })
		  ]
		});

	logger.log({
		  level: 'info',
		  message: req.body.ping
		});

	res.send('');
};


exports.chart1 = function(req,res) {


	 FormHelper.listHandler(req,Movie,function(results){
	      
	      var movies = {};

	      Object.keys(results.entities).map(k => {
	      	 
	      	 movies[results.entities[k]._id] = { 'name' : results.entities[k].name , revenue : 0 } ;

	      });



	       FormHelper.listHandler(req,Transaction,function(transactions){


	       		 Object.keys(transactions.entities).map(k => {
	      	 		 
	      	 		 var t = transactions.entities[k];

			      	 if(typeof t.movie!=="undefined" && typeof movies[t.movie] !== "undefined" ) {

			      	 	if(t['amount']!=="undefined" && t['amount'] && t['amount']!='')
			      	 	 movies[t.movie]['revenue'] += parseInt(t['amount']);

			      	 }

			      });

	       		res.json(movies);
	      		res.end();

	       },100,['movie_hall']);

	      

	   },10); 

	
	
};



exports.chart2 = function(req,res) {

	var city = 'San Jose';

	 FormHelper.listHandler(req,Movie,function(results){
	      
	      var movies = {};

	      Object.keys(results.entities).map(k => {
	      	 
	      	 movies[results.entities[k]._id] = { 'name' : results.entities[k].name , revenue : 0 } ;

	      });



	       FormHelper.listHandler(req,Transaction,function(transactions){


	       		 Object.keys(transactions.entities).map(k => {
	      	 		 
	      	 		 var t = transactions.entities[k];

			      	 if(typeof t.movie!=="undefined" && typeof movies[t.movie] !== "undefined" && t.movie_hall.city.toLowerCase() === city.toLowerCase() ) {

			      	 	if(t['amount']!=="undefined" && t['amount'] && t['amount']!='')
			      	 	 movies[t.movie]['revenue'] += parseInt(t['amount']);

			      	 }

			      });

	       		res.json(movies);
	      		res.end();

	       },100,['movie_hall']);

	      

	   },10); 

	
	
};



exports.chart3 = function(req,res) {


	 FormHelper.listHandler(req,MovieHall,function(results){
	      
	      var moviehalls = {};

	      Object.keys(results.entities).map(k => {
	      	 
	      	 moviehalls[results.entities[k]._id] = { 'name' : results.entities[k].name , tickets : 0 } ;

	      });




	       FormHelper.listHandler(req,Transaction,function(transactions){


	       		 Object.keys(transactions.entities).map(k => {
	      	 		 
	      	 		 var t = transactions.entities[k];
			      	 	// console.log("Transaction is ",t);

			      	 if(typeof t.movie_hall!=="undefined" && typeof moviehalls[t.movie_hall] !== "undefined" && t['ticket_numbers']!=="undefined" ) {

			      	 	moviehalls[t.movie_hall]['tickets'] += t['ticket_numbers'].length;

			      	 }

			      });

	       		res.json(moviehalls);
	      		res.end();

	       },100);

	      

	   },10); 

	
	
};


function clone(obj) {
    var copy = Array.isArray(obj) ? [] : {};
    for (var i in obj) {
        if (Array.isArray(obj[i])) {
            copy[i] = obj[i].slice(0);
        } else if (obj[i] instanceof Buffer) {
            copy[i] = obj[i].slice(0);
        } else if (typeof obj[i] != 'function') {
            copy[i] = obj[i] instanceof Object ? clone(obj[i]) : obj[i];
        } else if (typeof obj[i] === 'function') {
            copy[i] = obj[i];
        }
    }
    return copy;
}
require("winston/lib/winston/common").clone = clone;

let Transport = require("winston-transport");
Transport.prototype.normalizeQuery = function (options) {  //
    options = options || {};

    // limit
    options.rows = options.rows || options.limit || 10;

    // starting row offset
    options.start = options.start || 0;

    // now
    options.until = options.until || new Date;
    if (typeof options.until !== 'object') {
        options.until = new Date(options.until);
    }

    // now - 24
    options.from = options.from || (options.until - (24 * 60 * 60 * 1000));
    if (typeof options.from !== 'object') {
        options.from = new Date(options.from);
    }

    // 'asc' or 'desc'
    options.order = options.order || 'desc';

    // which fields to select
    options.fields = options.fields;

    return options;
};
Transport.prototype.formatResults = function (results, options) {
    return results;
};

exports.chart4 = function(req,res) {

	var options = {
 
    limit:  100,
    start:  0,
    order:  'asc',
    fields: ['message']
};

	const logger = winston.createLogger({
		  level: 'info',
		  format: winston.format.json(),
		  transports: [
		    new winston.transports.File({ filename: './logs/analytics.log', level: 'info' })
		  ]
		});

	//
	// Find items logged between today and yesterday.
	//
	logger.query(options, function (err, results) {
	  if (err) {
	    /* TODO: handle me */
	    throw err;
	  }

	  var anal = results.file;
	  var output = {};

	  Object.keys(anal).map(k => {

	  		var o = anal[k].message;

	  		if(typeof output[o.referrer] === "undefined")
	  			output[o.referrer] = 0;
	  		else {

	  			if(typeof o.clicks !=="undefined")
	  			output[o.referrer] += o.clicks;
	  		}

	  });


	 res.send(output);
	});


	
};



exports.chart5 = function(req,res) {


	 res.send({

	 	"Interstellar" : 40,
	 	"Martian" : 13,
	 	"Avengers Infinity war" : 34,
	 	"Deadpool 2" : 18,
	 	

	 });
	
};




exports.chart6 = function(req,res) {

	

	 FormHelper.listHandler(req,Movie,function(results){
	      
	      var movies = {};

	      Object.keys(results.entities).map(k => {
	      	 
	      	 movies[results.entities[k].name] = results.entities[k].reviews.length ;

	      });

	      res.send(movies);
	   },100); 

	
	
};



exports.chart7 = function(req,res) {

	
	var options = {
 
    limit:  100,
    start:  0,
    order:  'asc',
    fields: ['message']
};

	const logger = winston.createLogger({
		  level: 'info',
		  format: winston.format.json(),
		  transports: [
		    new winston.transports.File({ filename: './logs/analytics.log', level: 'info' })
		  ]
		});

	//
	// Find items logged between today and yesterday.
	//
	logger.query(options, function (err, results) {
	  if (err) {
	    /* TODO: handle me */
	    throw err;
	  }

	  var anal = results.file;
	  var output = {};
	  var fn = {};
	  Object.keys(anal).map(k => {

	  		var o = anal[k].message;

	  		if(typeof output[o.ip] === "undefined")
	  			output[o.ip] = {};
	  		else {

	  			if(typeof o.referrer !=="undefined") {

	  				if(typeof output[o.ip][o.referrer] === "undefined")
	  					output[o.ip][o.referrer] = { page : o.referrer.replace('http://localhost:3000','') , value :0 }; 

	  				var v = output[o.ip][o.referrer].value + 1;

	  				output[o.ip][o.referrer] = { page : o.referrer.replace('http://localhost:3000','') , value :v }

	  			}
	  			
	  		}

	  });


	   Object.keys(output).map(k => { 

	   		fn[k] = [];

		   	Object.keys(output[k]).map(k1 => { 
		   			fn[k].push(output[k][k1]);
	   		});


	   });


	 res.send(fn);
	});


	
	
};