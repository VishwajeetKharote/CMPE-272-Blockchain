import React from "react";
import Ratings from "../ratings";



class MovieCard extends React.Component {
  
  componentWillMount() {

   
  }

	render() {

    var m = this.props.config;

     var genre = [];
        
        Object.keys(m.genre).map(k => { genre.push(m.genre[k].name)  });  


		return ( <div id={m.slug} className="movie-card clearfix">
                                        
                                        <div className="movie-card-image">
                                          
                                           <img src={"/uploads/"+m.thumbnail} alt="images" />
                            
                                        </div>

                                        <div className="movie-card-description">
                                          
                                         
                                            <h2>{m.name}</h2>
                                            <h6 className="meta">{m.movie_rating} | {m.movie_length} | {genre.join(",")}</h6>
                                            
                                            <Ratings ratings={m.rating} />

                                            <div className="desc">{m.description.substring(0,100)}...</div>
                                                                                   

                                        </div>

                                        <div className="movie-card-bottom clearfix">

                                           <a href={"/selecthall/"+m.slug} className="btn btn-primary">Book Now</a>
                                           <a href={"/movie/"+m.slug} className="mr-2 btn btn-dark">Details</a>

                                       </div>

                                  </div>);

  }
                                            

}

export default MovieCard;

