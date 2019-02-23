import React, { Component } from 'react';
import { connect } from 'react-redux';
import closeIcon from '../../images/close.svg';
import { addRecipe, updateRecipe } from '../../actions';

export class RecipeCard extends Component {
  constructor() {
    super();
    this.state = {
      notes: ''
    }
  }

  componentDidMount = () => {
    const { match } = this.props;
    console.log('the path is:', match.path)
    if (match.path === '/my-recipes/:id') {
      const notes = this.props.recipe.notes;
      console.log('notes:', notes);
      this.setState({ notes });
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ notes: value });
  }

  handleSave = () => {
    this.saveToStore();
  }

  saveToStore = () => {
    const { userRecipes, recipe, addRecipe, updateRecipe } = this.props;
    const recipeToSave = { ...recipe, notes: this.state.notes };
    const found = userRecipes.find(userRecipe => userRecipe.id === recipe.id)
    found ? updateRecipe(recipeToSave) : addRecipe(recipeToSave);
  }

  render() {
    const { images, name, source, totalTime } = this.props.recipe;
    return(
      <article className='RecipeCard-article'>
      <img className='RecipeCard--icon' src={closeIcon} alt='close icon'/>
        <div className='RecipeCard--div--flex'>
          <div className='RecipeCard--div'>
            <img className='RecipeCard--img' src={images[0].hostedLargeUrl} alt={name}/>
            <p className='RecipeCard--p'>Time: {totalTime}</p>
            <p className='RecipeCard--p'>From: {source.sourceDisplayName}</p>
          </div>
          <div className='RecipeCard--div-notes'>
            <a className='RecipeCard--anchor' href={source.sourceRecipeUrl} target='_blank'>{name}</a>
            <p className='RecipeCard--p--large'>My Baking Notes:</p>
            <textarea 
              className='RecipeCard--textarea' 
              value={this.state.notes} 
              onChange={this.handleChange} 
              placeholder='Save your baking notes and specific oven instructrions'
            ></textarea>
            <button onClick={this.handleSave}className='RecipeCard--button'>Save</button>
          </div>

        </div>
      </article>
    );
  }
}

export const mapStateToProps = (state) => ({
  userRecipes: state.userRecipes
});

export const mapDispatchToProps = (dispatch) => ({
  addRecipe: (recipe) => dispatch(addRecipe(recipe)),
  updateRecipe: (recipe) => dispatch(updateRecipe(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);