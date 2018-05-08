import React from "react";
import {ajax,rBridge} from '../../helpers/helpers';
import Loader from '../../components/loader';

import moment from 'moment';


class Success extends React.Component {
  
    state = {

        transaction : {}

    }

    componentDidMount() {
      var obj = this;

       ajax({},function(response){
          
          obj.setState({ transaction : response })

        },"/v1/api/transaction/"+this.props.match.params.id,"get");

    }   


  render() {
    
      if(typeof this.state.transaction._id=== "undefined")
        return <Loader height="550px" />;
    
    var t=this.state.transaction;   

     var seats = [];

     Object.keys(t.ticket_numbers).map(key => {

       seats.push(<span key={key} className="badge badge-lg mr-1 badge-pill badge-primary text-uppercase">{t.ticket_numbers[key]}</span>)
                                            
      });
     

    return (
       <div className="page">


          <div className="bookticket-banner-area"></div>
 
          <div className="page-content">

              <div className="container">
                  <div className="row home-row-1 padding-50">


                         <div className="col-12 col-lg-7">
           

                               <div className="cards-section">
                                  
                                   <div className="row">
                                        
                                    <div className="fr-widget">
                 
                                          <div className="title">
                                              <h3>Booking Confirmed <strong>Ticket ID# {t.ticket_id}</strong></h3>
                                          </div>

                                          <div className="fr-widget-body">

                                              <p>Your booking has been successfully confirmed !</p>    

                                          </div>   
                                    </div>

               
                                    </div>
                              </div>

                        </div>

                          <div className="col-12 col-lg-5">
           
                          
                            <div className="movie-card clearfix">
                              
                              <div className="movie-card-image">
                                 <img src={"/uploads/"+t.movie.thumbnail} alt="images" />
                              </div>

                              <div className="movie-card-description">
                                  <h2>{t.movie.name}</h2>
                                  <h6 className="meta">{ (t.movie.movie_rating) ? t.movie.movie_rating : 'G' } | {t.movie.movie_length} | {t.movie.genre.join(",")}</h6>
                                  <ul>
                                    <li>Date : <span className="badge badge-lg badge-pill badge-primary text-uppercase">{moment(t.movie_date).format('dddd, MMMM Do YYYY')}</span></li>
                                    <li>Time : <span className="badge badge-lg badge-pill badge-primary text-uppercase">{t.movie_time}</span></li>
                                    <li> Seats : {seats} </li> 
                                  </ul>
                                  
                                  <h2>{t.movie_hall.name}</h2>
                                  <p>{t.movie_hall.address}</p>

                                   <ul className='pt-0'>
                                    <li className='total clearfix'><strong>Total : ${t.amount}</strong></li>
                                  </ul>


                              </div>

                          </div>
                           

                         </div> 


                  </div>
              </div>
          </div>
                    
       </div>   );

  }

  

}

export default rBridge(Success);

