const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var slug = require('slug');


const modelSchema = new Schema({

  id : { type: Number, default: 0 },
  name: String, // same Title
  slug: String,
  make_name: String,

  created_at: { type: Date, default: Date.now },
});

modelSchema.plugin(autoIncrement.plugin, { model : 'Model' , field: 'id' });
modelSchema.pre('save',function(next){

  /**
   * Unique slug algo
   */
   var obj = this;
    this.slug = slug(this.name).toLowerCase();

    Model.find({ slug : this.slug})
    .exec(function(err, entities) {
       
              
              console.log('count => '+entities.length);  
              
              if(entities.length > 0)
                  obj.slug = obj.slug+'-'+entities.length;

              next();
         
      })
});

modelSchema.index({'$**': 'text'});

const Model = mongoose.model('Model',modelSchema);

 
module.exports = Model;