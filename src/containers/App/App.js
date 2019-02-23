import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMatches } from '../../thunks/fetchMatches';
import RecipeContainer from '../RecipeContainer/RecipeContainer.js';
import RecipeCard from '../RecipeCard/RecipeCard.js';
import { Error404 } from '../../components/Error404/Error404.js';
import { Nav } from '../../components/Nav/Nav.js';

export class App extends Component {
  componentDidMount() {
    if (!this.props.desserts.length) {
    this.props.fetchMatches();
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App--header">
          <h1>Mix It Up</h1>
          <Nav />
        </header>
        <Switch>
          <Route exact path='/desserts' render={({ match }) => <RecipeContainer match={match}/>} />
          <Route exact path='/my-recipes' render={({ match }) => <RecipeContainer match={match}/>} />
          <Route exact path='/' render={({ match }) => <RecipeContainer match={match}/>}/>
          <Route path='/desserts/:id' render={({ match }) => {
            const dessert= this.props.desserts.find(dessert => dessert.id === match.params.id);
            if (!dessert) {
              return <Error404 />
            }
            return <RecipeCard match={match} recipe={dessert}/>
          }} />
        </Switch>
          <Route path='/my-recipes/:id' render={({ match }) => {
            console.log(match.params.id);
            const userRecipe = this.props.userRecipes.find(recipe => recipe.id === match.params.id);
            if (!userRecipe) {
              return <Error404 />
            }
            return <RecipeCard match={match} recipe={userRecipe} />
          }} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  desserts: state.desserts,
  userRecipes: state.userRecipes,
  error: state.error,
  isLoading: state.isLoading,
  attribution: state.attribution
});

export const mapDispatchToProps = (dispatch) => ({
  fetchMatches: () => dispatch(fetchMatches())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
