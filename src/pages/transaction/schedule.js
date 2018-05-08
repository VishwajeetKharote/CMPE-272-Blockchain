import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax,rBridge} from '../../helpers/helpers';
import Rating from '../../components/ratings';
import Loader from '../../components/loader';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';

class Schedule extends React.Component {
  
    state = {

      time : '',
      date : '',

      bg: ''

      

    }

    componentDidMount() {

      

    }
  
  static getDerivedStateFromProps(nextprops) {

     var obj = {};

     if(typeof nextprops.booking.movie !=="undefined") {

        obj['time'] = nextprops.booking['time'];
        obj['date'] = moment(nextprops.booking['date'],"DD-MM-YYYY");

        obj['bg'] = 'url(/uploads/'+nextprops.booking.movie.movie_id['cover']+')';

        
     }


     return obj;

  }

handleChange = (date) => {

      var dates = this.state.date;
      
      dates = date;

      this.setState({ date : dates  });

    }

  gotoBookTickets = (e) => {
      e.preventDefault();

      var obj = this;
      var booking = this.props.booking;

      booking['date'] = moment(this.state.date).format("DD-MM-YYYY");
      booking['time'] = this.state.time;
      booking['tickets'] = this.props.booking.tickets ? this.props.booking.tickets : 1;


      ajax({ booking : booking },function(response){
          
       obj.props.updateBooking(booking);

       obj.props.history.push('/transaction/booktickets');

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
                                              <h3>Book Tickets Step #1</h3>
                                          </div>

                                          <div className="fr-widget-body">

                                             <h5>How tickets ? </h5>
                                             <p>You can request upto 9 tickets per transaction.</p>

                                             <table>
                                                <tbody>
                                                  <tr>
                                                      <td>Date Of Show:</td>
                                                      <td>
                                                         <div className="row">
                                                             <div  className="col mb-3">
                                                              <DatePicker minDate={new Date()} selected={this.state.date} className="form-control" name="ticket_day" onChange={this.handleChange} />
                                                            </div>
                                                        </div> 
                                                      </td>  
                                                   </tr>
                                                   <tr>
                                                      <td>Time of show:</td>
                                                      <td>
                                                         <div className="row">
                                                             <div  className=" col mb-3">
                                                                <select onChange={(e) => { this.setState({ time : e.target.value }); }} defaultValue={this.state.time} className='form-control' name="" id="">
                                                                   {Object.keys(movie_wapper.timings).map( key => <option key={'t-'+key} value={movie_wapper.timings[key]}>{movie_wapper.timings[key]}</option> )}  
                                                                </select>
                                                            </div>
                                                        </div> 
                                                      </td>  
                                                   </tr>
                                                </tbody>
                                             </table>
                                             <a href="" onClick={this.gotoBookTickets} className="btn btn-primary">Proceed to buy tickets</a> 
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
                                    <li>Date : <span className="badge badge-lg badge-pill badge-primary text-uppercase">{moment(this.state.date).format('dddd, MMMM Do YYYY')}</span></li>
                                    <li>Time : <span className="badge badge-lg badge-pill badge-primary text-uppercase">{this.state.time}</span></li>
                                    
                                  </ul>
                                  
                                  <h2>{hall.name}</h2>
                                  <p>{hall.address}</p>
                              </div>

                              <div className="movie-card-bottom clearfix">
                                  

                             </div>

                          </div>
                           

                         </div> 


                  </div>
              </div>
          </div>
                    
       </div>   );

  }

  

}

export default rBridge(Schedule);

