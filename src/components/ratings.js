import React from "react";



class Ratings extends React.Component {
  

  componentWillMount() {

   
  }

	render() {


    var ratings = [];


    for(var i=1;i<=5;i++) {

       if( i <= parseInt(this.props.ratings)  )
          ratings.push(<svg key={i} className="filled" x="0px" y="0px" viewBox="0 0 24 24" width="24" height="24"><g className="nc-icon-wrapper" fill="#ffde17"><path d="M23.144,8.541,16.063,7.512,12.9,1.1a1.041,1.041,0,0,0-1.794,0L7.937,7.512.856,8.541A1,1,0,0,0,.3,10.246L5.425,15.24,4.216,22.293a1,1,0,0,0,1.451,1.054L12,20.018l6.333,3.329a1,1,0,0,0,1.451-1.054L18.575,15.24,23.7,10.246a1,1,0,0,0-.554-1.705Z" fill="#ffde17"></path></g></svg>);
       else
          ratings.push(<svg key={i} className="empty" x="0px" y="0px" viewBox="0 0 24 24" width="24" height="24"><g className="nc-icon-wrapper" fill="#dddddd"><path d="M23.144,8.541,16.063,7.512,12.9,1.1a1.041,1.041,0,0,0-1.794,0L7.937,7.512.856,8.541A1,1,0,0,0,.3,10.246L5.425,15.24,4.216,22.293a1,1,0,0,0,1.451,1.054L12,20.018l6.333,3.329a1,1,0,0,0,1.451-1.054L18.575,15.24,23.7,10.246a1,1,0,0,0-.554-1.705Z" fill="#dddddd"></path></g></svg>); 

    }

		return (<div className="ratings clearfix"> {ratings}  </div> );

	}

}

export default Ratings;

