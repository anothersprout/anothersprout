import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Child components

// Import static files
import './Home.css';

/**
 * Home
 */
export class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>Welcome to Home</div>
    );
  }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
