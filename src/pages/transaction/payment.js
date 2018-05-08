import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax,rBridge} from '../../helpers/helpers';
import Rating from '../../components/ratings';

import Loader from '../../components/loader';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Payment from 'payment';

class SeatSelection extends React.Component {
  
    state = {

     
      bg: '',


      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: '',
      focused: ''
    

    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          this.setState({ issuer });
        }
      }

      handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
      };

      handleInputChange = ({ target }) => {
        if (target.name === 'number') {
          this.setState({
            [target.name]: target.value.replace(/ /g, ''),
          });
        }
        else if (target.name === 'expiry') {
          this.setState({
            [target.name]: target.value.replace(/ |\//g, ''),
          });
        }
        else {
          this.setState({
            [target.name]: target.value,
          });
        }
      };


     

  initCards() {

       Payment.formatCardNumber(document.querySelector('[name="number"]'));
      Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
      Payment.formatCardCVC(document.querySelector('[name="cvc"]'));  

  }

  
  static getDerivedStateFromProps(nextprops) {

     var obj = {};

     if(typeof nextprops.booking.movie !=="undefined") {

        obj['bg'] = 'url(/uploads/'+nextprops.booking.movie.movie_id['cover']+')';
     }


     return obj;

  }

    handleTicketChange = (event) => {

      var ticket_no = parseInt(event.target.value);
      
       console.log(this.state.price * ticket_no);

      this.setState({ total : this.state.price * ticket_no  });

    }

    addMoney = (e) => {
      e.preventDefault();

      var data = this.props.booking;
      var obj = this;

      var transaction = {

        amount : data.total,
        tax : 4, 
        type : 'Card',
        movie: data.movie.movie_id._id,
        movie_hall : data.hall._id,
        ticket_numbers : data.ticket_numbers,
        status : 'Paid',
        movie_time : data.time,
        movie_date : data.date,
        screen : data.movie.screens[0],

        card_expiry:this.state.expiry,
        card_last_digits : this.state.number.substr(this.state.number.length - 4),  
       

      }

      ajax({ transaction : transaction },function(response){
          
            
            if(typeof response.id !=="undefined") {

                obj.props.history.push('/transaction/success/'+response.ticket_id);

            }


        },"/v1/api/transaction","post");



    }
   


  render() {
    
    if(typeof this.props.booking.hall =="undefined" && typeof this.props.user._id =="undefined") {
           return <Loader height="550px" />;
      }

     if(typeof this.props.booking.hall =="undefined") {
          return 'Please start again.'; 
      }
   
    var seats = [];
    var hall = {}, movie_wapper = {},movie= {},booking_details={ ticket_numbers:[] };


    hall = this.props.booking.hall; 
    movie_wapper = this.props.booking.movie;
    movie = this.props.booking.movie.movie_id;
    booking_details = this.props.booking;

    // console.log(movie_wapper); 


   Object.keys(booking_details.ticket_numbers).map(key => {

       seats.push(<span key={key} className="badge badge-lg mr-1 badge-pill badge-primary text-uppercase">{booking_details.ticket_numbers[key]}</span>)
                                            
      });

    const { name, number, expiry, cvc, focused, issuer } = this.state;

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
                                              <h3>Book Tickets Step #4</h3>
                                          </div>

                                          <div className="fr-widget-body">

                                             <form ref={ (f) => { this.form = f;} } onSubmit={this.addMoney} action="">


                                          <Cards
                                                number={number}
                                                name={name}
                                                expiry={expiry}
                                                cvc={cvc}
                                                focused={focused}
                                                callback={this.handleCallback}
                                              />


                                                                                 <div className="mt-4 form-group">
                                                  <input
                                                    type="tel"
                                                    name="number"
                                                    className="form-control"
                                                    placeholder="Card Number"
                                                    pattern="[\d| ]{16,22}"
                                                    required
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                  />
                                                  <small>E.g.: 49..., 51..., 36..., 37...</small>
                                                </div>
                                                <div className="form-group">
                                                  <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    required
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                  />
                                                </div>
                                                <div className="row">
                                                  <div className="col-6">
                                                    <input
                                                      type="tel"
                                                      name="expiry"
                                                      className="form-control"
                                                      placeholder="Valid Thru"
                                                      onChange={this.handleInputChange}
                                                      onFocus={this.handleInputFocus}
                                                    />
                                                  </div>
                                                  <div className="col-6">
                                                    <input
                                                      type="tel"
                                                      name="cvc"
                                                      className="form-control"
                                                      placeholder="CVC"
                                                      onChange={this.handleInputChange}
                                                      onFocus={this.handleInputFocus}
                                                    />
                                                  </div>
                                                </div>
                                                <input type="hidden" name="issuer" value={issuer} />


                                                 <div className="row mt-3">    
                                                <div className="col">    
                                                <button className='btn btn-primary'>Make Payment <i className="fas fa-angle-right"></i></button>
                                                </div>
                                                </div>
                                          </form>

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
                                    <li>Seat Numbers : {seats}
                                          
 
                                        </li> 
                                  </ul>
                                  
                                  <h2>{hall.name}</h2>
                                  <p>{hall.address}</p>

                                   <ul className='pt-0'>
                                    <li className='cost-row clearfix'><strong>Tickets Cost :</strong>  <span>{this.state.tickets} </span>  <span><svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#999999"><path fill="#999999" d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"></path></g></svg></span>
                                                              <span className="amount">${this.props.booking.price}</span>
                                      </li>
                                    <li className='total clearfix'><strong>Total : ${this.props.booking.total}</strong></li>
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

