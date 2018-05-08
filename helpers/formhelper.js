


exports.formHandler = function(req,mode = 'create') {

	var entity = {}

	var values = req.body;

	// get all the uploads 
	var uploads = [];


	Object.keys(values).map(key => {

		if(key !== 'cr_uploads' && key !== 'cr_edit' &&key.indexOf('proxy') == -1 )
	    	entity[key] = values[key];

	    if(key.indexOf('proxy') > -1 ) {
	    	entity[key.replace('proxy','')] = values[key];
	    }

	});


	if("cr_uploads" in values) {

		uploads = values.cr_uploads.split(',');
		uploads = uploads.filter((value, index, self) => { 
    		
    		return self.indexOf(value) === index;
		
		});
		
		for( var i=0;i<req.files.length;i++) {

			var temp = req.files[i];
			entity[temp.fieldname] = temp.filename;
		}

	}

	if(typeof req.session.user !== "undefined")
		entity['user'] = req.session.user._id;

	return entity;
}


exports.listHandler = function(req,model,callback,perPage = 10,populates = []) {


	var filter = req.param('filter') ? req.param('filter') : {};
 	var sortable = 'id';
 	var page = req.param('page') ? (parseInt(req.param('page')) - 1) : 0;
 	var search = false,query ='';
  
  perPage = req.param('perPage') ? parseInt(req.param('perPage')) : perPage;
  
    if(typeof filter == "string")
      filter = JSON.parse(filter);

  var sorting = filter.sort;


  	if(  typeof filter.s !== "undefined"  ) {

    	// filter = { $text : {$search: filter.s} };
    	var options = [{
            name: {
                '$regex': filter.s,
                '$options': 'i'
            }
        }, {
            description: {
                '$regex': filter.s,
                '$options': 'i'
            }
        }];

      if(model.modelName=='Transaction')  {

          var options = [{
            card_last_digits: {
                '$regex': filter.s,
                '$options': 'i'
            }
        }, {
            status: {
                '$regex': filter.s,
                '$options': 'i'
            }
        }];


      }  

    	query = filter.s.toLowerCase();

    	var oldfilter = filter;

    	filter = { $or:options };

    	Object.keys(oldfilter).map(k => {
    		if(k!='s')
    		filter[k] = oldfilter[k];
    	});

    	if(model.modelName=='MovieHall') 
    		filter = {};

    	search = true;

  	}

    	
	if( typeof filter.user !== "undefined" ) {

	    filter['user_id'] = req.session.user.id;
	    delete filter['user'];

      if(model.modelName=='Transaction') {

          delete filter['user_id'];
          filter['user'] = req.session.user._id;
      }
	  
	}

  console.log(sorting);

  	if( typeof sorting !== "undefined" ) {

	    switch(sorting) {

         case 'price' : sortable = 'price' ; break;
         case 'rating' : sortable = { rating : -1 } ; break;
         case 'tickets_limit' : sortable = { 'tickets_limit': -1 } ; break;
         case 'release_date' : sortable = { release_date : -1 }; break;
	       case 'date' : sortable = 'created_at'; break;
	       case 'asc' : sortable = 'price'; break;
	       case 'name' : sortable = 'name'; break;
	       case 'desc' : sortable = { price: -1 }; break;

	    }
    	delete filter['sort'];
   }

   console.log(sortable);
  
  	var temp = model.find(filter)
 	    .limit(perPage)
		.skip(perPage * page)
		.sort(sortable)
	
	for(var i=0;i<populates.length;i++){
		temp = temp.populate(populates[i]);
	}

	temp = temp.populate('user')
		.exec(function(err, entities) {

        
        model.count(filter).exec(function(err, count) {
              
              if(  search === true && model.modelName=='MovieHall' ) {

              	 entities = entities.filter(function(hall){

              	 	var new_set = [];

              	 	for(var i=0;i<hall.movies.length;i++) {

              	 		if(hall.movies[i].movie_id.name.toLowerCase().includes(query)) {
              	 				new_set.push(hall.movies[i]);
              	 		}

              	 		// for city search no need to do anything
              	 		if(hall.city.toLowerCase() === query.toLowerCase().trim()) {
              	 				new_set = hall.movies;
              	 				break;
              	 		}

              	 		// same for zipcode
              	 		if(hall.zipcode === query.trim()) {
              	 				new_set = hall.movies;
              	 				break;
              	 		}

              		}

              		if(new_set.length > 0){
                		hall.movies = new_set;	
              			return hall;
              		} // movie found

                 
                  
                  return false;
                });

              console.log(sortable);   
              if(sortable === 'price') {


              entities = entities.sort((a, b) => {
                    const a1 = a.movies[0].price;
                    const b1 = b.movies[0].price;

                    console.log(a1,b1);

                    return a1 - b1;

                  });     

              } 


              }   


              callback({
                  entities: entities,
                  page: (page == 0) ? 1 : page+1,
                  max : Math.ceil(count / perPage)
              });
              

          })
      })

}