import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchRecipesAndAttribution } from '../../thunks/fetchRecipesAndAttribution';
import RecipeContainer from '../RecipeContainer/RecipeContainer.js';
import RecipeCard from '../RecipeCard/RecipeCard.js';
import { Error404 } from '../../components/Error404/Error404.js';
import { Nav } from '../../components/Nav/Nav.js';
import { Loading } from '../../components/Loading/Loading';

export class App extends Component {
  calculateTotalUserRecipes = () => {
    const { desserts } = this.props;
    const totalUserRecipes = desserts.reduce((sum, recipe) => {
      return (recipe.notes !== '') ? (sum += 1) : sum;
    }, 0);
    return totalUserRecipes;
  }
  
  componentDidMount() {
    const { fetchRecipesAndAttribution } = this.props;
    if (localStorage.hasOwnProperty('userRecipes')) {
      const savedUserRecipes = JSON.parse(localStorage.getItem('userRecipes'));
      fetchRecipesAndAttribution(savedUserRecipes);
    } else {
      fetchRecipesAndAttribution();
    }
  }

  getRecipeRoute = ({ match }) => {
    const { desserts } = this.props;
    const dessert = desserts.find(dessert => dessert.id === match.params.id);
    if (!dessert) {
      return <Error404 />
    } 
    return <RecipeCard match={match} recipe={dessert} />
  }
  
  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        <header className="App--header">
          <h1>Mix It Up</h1>
          <Nav totalUserRecipes={this.calculateTotalUserRecipes()}/>
        </header>
        { isLoading && <Loading />}
        <Switch>
          <Route exact path='/desserts' render={({ match }) => <RecipeContainer match={match}/>} />
          <Route exact path='/my-recipes' render={({ match }) => <RecipeContainer match={match}/>} />
          <Route path='/my-recipes/:id' render={this.getRecipeRoute} />
          <Route path='/desserts/:id' render={this.getRecipeRoute} />
          <Route exact path='/' render={({ match }) => <RecipeContainer match={match}/>}/>
          <Route component={Error404} />
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