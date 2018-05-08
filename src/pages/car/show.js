import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax,rBridge} from '../../helpers/helpers';
import Rating from '../../components/ratings';

import moment from 'moment';
import Moment from 'react-moment';
import Loader from '../../components/loader';

import { ToastContainer, toast } from 'react-toastify';

class Movie extends React.Component {
  
  	state = {

  		movie : {},
  		halls : [],
  		reviews : [],

	  }

	componentWillMount() {

		this.makeRequest();

	}  

	makeRequest = () => {

		var obj = this;

		ajax({},function(response){

       		obj.setState({ movie : response.movie , halls :response.hall, reviews : response.movie.reviews });

      	},"/v1/api/movie/"+obj.props.match.params.slug,"get");


	}


    componentDidMount() {
  	 
  		let obj = this;

    }


    updateForm = (e) => {
    	e.preventDefault();

    	var myreview = this.myReview.value;
    	var reviews = [...this.state.reviews];
    	var obj = this;



    	reviews.push({
    		user : this.props.user._id,
			review : myreview,
			date: new Date()

    	});	

    	ajax({ reviews },function(response){

    		 toast.success("Review has been posted !", {
			      position: toast.POSITION.TOP_CENTER
			    });

    		 obj.submitButton.innerHTML = 'Add Review';
    		 	obj.form.reset();
			obj.makeRequest();

      	},"/v1/api/movie/addreview/"+obj.state.movie.slug,"put");

    }

    rateForm = (e) => {
    	e.preventDefault();

    	var myratings = this.ratingsSelector.value;

    	var movie = {...this.state.movie};

    	var rating_count = movie.rating_count;
    	var rating_sum = movie.rating_sum;
    	var obj = this;

    	rating_count.push(this.props.user._id);

    	var doc = {

    		rating_sum : rating_sum + parseInt(myratings), 
    		rating_count : rating_count
    	}

    	var ratings = rating_sum/rating_count.length;
    	ratings = (movie.rating + ratings)/2;



    	ajax(doc,function(response){

    		 toast.success("Rating has been added !", {
			      position: toast.POSITION.TOP_CENTER
			    });

			movie.ratings = Math.round(ratings);

			obj.setState({ movie : movie });    		 

      	},"/v1/api/movie/"+obj.state.movie.slug,"put");

    	


    }

    reviewWidget = (movie) => {

    	if(this.props.guest === true)
    		return null;


    	for(var i=0;i<movie.reviews.length;i++) {

    		if(typeof movie.reviews[i].user!== "undefined" && movie.reviews[i].user && movie.reviews[i].user._id === this.props.user._id) {
    			return (<div className="col-12 col-lg-12"><div class="alert alert-info alert-dismissible fade show" role="alert">
				    <span class="alert-inner--text">You can write review only once !</span>
				</div></div>);
    		}

    	}


    	return (<div className="fr-widget">
                               
                        <div className="title">
                            <h3>Add Reviews</h3>
                        </div>

                        <div className="fr-widget-body">

                        	 <form ref={(f) => {this.form = f;} } onSubmit={this.updateForm}>
                        	 		<div className="row">
 
		                                  <div className="col mb-3">
		                                  <label >Add Review here</label>
		                                   <textarea ref={(f) => {this.myReview = f;} } className="form-control" name="review" id="" cols="30" rows="10"></textarea>
		                                  </div>

		                                 
		                            </div>
		                            
		                            <button ref={(f) => {this.submitButton = f;} } className="btn btn-primary">Add Review</button>

                        	 </form>	
                        	

                        </div>		
					</div>);
    }
    ratingsWidget = (movie) => {

    	if(this.props.guest === true)
    		return null;


    	for(var i=0;i<movie.rating_count.length;i++) {

    		if(movie.rating_count[i] === this.props.user._id) {
    			return (<div className="col-12 col-lg-12"><div class="alert alert-info alert-dismissible fade show" role="alert">
				    <span class="alert-inner--text">You can rate only once !</span>
				</div></div>);
    		}

    	}

    	return (<div className="fr-widget mb-3">

            <div className="title">
                <h3>Add Ratings</h3>
            </div>

            <div className="fr-widget-body">

            	 <form onSubmit={this.rateForm}>
            	 		<div className="row">

                              <div className="col mb-3">
                              <label >Set Ratings</label>
                              <select ref={(f) => {this.ratingsSelector = f;} } name="rating"  className="form-control">
										<option value="5">5</option>	
										<option value="4">4</option>	
										<option value="3">3</option>	
										<option value="2">2</option>	
										<option value="1">1</option>	
								  </select>
                             
                        </div>
                        </div>
                        
                        <button className="btn btn-primary">Add Ratings</button>

            	 </form>

            </div>		
		</div>);

    }

  

