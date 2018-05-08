const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var slug = require('slug');

const reviewSchema = new Schema({

  user : { type: Schema.Types.ObjectId, ref: 'User' },
  review: String,
  date: { type: Date, default: Date.now },


}); 



const movieSchema = new Schema({


  id : { type: Number, default: 0 },
  name: String, // same Title
  slug: String,
  description: String,
  trailer_link: String,
  movie_characters : [],
  release_date: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  rating_sum: { type: Number, default: 0 },
  rating_count: [],
  thumbnail: String,
  cover: String,
  photos: String,
  movie_length: String,
  available_in: [],
  movie_rating: String,
  reviews: [reviewSchema],

  user : { type: Schema.Types.ObjectId, ref: 'User' },
  movie_halls : [{ type: Schema.Types.ObjectId, ref: 'MovieHall' }],
  genre : [{ type: Schema.Types.ObjectId, ref: 'Genre' }],

  created_at: { type: Date, default: Date.now },
});

movieSchema.plugin(autoIncrement.plugin, { model : 'Movie' , field: 'id' });
movieSchema.pre('save',function(next){

  /**
   * Unique slug algo
   */
   var obj = this;
    this.slug = slug(this.name).toLowerCase();

    Movie.find({ slug : this.slug})
    .exec(function(err, entities) {
       
              
              console.log('count => '+entities.length);  
              
              if(entities.length > 0)
                  obj.slug = obj.slug+'-'+entities.length;

              next();
         
      })
});

movieSchema.index({'$**': 'text'});



const Movie = mongoose.model('Movie',movieSchema);


 
module.exports = Movie;