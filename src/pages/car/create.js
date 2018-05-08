import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudForm from '../../commons/crudForm';

var cast = require('../../helpers/cast');

class CarCreate extends React.Component {
  
  state = {

  	/*
  	
  thumbnail: String,
  cover: String,
  photos: String,
  
  	 */

  	 config : {   

  	 	post_type : 'car',
  	 	title : 'Car',
  	 	create_route : '/v1/api/car',
  	 	get_route : '/v1/api/car/',
  	 	edit_route : '/v1/api/car/',
  	 	sidebar_title : 'Manage Images',
  	 	form_elements: {

  	 		'main' : [


  	 			{ "label" : "Movie Title" , "name" : "name" , "type" : "text" },	
  	 			{ "label" : "Movie Description" , "name" : "description" , "type" : "textarea" },	
  	 	//		{ "label" : "Movie Halls" , "name" : "movie_halls" , "type" : "entity" , "entity" : "MovieHall" },
          { "label" : "Movie Release Date" , "name" : "release_date" , "type" : "date" }, 
          { "label" : "Movie Trailer Link" , "name" : "trailer_link" , "type" : "text" }, 
          { "label" : "Movie Rating" , "name" : "rating" , "type" : "select", "selectlabel" : "Select a rating" , "options" : { "1" : "1","2" : "2","3" : "3","4" : "4","5" : "5" } },  
          { "label" : "Movie Length(Hours:Minutes)" , "name" : "movie_length" , "type" : "text" },  
          { "label" : "Movie Available" , "name" : "available_in" , "type" : "select2" , "options" : { 'IMAX' : 'IMAX' , 'Digital' : 'Digital' , '3D' : '3D' , '4D': '4D'  , '7D' : '7D' } }, 
          { "label" : "Movie Cast" , "name" : "movie_characters" , "type" : "select2" , "options" : cast.default[0] }, 

          { "label" : "Model Type" , "name" : "model" , "type" : "entity" , "entity" : "Model" },


          { "label" : "Movie Rating" , "name" : "movie_rating" , "type" : "select" , "options" : { 'G' : 'G' , 'PG' : 'PG' , 'PG-13' : 'PG-13' , 'R': 'R'  , 'NC-17' : 'NC-17' } },

  	 		],

  	 		'sidebar':[

  	 			{ "label" : "Movie Thumbnail" , "name" : "thumbnail" , "type" : "upload" , "accept" : ".jpg,.png"},	
  	 			{ "label" : "Movie Cover" , "name" : "cover" , "type" : "upload" , "accept" : ".jpg,.png"},	
  	 			{ "label" : "Movie Photo" , "name" : "photos" , "type" : "upload", "accept" : ".jpg,.png" }

  	 		]

  	 	}

  	 }

  }

  componentWillMount() {

  }

	render() {

		return (
                
               <DashboardLayout>

						<CrudForm config={this.state.config} history={this.props.history} params={this.props.match.params} />	
                      
               </DashboardLayout>    
  

		);


	}
}

export default CarCreate;

