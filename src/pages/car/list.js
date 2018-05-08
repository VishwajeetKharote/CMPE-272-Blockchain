import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudList from '../../commons/crudList';
import {rBridge} from '../../helpers/helpers';

class MovieList extends React.Component {
  

  	state = {

  		config : {   

	  	 	post_type : 'car',
	  	 	title : 'Vehicles',
	  	 	index_route : '/v1/api/cars',
	  	 	delete_route : '/v1/api/car/',
	  	 	fields : ['vin', 'make','modelType','color','companyName','vehicleStatus','plantName','plantCity','action']
	  	 	
	  	 	}

	  }



    componentDidMount() {
  	 
  	 let obj = this;

    }
  

	render() {
		
		

		return (<div>
		<DashboardLayout push={this.props.history.push}>
				
				<div className="padding-50 ">
					<CrudList config={this.state.config} params={this.props.match.params} />
				</div>

			</DashboardLayout>		 	
			</div>);

	}

	

}

export default rBridge(MovieList);

