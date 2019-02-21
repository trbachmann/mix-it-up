import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMatches } from '../../thunks/fetchMatches';

export class App extends Component {

  componentDidMount() {
    this.props.fetchMatches();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Mix It Up</h1>
        </header>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  desserts: state.desserts,
  error: state.error,
  isLoading: state.isLoading,
  attribution: state.attribution
});

export const mapDispatchToProps = (dispatch) => ({
  fetchMatches: () => dispatch(fetchMatches())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
