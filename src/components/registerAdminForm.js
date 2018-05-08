import React from "react";
import {ajax,formHandler} from '../helpers/helpers';

import { ToastContainer, toast } from 'react-toastify';

class RegisterAdminForm extends React.Component {
  
  
registerUser = (event) => {

    event.preventDefault();

    var html = this.submitButton.innerHTML, obj = this.submitButton;
    obj.innerHTML = "Signing up...";

    let temp = this.form;

    ajax( formHandler(temp),(r) => { 

         obj.innerHTML = html;

        if("error" in r) {

            toast.error(r.error.message, {
            position: toast.POSITION.TOP_CENTER
          });

        }

        if(typeof r.id !== "undefined") {
          
          temp.reset();
          toast.success("User has been succsefully registered!", {
            position: toast.POSITION.TOP_CENTER
          });

        }

    },"/v1/api/user")


  }

	render() {

var states = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};
		return (

			
      <section className="py-xl bg-cover bg-size--cover" >
        <span className="mask  alpha-6"></span>
        <div className="container d-flex align-items-center no-padding">
          <div className="col">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card  ">
                  <div className="card-body">
                  
                    <h4 className="heading h3  pt-3 pb-5">Register now</h4>

                    <div ref={(el) => {this.msg = el;} } style={{display:"none"}} className="alert alert-success alert-dismissible fade show" role="alert">
                        <span className="alert-inner--icon"><i className="fas fa-check"></i></span>
                        <span className="alert-inner--text">You have registered succsefully <a href="/login" className="white-text">Login from here</a> !</span>
                   
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>  
                   
                    <form ref={(f) => {this.form = f;} } onSubmit={this.registerUser} action="" className="fr-row-20">
                                 
                                  <input type="hidden" value="admin" name="role" /> 


                                  <div className="row">
                                  <div className="col mb-3">
                                  <label >Enter Firstname</label>
                                  <input type="text" required className="form-control" name="first_name" />  
                                  </div>

                                  <div className="col mb-3">
                                  <label >Enter Lastname</label>
                                  <input type="text" required className="form-control" name="last_name" />  
                                  </div>

                                  </div>
                                  
                                  <div className="row">
                                  <div className="col mb-3">
                                  <label >Enter Hash</label>
                                  <input type="text" required className="form-control" name="hash" />  
                                  </div>
                                  </div>


                                   <div className="row">
                                  <div className="col mb-3">
                                  <label >Enter Email</label>
                                  <input type="email" required className="form-control" name="email" />  
                                  </div>

                                   <div className="col mb-3">
                                  <label >Enter Contact No</label>
                                  <input type="tel" required className="form-control" name="phone" />  
                                  </div>
                                  </div>

                                  <div className="row mb-4">
                                  <div className="col">
                                  <label >Enter Address</label>
                                  <input type="text" className="form-control" name="address" />  
                                  </div>
                                  </div>

                                   <div className="row mb-4">
                                      <div className="col">
                                      <label >Select City</label>
                                      <input type="text" className="form-control" name="city" />  
                                      </div>

                                      <div className="col">
                                      <label >Select State</label>
                                      <select name="state" id="" className="form-control">
                                        {Object.keys(states).map(m =>  <option key={m} value={m}>{states[m]}</option> )}
                                      </select>
                                      </div>

                                     <div className="col">
                                      <label >Enter Zipcode</label>
                                      <input type="text" maxLength="11" pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"  required title="Invalid Zip Code" className="form-control" name="zipcode" />  
                                      </div>
                                  </div>

                                  <div className="row mb-4">
                                  <div className="col">
                                  <label >Enter password</label>
                                  <input type="password" className="form-control" name="password" />  
                                  </div>
                                  </div>

                                  <div className="row">    
                                  <div className="col">    
                                  <button className='btn btn-primary' ref={(f) => {this.submitButton = f;}} type="submit">Register <i className="fas fa-angle-right"></i></button>
                                  </div>
                                  </div>

                               </form>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     </section>

		);

	}

}

export default RegisterAdminForm;

