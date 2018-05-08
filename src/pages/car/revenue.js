import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import {ajax} from '../../helpers/helpers';


class MovieRevenue extends React.Component {
  
  state = {

    r : ''
  }

  componentWillMount() {

    this.makeRequest();

  }  

  makeRequest = () => {

    var obj = this;

    ajax({},function(response){

        obj.setState({ r : response[0] });
        

        },"/v1/api/movie/transactions/"+obj.props.match.params.slug,"get");


  }

  render() {



    return (
                
               <DashboardLayout>

              
                <div className="row padding-50">
                   <div className="container">
                      <div className="col-12">
                       <div className="fr-widget">
                 <div className="title"><h3>{this.state.r.name}</h3></div>
                  <div className="fr-widget-body">Total revenue is <strong>${this.state.r.revenue}</strong></div>
              </div>
              </div>
                    </div> 
                </div>

                      
               </DashboardLayout>    
  

    );


  }
}

export default MovieRevenue;

