import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax,rBridge,getMovie} from '../../helpers/helpers';
import Ratings from '../../components/ratings';
import moment from 'moment';
import Loader from '../../components/loader';

class MovieHall extends React.Component {
  
  	state = {

  		moviehall : {}

	  }

	componentWillMount() {

		var obj = this;

		ajax({},function(response){

       		obj.setState({ moviehall : response });

      	},"/v1/api/moviehall/"+obj.props.match.params.slug,"get");

	}  


    componentDidMount() {
  	 
  	 let obj = this;

    }


    initiateBooking = (e) => {

    	e.preventDefault();
    	e.target.innerHTML = 'Booking..';

    	var tempHTML = e.target.innerHTML;
    	var obj = this;
    	var time = e.target.dataset.slot;
    	var date = e.target.dataset.date;
    	var movie_id = e.target.dataset.movie;
    	var movie = getMovie(this.state.moviehall,movie_id);


    	var booking = {

    		time : time,
    		date : date,
        tickets : 1 ,
    		ticket_numbers : [] ,
    		price : this.state.moviehall.ticket_price,
    		hall : this.state.moviehall,
    		movie : movie
    	}

    	ajax({ booking : booking },function(response){
       		
    	 obj.props.updateBooking(booking);

    	 obj.props.history.push('/transaction/schedule');

      	},"/v1/api/booking/","post");



    }
  

	render() {
		
		if(typeof this.state.moviehall.id === "undefined")
			return (<Loader height="70vh" />);

		var moviehall = this.state.moviehall;
	    
	    var movies = [];

	    Object.keys(moviehall.movies).map(key => {

	    var data = moviehall.movies[key];	
	   	var m = data.movie_id;
	   	var timings = [];


	   	for(var i=0;i<data.timings.length;i++) {
	   		timings.push(<a key={m._id+"-"+key+'-'+i} href="" onClick={this.initiateBooking} data-movie={m._id} data-slot={data.timings[i]} data-date={moment(new Date()).format("DD-MM-YYYY")} className="btn btn-primary ml-3">{data.timings[i]}</a>);
	   	}

      	movies.push(<div key={key} className="col-lg-12">
      	    
      	    <div id={m.slug} className="movie-card clearfix">
                                        
                                        <div className="movie-card-image">
                                          
                                           <img src={"/uploads/"+m.thumbnail} alt="images" />
                            
                                        </div>

                                        <div className="movie-card-description">
                                          
                                         
                                            <h2>{m.name}</h2>
                                            <h6 className="meta">{m.movie_rating} | {m.movie_length} | Adventure, Drama, Sci-Fi</h6>
                                            
                                            <Ratings ratings={m.rating} />

                                            <div className="desc">{m.description}</div>
                                                                                   

                                        </div>

                                        <div className="movie-card-bottom clearfix">
                                            <span className='views'><strong>${data.price}</strong></span>

                                            {timings}

                                       </div>

                                  </div>

      	</div>);
      	
      	})

		return (
			 <div className="page">





			 		<div className="moviehall-banner-area" ></div>
 
                    <div className="page-content">
         
                        <div className="container">
                            <div className="row home-row-1">



                                  <div className="col-12 col-lg-4">
                     

                                     <div className="card movie-hall-sidebar">
							            <div className="card-header">
							                <h4 className="heading h5 font-weight-500 mb-0">{moviehall.name} </h4>
							            </div>
 

							            <div className="list-group">
							                <ul className="list-group list-group-flush">
							                    <li className="list-group-item"><strong>Address</strong> : {moviehall.address} </li>
							                    <li className="list-group-item"><strong>Capacity</strong> : {moviehall.tickets_limit}</li>
							                    
							                </ul>
							            </div>
							        </div>

                                   </div> 


                                   <div className="col-12 col-lg-8">
                     

                                         <div className="cards-section movie-hall-main">
                                            

                                              <div className="section-title">
		                                            <h2>Running Shows</h2>
		                                           
		                                         </div>

		                                         <div className="cards-section">
		                                            
		                                             <div className="row">
		                                                  
		                                                  {movies}
		                                                  
		                                              </div>
		                                        </div>

                                        </div>

                                  </div>


                            </div>
                        </div>
                    </div>
                    


               </div>   );

	}

	

}

export default rBridge(MovieHall);

