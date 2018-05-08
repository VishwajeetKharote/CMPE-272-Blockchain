var Car = require('../models/Car');
var Model = require('../models/Model');
var User = require('../models/User');
var FormHelper = require('../helpers/formhelper');

const AutoChainNetwork = require('../libs/autochain');

exports.index = function(req,res) {

   var network = new AutoChainNetwork();
  
  let vehicles = network.getVehicles().then((vehicles) => {

    //console.log(vehicles);

    res.json({ entities : vehicles });
    res.end();
  });

}


exports.create = function(req,res) {

  var movie = new Movie;
  
  

  var data = FormHelper.formHandler(req);
  
  Object.keys(data).map(key => movie[key] = data[key] );


  movie.save(function(err,b){

            if(err) {

              res.json({ error : err , 'success' : false });

            }  


            if (b) {

               res.json(b);
               res.end();
              
            }
          
  });  


}

exports.show = function(req,res) {

  var slug = req.params.slug;

  

  Movie.where({ slug : slug })
  .findOne()
  .populate('user')
  .populate('genre')
  .populate('reviews.user')
  .exec(function (err, movie) {
    
    if (movie) {

      MovieHall.find({'movies.movie_id': {$eq: movie._id }}  ,function (err, hall) {
        
        // movie['halls'] = hall;

        res.json({ movie , hall});
        res.end();    
      
      }); 

      
    }
  
  });
  
}



exports.update = function(req,res) {

  var slug = req.params.slug;
  
  var doc = FormHelper.formHandler(req,'update');

  Movie.where().updateOne({ slug : slug },doc,function (err, movie) {
    if (err) return handleError(err);
    
    if (movie) {

       res.json(movie);
       res.end();
      
    }
  
  });
  
}


exports.addreview = function(req,res) {

  var slug = req.params.slug;
    
  var doc = { reviews : req.body.reviews };

  console.log(doc);

  Movie.where().updateOne({ slug : slug },doc,function (err, movie) {
    
      
    if (movie) {

       res.json(movie);
       res.end();
      
    }
  
  });
  
}




exports.delete = function(req,res) {

  var slug = req.params.slug;
  
  Movie.findOneAndRemove({ slug : slug },function (err, movie) {
    if (err) return handleError(err);
    
    if (movie) {

       res.json(movie);
       res.end();
      
    }
  
  });
  
}