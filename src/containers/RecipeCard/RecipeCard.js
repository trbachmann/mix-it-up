import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteRecipeNotes, updateRecipeNotes, setStatus } from '../../actions';
import { NavLink, Redirect } from 'react-router-dom';

export class RecipeCard extends Component {
  constructor() {
    super();
    this.state = {
      notes: ''
    }
  }

  componentDidMount = () => {
      const notes = this.props.recipe.notes;
      this.setState({ notes });
  }

  componentWillUnmount = () => {
    this.props.setStatus('');
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ notes: value });
  }

  handleSave = () => {
    const { id } = this.props.recipe;
    const { notes } = this.state;
    const { setStatus, updateRecipeNotes } = this.props;
    updateRecipeNotes(id, notes);
    
    if (localStorage.hasOwnProperty('userRecipes')) {
      this.updateLocalStorage(id, notes);
    } else {
      this.setLocalStorage(id, notes);
    }

    setStatus('success');
  }

  setLocalStorage = (id, notes) => {
    const recipes = JSON.stringify([{ id, notes }]);
    localStorage.setItem('userRecipes', recipes);
  }

  saveToStore = (id, notes) => {
    const { setStatus, updateRecipeNotes } = this.props;
    updateRecipeNotes(id, notes);
    setStatus('success');
  }

  updateLocalStorage = (id, notes) => {
    const savedRecipes = JSON.parse(localStorage.getItem('userRecipes'));
    const found = savedRecipes.find(savedRecipe => savedRecipe.id === id);
    let updatedRecipes;
    if (found) {
      updatedRecipes = savedRecipes.map(savedRecipe => {
        if (savedRecipe.id === id) {
          savedRecipe.notes = notes;
        }
        return savedRecipe
      });
    } else {
      updatedRecipes = [...savedRecipes, { id, notes }];
    }
    localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
  }

  render() {
    const { images, name, source, totalTime } = this.props.recipe;
    const { match } = this.props;
    let style = 'RecipeCard--div--button';
    if (match.path === '/my-recipes/:id') {
      style = 'RecipeCard--div--buttons';
    } 
    return (
      <article className='RecipeCard-article'>
        <div className={style}>
          <NavLink to='/'>
            <button className='RecipeCard--icon--close'><i className='far fa-times-circle'></i></button>
          </NavLink>
          {(match.path === '/my-recipes/:id') && <button onClick={this.handleDelete} className='RecipeCard--icon--delete'><i className="far fa-trash-alt"></i></button>}
        </div>
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
        { (this.props.status === 'success') && <Redirect to='/'/> }
      </article>
    );
  }
}

export const mapStateToProps = (state) => ({
  status: state.status,
  desserts: state.desserts
});

export const mapDispatchToProps = (dispatch) => ({
  deleteRecipeNotes: (id) => dispatch(deleteRecipeNotes(id)),
  updateRecipeNotes: (id, notes) => dispatch(updateRecipeNotes(id, notes)),
  setStatus: (status) => dispatch(setStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);