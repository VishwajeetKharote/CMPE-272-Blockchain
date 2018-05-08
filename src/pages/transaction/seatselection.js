import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax,rBridge} from '../../helpers/helpers';
import Rating from '../../components/ratings';

import Loader from '../../components/loader';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';

class SeatSelection extends React.Component {
  
    state = {
      
      tickets : 0,
      seatNumbers:{},
      active_count:0,
      bg: ''

      

    }

    componentDidMount() {


      

    }
  
  static getDerivedStateFromProps(nextprops) {

     var obj = {};

     if(typeof nextprops.booking.movie !=="undefined") {
      
        obj['tickets'] =  nextprops.booking['tickets'];
        
         if(typeof nextprops.booking.ticket_numbers !=="undefined" && nextprops.booking.ticket_numbers){
            var s={},t = nextprops.booking.ticket_numbers;

            Object.keys(t).map(k => {
               s[t[k]] = t[k];
            })

            obj['seatNumbers'] = s;
         }

       // obj['ticket_numbers'] =  this.props.booking.ticket_numbers ? this.props.booking.tickets : 1;

        obj['bg'] = 'url(/uploads/'+nextprops.booking.movie.movie_id['cover']+')';

        
     }


     return obj;

  }

  gotoNextStep =(e) => {

    e.preventDefault();

      var obj = this;

    if(this.state.active_count < parseInt(this.state.tickets)) {
        alert("Please select atleast "+this.state.tickets+" tickets.");
        return;
     }

     if(this.props.guest === true) {
      obj.props.history.push('/login?redirecto='+"/transaction/seatselection");
      return;
     }

      var seats = [];
      var booking = this.props.booking;

      Object.keys(this.state.seatNumbers).map(key => {

          seats.push(this.state.seatNumbers[key]);
                                            
      });

      booking['ticket_numbers'] = seats;


      ajax({ booking : booking },function(response){
          
       obj.props.updateBooking(booking);

       obj.props.history.push('/transaction/payment');

        },"/v1/api/booking/","post");


  }  

  seatNumbers = (seat) => {

      var sn = this.state.seatNumbers;
      var st = 'available';
      var active_count = this.state.active_count;

      if(seat.state.status === 'available') {
          sn[seat.props.id] = seat.props.seat;
          st = 'selected';
          active_count++;
      } else {
        // seat was already selected remove it
        active_count--;
         delete  sn[seat.props.id];
      }

     if(active_count > parseInt(this.state.tickets)) {
        alert("You an book only "+this.state.tickets+" tickets.");
        return;
     }


      this.setState({ seatNumbers : sn, active_count : active_count });
      seat.setStatus(st);

  }


  createSeatMatrix = () => {

      var total = parseInt(this.props.booking.hall.tickets_limit);

      var row,seats = [];

      for(var i=0;i<10;i++) {
        
        row = [];

        row = (<ul key={"row"+i} className={"row-"+i+" seat-row clearfix"}>{row}</ul>);

        seats.push(row);
      }

      return seats;
  }

  render() {
    

    if(typeof this.props.booking.movie=== "undefined")
       return <Loader height="550px" />;

    var hall = this.props.booking.hall; 
    var movie_wapper = this.props.booking.movie;
    var movie = this.props.booking.movie.movie_id;

    // console.log(movie_wapper); 

    var seats = [];

   Object.keys(this.state.seatNumbers).map(key => {

       seats.push(<span key={key} className="badge badge-lg mr-1 badge-pill badge-primary text-uppercase">{this.state.seatNumbers[key]}</span>)
                                            
      });

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
                                              <h3>Book Tickets Step #3</h3>
                                          </div>

                                          <div className="fr-widget-body">

                                             <div className="seat-selection">

                                                <div className="seat-section-head clearfix">
                                                   
                                                </div>

                                                <div className="seat-section-body clearfix">

                                                   <div className="screen"></div>
                                                   <span className="theatre-title">Front of Theatre</span>
                                                   <div className="seats-area clearfix">
                                                        {this.createSeatMatrix()}
                                                   </div>
                                                   <span className="theatre-title">Back of Theatre</span>

                                                </div>

                                             </div>

                                            
                                             <a href="" onClick={this.gotoNextStep} className="btn btn-primary">Proceed to Payment</a> 
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
                                  <h6 className="meta">{ (movie.movie_rating) ? movie.movie_rating : 'G' } | {movie.movie_length}</h6>
                                 <ul>
                                    <li>Date : <span className="badge badge-lg badge-pill badge-primary text-uppercase">{moment(this.props.booking.date,"DD-MM-YYYY").format('dddd, MMMM Do YYYY')}</span></li>
                                    <li>Time : <span className="badge badge-lg badge-pill badge-primary text-uppercase">{this.props.booking.time}</span></li>
                                    <li>Seat Numbers : {seats}
                                          
 
                                        </li> 
                                  </ul>
                                  
                                  <h2>{hall.name}</h2>
                                  <p>{hall.address}</p>

                                   <ul className='pt-0'>
                                    <li className='cost-row clearfix'><strong>Tickets Cost :</strong>  <span>{this.state.tickets} </span>  <span><svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#999999"><path fill="#999999" d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"></path></g></svg></span>
                                                              <span className="amount">${this.props.booking.price}</span>
                                      </li>
                                    <li className='tax clearfix'><strong>Tax : $4</strong></li>
                                    <li className='total clearfix'><strong>Total : ${parseInt(this.props.booking.total) + 4}</strong></li>
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

export default rBridge(SeatSelection);

