import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchRecipesAndAttribution } from '../../thunks/fetchRecipesAndAttribution';
import RecipeContainer from '../RecipeContainer/RecipeContainer.js';
import RecipeCard from '../RecipeCard/RecipeCard.js';
import { Error404 } from '../../components/Error404/Error404.js';
import { Nav } from '../../components/Nav/Nav.js';

export class App extends Component {
  componentDidMount() {
    if (localStorage.hasOwnProperty('userRecipes')) {
      const savedUserRecipes = JSON.parse(localStorage.getItem('userRecipes'));
      this.props.fetchRecipesAndAttribution(savedUserRecipes);
    } else {
      this.props.fetchRecipesAndAttribution();
    }
  }

  getRecipeRoute = ({ match }) => {
    const dessert = this.props.desserts.find(dessert => dessert.id === match.params.id);
    if (!dessert) {
      return <Error404 />
    }
    return <RecipeCard match={match} recipe={dessert} />
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
          <Route path='/my-recipes/:id' render={this.getRecipeRoute} />
          <Route path='/desserts/:id' render={this.getRecipeRoute} />
          <Route exact path='/' render={({ match }) => <RecipeContainer match={match}/>}/>
        </Switch>
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
  fetchRecipesAndAttribution: (recipes) => dispatch(fetchRecipesAndAttribution(recipes)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  desserts: PropTypes.array,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  attribution: PropTypes.object,
  fetchRecipesAndAttribution: PropTypes.func,
}