import React from "react";



class Seat extends React.Component {
  	
  	state = {

  		status : 'available'

  	}

  	componentDidMount() {

  		this.setState({ status : this.props.status  });	
   
    }

  	registerSeat = (e) => {

  		var seatEl = e.target;
  		
  		if(this.props.status == 'booked')
  			return;	


  		this.props.addSeat(this);

  	}

  	setStatus = (status) => {

  		this.setState({ status });

  	}

	render() {


		return (<div id={this.props.id} onClick={this.registerSeat} className={this.state.status+" seat"} ><svg  x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#111111"><path d="M12.5,9v1.5h-9V9A1.5,1.5,0,0,0,2,7.5H2A1.5,1.5,0,0,0,.5,9v4.5h15V9A1.5,1.5,0,0,0,14,7.5h0A1.5,1.5,0,0,0,12.5,9Z" fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M2.5,5.5v-4a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1v4" fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round" data-color="color-2"></path> <line x1="2.5" y1="13.5" x2="2.5" y2="15.5" fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round"></line> <line x1="13.5" y1="13.5" x2="13.5" y2="15.5" fill="none" stroke="#111111" strokeLinecap="round" strokeLinejoin="round"></line></g></svg></div>);

	}

}

export default Seat;


