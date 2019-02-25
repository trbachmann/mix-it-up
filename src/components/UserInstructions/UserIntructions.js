import React from 'react';
import { NavLink } from 'react-router-dom';
import blankRecipe from '../../images/kara-eads-unsplash.jpg';

export const UserInstructions = () => {
  return(
    <div className='UserInstructions--div'>
      <img className='UserInstructions-img' src={blankRecipe} alt='Empty recipe book and measuring cups'/>
      <h2>Start saving your recipes today!</h2>
      <p>Click on a recipe</p>
      <p>Add your personal baking notes and then save the recipe for future reference</p>
      <NavLink to='/' >
        <button className='UserInstructions--button'>Get started</button>
      </NavLink>
    </div>
  );
}