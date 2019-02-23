import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecipeLinkCard } from '../../components/RecipeLinkCard/RecipeLinkCard';

export class RecipeContainer extends Component {
  getRecipeType = () => {
    const { match } = this.props;
    switch(match.path) {
      case '/my-recipes':
        return 'userRecipes';
      case '/desserts':
        return 'desserts';
      case '/':
        return 'desserts';
      default:
        return 'desserts';
    }
  }
  
  getRecipesToDisplay = () => {
    let property = this.getRecipeType();  
    return this.props[property].map(recipe => {
      return <RecipeLinkCard recipe={recipe} key={recipe.id} type={property}/>
    });
  }

  render() {
    return(
      <div className='RecipeContainer'>
      {this.getRecipesToDisplay()}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  desserts: state.desserts,
  userRecipes: state.userRecipes
});

export default connect(mapStateToProps)(RecipeContainer);