	render() {
		
		if(typeof this.state.movie.id === "undefined")
			 return <Loader height="60vh" />;

		var movie = this.state.movie;

		var halls = [];

		Object.keys(this.state.halls).map(key => {

			var h = this.state.halls[key];
			var slot = '';

			for(var i=0;i<h.movies.length;i++){

			    if(h.movies[i].movie_id == movie._id) {
			    	slot = h.movies[i];
			    }	

			}

			var timings = [];
 
			for(var i=0;i<slot.timings.length;i++) {
				timings.push(<a key={i} href="" className="btn btn-primary mr-3">{slot.timings[i]}</a>);
			}

			halls.push(<div key={key} className="hall-movie">
				<h4 className="mb-4">{h.name}</h4>	

				<div className="timings clearfix">
					{timings}
				</div>

				</div>);

		

		});

		if(halls.length === 0)
			halls = (<div style={{margin:"25px"}} className="alert alert-info alert-dismissible fade show" role="alert">
			    <span className="alert-inner--text"><strong>Info!</strong> No movie hall is playing this movie !</span>
			</div>);
	     
	    var genre = [];
        
        Object.keys(movie.genre).map(k => { genre.push(<a key={"mg"+k} className='movie-genre-link badge badge-lg badge-pill badge-primary text-uppercase mr-1' href={'/movie/'+movie.genre[k].slug}>{movie.genre[k].name}</a>)  });  

        var reviews = [];

        Object.keys(this.state.reviews).map(k => { 

        	var r = this.state.reviews[k];

        	var avatar;
		      
          if(typeof r.user !== "undefined" && r.user  ){

    	      	if(typeof r.user.avatar === "undefined"  ){
    	      	  avatar = <span className="">{r.user.first_name[0]}{r.user.last_name[0]}</span>
    	      	} else {
    	      	  avatar = <img alt="avatar" src={"/uploads/"+r.user.avatar} className="" />
    	      	}

          }


        	reviews.push(<li key={'review'+k}>
        			<div className="description">{r['review']}</div>
        			<span className="date">{moment(r['date']).format("DD-MM-YYYY")}</span>
        			<span className="avatar-wrap">{avatar}</span>
        		</li>);  

        });  

        if(reviews.length === 0)
        	 reviews = (<li> There are no reviews yet ! </li>);

        if(movie.rating_count.length > 0) {

    	    var ratings = movie.rating_sum / movie.rating_count.length;
        	ratings = (movie.rating + ratings)/2;
        } else {
        	ratings = movie.rating;
        }

		return (
			 <div className="page">





			 		<div className="banner-area" style={{ "backgroundImage":"url(/uploads/"+movie.cover+")" }}></div>
 
                    <div className="page-content">
         
                        <div className="container">
                            <div className="row home-row-1 padding-75">



                                  <div className="col-12 col-lg-4">
                     
                                  	<div className="movie-poster">
                                  		<img src={"/uploads/"+movie.thumbnail} alt=""/>			
                                  	</div>	

                                     <div className="card mt-4">
							            <div className="card-header py-4">
							                <h4 className="heading h5 font-weight-500 mb-2">{movie.name} Information</h4>
							            </div>

							            <div className="list-group">
							                <ul className="list-group list-group-flush">
							                    <li className="list-group-item"><strong>Ratings</strong> : <Rating ratings={ratings} /> </li>
							                    <li className="list-group-item"><strong>Genre</strong> : {genre} </li>
							                    <li className="list-group-item"><strong>Trailer</strong> : <a target="_BLANK" href={movie.trailer_link}>{movie.trailer_link}</a></li>
							                    <li className="list-group-item"><strong>Release Date</strong> : <Moment format="MM/DD/YYYY">{movie.release_date}</Moment></li>
							                    <li className="list-group-item"><strong>Movie Length</strong> : {movie.movie_length}</li>
							                    <li className="list-group-item"><strong>Available in</strong> : {movie.available_in.join(',')}</li>
							                    <li className="list-group-item"><strong>Rated</strong> : {movie.movie_rating}</li>
							                    <li className="list-group-item"><strong>Cast</strong> : {movie.movie_characters.join(',')}</li>
							                    
							                </ul>
							            </div>
							        </div>

                                   </div> 


                                   <div className="col-12 col-lg-8">
                     

                                         <div className="cards-section">
                                            
                                             <div className="row">
                                                 	
                                                 	<div className="fr-widget user-movie-widget">
                               
						                                <div className="title">
						                                    <h3>{movie.name}</h3>
						                                </div>

						                                <div className="fr-widget-body">{movie.description}</div>		
													</div>


													<div className="fr-widget">
                               
						                                <div className="title">
						                                    <h3>Current Running In</h3>
						                                </div>

						                                <div className="fr-widget-body no-spacing">

						                                	{halls}

						                                </div>		
													</div>


													<div className="fr-widget mb-3">
                               
						                                <div className="title">
						                                    <h3>Reviews</h3>
						                                </div>

						                                <div className="fr-widget-body no-spacing">

						                                	<ul className='comment-list'>{reviews}</ul>

						                                </div>		
													</div>

													{this.ratingsWidget(movie)}
													{this.reviewWidget(movie)}

													

                                              </div>
                                        </div>

                                  </div>


                            </div>
                        </div>
                    </div>
                    


               </div>   );

	}

	

}

export default rBridge(Movie);

