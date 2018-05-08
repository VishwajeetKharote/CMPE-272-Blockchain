import React from "react";
import {rBridge,ajax} from '../../helpers/helpers';

import Moment from 'react-moment';
import Loader from '../../components/loader';

class Genre extends React.Component {

   state = {
    
      movies : [],
       genre:[],
      max :0 , 
      page : 1,
      searching : false

    } 
  
  componentDidMount() {

    var obj = this;

     ajax({ perPage : 100 },function(response){
           
        obj.setState({ genre : response.entities });
        
     },"/v1/api/genre","get");


    this.makeRequest({});


  }

  genre = () => {

    var g= [],cl='',obj=this;

    if( typeof obj.props.match.params.slug==="undefined" )
      cl = 'active';

    g.push(<li key='g-all' className={cl}><a href="/genre">All</a></li>);

    Object.keys(this.state.genre).map( s => {

      cl = '';

      if( typeof obj.props.match.params!=="undefined" && "slug" in obj.props.match.params && this.state.genre[s].slug ===  obj.props.match.params.slug)
          cl = 'active';

       g.push(<li className={cl} key={'g-'+this.state.genre[s].slug}><a href={'/genre/'+this.state.genre[s].slug}>{this.state.genre[s].name}</a></li>);

    });

    return g;
  }  


  makeRequest = (params) => {

      let obj = this;
      
        ajax(params,function(response){
             window.scrollTo(0,100);
              obj.setState({ movies : response.entities , page : response.page, max: response.max , searching:false });

        },"/v1/api/movies","get");


    }


  paginate = (e) => {

      e.preventDefault();
      this.makeRequest({ page : e.target.dataset.paginate });
       
    }

   sortMovies = (e) => {

      e.preventDefault();
      this.makeRequest({ filter : { sort : e.target.value } });
       
    }

  search = (e) => {
      
      e.preventDefault();
      
      this.setState({ searching:true });

      var obj = this,filter = { s : this.searchform.querySelector('.s').value };
      
      this.clearButton.style.display = "block";

      this.makeRequest({ filter : filter });

    }  

    resetPagination = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.searchform.reset(0);
      this.makeRequest({});
    }


  
  render() {

    if( typeof this.state.movies === "undefined" && this.state.movies.length === 0)
      return <Loader height="550" />;

    var movies = [];

  


    var pagination = [], cl ='';

    for(var i=1;i<=this.state.max;i++) {
            
            cl = ' page-item ';

            if(this.state.page == i)
              cl += ' active ';  

            pagination.push(<li key={'p'+i} className={cl}><a onClick={this.paginate} className="page-link" data-paginate={i} href={i}>{i}</a></li>);
                               
          }

    if(this.state.searching === true) {
       movies = <Loader height="300px" />;
    }      
   
    return (
                
               <div className="home-page">

                   <div className="bookticket-banner-area"></div>

                    <div className="page-content">
         
                        <div className="container">
                            <div className="row home-row-1 padding-75">


                                  <div className="col-12 col-lg-2">
                     

                                       <div className="sidebar-wrap">
                                            <div className="sidebar-title">
                                              <h3>Filter by genre</h3>
                                           </div>

                                           <div className="sidebar-body">
                                             <ul>
                                               {this.genre()}
                                             </ul>
                                           </div>

                                       </div>

                                   </div> 


                                   <div className="col-12 col-lg-10">
                                         
                                         

                                          

                                         <div className="section-title genre-title">
                                            <h2>Showing all movies</h2>
                                         </div>

                                         <div className="fr-widget">
                                              <div className="fr-widget-body">
                                                  
                                                  <form className='search-form' ref={(f) => {this.searchform = f;} } onSubmit={this.search} action="">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control s" placeholder="Search..." aria-label="Search by name or skills" aria-describedby="basic-addon2" />
                                                            
                                                                <button className="btn btn-primary" type="submit"><svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#ffffff"><path fill="#ffffff" d="M7,14c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7S10.86,14,7,14z M7,2C4.243,2,2,4.243,2,7s2.243,5,5,5 s5-2.243,5-5S9.757,2,7,2z"></path> <path data-color="color-2" fill="#ffffff" d="M15.707,14.293L13.314,11.9c-0.411,0.529-0.885,1.003-1.414,1.414l2.393,2.393 C14.488,15.902,14.744,16,15,16s0.512-0.098,0.707-0.293C16.098,15.316,16.098,14.684,15.707,14.293z"></path> </g></svg></button>
                                                            
                                                              <button ref={(b) => {this.clearButton = b;} }  style={{display:"none"}} className=" reset-results btn btn-sm btn-outline-secondary" onClick={this.resetPagination} >Clear Results</button>
                                                        </div>
                                                  </form>

                                              </div>

                                         </div> 

                                         

                                         <div className="cards-section genre-section">
                                            
                                               <div className="row">
                                                      <div className="col-12">
                                                          <select name="" onChange={this.sortMovies} id="" className="form-control filter-selector">
                                                            <option value="-">Filter</option>
                                                            <option value="release_date">Date</option>
                                                            <option value="rating">Ratings</option>
                                                          </select>
                                                          </div>
                                                       </div><br/><br/>

                                             <div className="row">
                                                
                                                {movies}  
                                                  

                                              </div>
                                        </div>

                                        <nav aria-label="Page navigation">
                                          <ul className="pagination">
                                           
                                             {pagination}
                                           
                                          </ul>
                                        </nav>

                                  </div>


                            </div>
                        </div>
                    </div>
                    


               </div>    

    );

  }

}

export default rBridge(Genre);

