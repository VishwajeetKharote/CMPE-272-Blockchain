import React from "react";
import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudList from '../../commons/crudList';

class AdminTransactions extends React.Component {
  
  	state = {

  		config : {   

	  	 	post_type : 'transaction',
	  	 	title : 'Transactions',
	  	 	index_route : '/v1/api/transactions',
	  	 	delete_route : '/v1/api/transaction/',
	  	 	fields : ['id','amount','ticket_id','status','movie_name','movie_time','movie_date','card_last_digits','action-booking']
	  	 	}

	  }



    componentDidMount() {
  	 
  	 let obj = this;

    }
  

	render() {
		

		return (<div>
			<DashboardLayout>
				
				<div className="padding-50 ">
					<CrudList config={this.state.config} params={this.props.match.params} />
				</div>

			</DashboardLayout>		 	
			</div>);

	}

	

}

export default AdminTransactions;

