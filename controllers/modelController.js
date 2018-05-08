var Car = require('../models/Car');
var Model = require('../models/Model');
var User = require('../models/User');
var FormHelper = require('../helpers/formhelper');



exports.index = function(req,res) {

    FormHelper.listHandler(req,Model,function(results){

      res.json(results);
      res.end();

   }); 

}


exports.create = function(req,res) {

  var model = new Model;
  
  

  var data = FormHelper.formHandler(req);
  
  Object.keys(data).map(key => model[key] = data[key] );


  model.save(function(err,b){

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

  Model.where({ slug : slug })
  .findOne()
  .populate('user')
  .exec(function (err, model) {
    
    if (model) {

       res.json(model);
       res.end();
      
    }
  
  });
  
}



exports.update = function(req,res) {

  var slug = req.params.slug;
  
  var doc = FormHelper.formHandler(req,'update');

  Model.where().updateOne({ slug : slug },doc,function (err, model) {
    if (err) return handleError(err);
    
    if (model) {

       res.json(model);
       res.end();
      
    }
  
  });
  
}




exports.delete = function(req,res) {

  var slug = req.params.slug;
  
  Model.findOneAndRemove({ slug : slug },function (err, model) {
    if (err) return handleError(err);
    
    if (model) {

       res.json(model);
       res.end();
      
    }
  
  });
  
}