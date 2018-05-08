import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax,rBridge} from '../../helpers/helpers';
import Rating from '../../components/ratings';
import Loader from '../../components/loader';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';

class BookTicket extends React.Component {
  
    state = {

      price : 0,
      tickets : 0,
      total : 0,

      bg: ''

      

    }

    componentDidMount() {

      

    }
  
  static getDerivedStateFromProps(nextprops) {

     var obj = {};

     if(typeof nextprops.booking.movie !=="undefined") {

        obj['tickets'] = nextprops.booking['tickets'];
        obj['price'] = nextprops.booking['price'];
        obj['total'] = nextprops.booking['total'] ? nextprops.booking['total'] : parseInt(nextprops.booking['price']) * parseInt(nextprops.booking['tickets']) ;

        obj['bg'] = 'url(/uploads/'+nextprops.booking.movie.movie_id['cover']+')';

        
     }


     return obj;

  }

handleChange = (date) => {

      var dates = this.state.date;
      
      dates = date;

      this.setState({ date : dates  });

    }

    handleTicketChange = (event) => {

      var ticket_no = parseInt(event.target.value);
      
      this.setState({ total : this.state.price * ticket_no  , tickets : ticket_no });

    }

  gotoNextStep =(e) => {

    e.preventDefault();

      var obj = this;
      var booking = this.props.booking;

    
      booking['total'] = this.state.total;
      booking['tickets'] = this.state.tickets;


      ajax({ booking : booking },function(response){
          
       obj.props.updateBooking(booking);

       obj.props.history.push('/transaction/seatselection');

        },"/v1/api/booking/","post");


  }  

  render() {
    

    if(typeof this.props.booking.movie=== "undefined")
       return <Loader height="550px" />;

    var hall = this.props.booking.hall; 
    var movie_wapper = this.props.booking.movie;
    var movie = this.props.booking.movie.movie_id;


    return (
       <div className="page">


          <div className="bookticket-banner-area" style={{ backgroundImage:this.state.bg }} ></div>
 
          <div className="page-content">

              <div className="container">
                  <div className="row home-row-1 padding-50">


                         <div className="col-12 col-lg-7">
           

                               <div className="cards-section">
                                  
                                   <div className="row">
                                        
                                    <div className="fr-widget">
                 
                                          <div className="title">
                                              <h3>Book Tickets Step #2</h3>
                                          </div>

                                          <div className="fr-widget-body">

                                             <h5>How tickets ? </h5>
                                             <p>You can request upto 9 tickets per transaction.</p>

                                             <div className="ticket-booking-table-wrap"> 
                                             <table className='ticket-booking-table'>
                                                <tbody>
                                                  <tr>
                                                      <td className="label-col"><label htmlFor="">Select no of Tickets:</label></td>
                                                      <td className='clearfix ticket-price-handler'>
                                                             <div className="clearfix">
                                                             <select onChange={this.handleTicketChange} defaultValue={this.state.tickets} className='form-control' name="" id="">
                                                                  <option value="1">1</option>     
                                                                  <option value="2">2</option>     
                                                                  <option value="3">3</option>     
                                                                  <option value="4">4</option>     
                                                                  <option value="5">5</option>     
                                                                  <option value="6">6</option>     
                                                                  <option value="7">7</option>     
                                                                  <option value="8">8</option>     
                                                                  <option value="9">9</option>     
                                                                  <option value="10">10</option>     
                                                              </select>
                                                              <span><svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#999999"><path fill="#999999" d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"></path></g></svg></span>
                                                              <span className="amount">${this.state.price}</span>
                                                              <span>=</span>
                                                              <span className="total">${this.state.total}</span>
                                                              </div> 
                                                      </td>  
                                                   </tr>
                                                  </tbody>
                                             </table>
                                             </div>
                                             <a href="" onClick={this.gotoNextStep} className="btn btn-primary">Proceed to Seat Selection</a> 
                                          </div>   
                                    </div>

               
                                    </div>
                              </div>

                        </div>

                        <div className="col-12 col-lg-5">
           
                          
                            <div className="movie-card clearfix">
                              
                              <div className="movie-card-image">
                                 <img src={"/uploads/"+movie.thumbnail} alt="images" />
                              </div>

                              <div className="movie-card-description">
                                  <h2>{movie.name}</h2>
                                  <h6 className="meta">{ (movie.movie_rating) ? movie.movie_rating : 'G' } | {movie.movie_length} }</h6>
                                  <ul>
                                    <li>Date : <span className="badge badge-lg badge-pill badge-primary text-uppercase">{moment(this.props.booking.date,"DD-MM-YYYY").format('dddd, MMMM Do YYYY')}</span></li>
                                    <li>Time : <span className="badge badge-lg badge-pill badge-primary text-uppercase">{this.props.booking.time}</span></li>
                                  </ul>
                                  
                                  <h2>{hall.name}</h2>
                                  <p>{hall.address}</p>

                                   <ul className='pt-0'>
                                    <li className='cost-row clearfix'><strong>Tickets Cost :</strong>  <span>{this.state.tickets} </span>  <span><svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#999999"><path fill="#999999" d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"></path></g></svg></span>
                                                              <span className="amount">${this.state.price}</span>
                                      </li>
                                    <li className='total clearfix'><strong>Total : ${this.state.total}</strong></li>
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

export default rBridge(BookTicket);

