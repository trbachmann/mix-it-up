import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecipeLinkCard } from '../../components/RecipeLinkCard/RecipeLinkCard';
import PropTypes from 'prop-types';
import { UserInstructions } from '../../components/UserInstructions/UserIntructions';

export class RecipeContainer extends Component {
  getRecipesToDisplay = () => {
    const { match } = this.props;
    switch(match.path) {
      case '/my-recipes':
        return this.populateUserRecipes();
      case '/desserts':
      case '/':
        return this.populateRecipesWithoutUsers();
      default:
        return this.populateRecipesWithoutUsers();
    }
  }
  
  populateUserRecipes = () => {
    const { desserts } = this.props;
    const userRecipeCards =  desserts.reduce((acc, recipe) => {
      if (recipe.notes !== '') {
        acc.push(<RecipeLinkCard recipe={recipe} key={recipe.id} />)
      }
      return acc;
    }, []);

    return userRecipeCards.length ? userRecipeCards : (
      <UserInstructions />
    );
  }

  populateRecipesWithoutUsers = () => {
    const { desserts } = this.props;
    return desserts.reduce((acc, recipe) => {
      if (recipe.notes === '') {
        acc.push(<RecipeLinkCard recipe={recipe} key={recipe.id} />)
      }
      return acc;
    }, []);
  }

  render() {
    return(
      <div className='RecipeContainer'>
      {this.getRecipesToDisplay()}
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  desserts: state.desserts
});

export default connect(mapStateToProps)(RecipeContainer);

RecipeContainer.propTypes = {
  desserts: PropTypes.array,
  match: PropTypes.object
}