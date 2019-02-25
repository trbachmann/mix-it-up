import React from 'react';
import blankRecipe from '../../images/kara-eads-unsplash.jpg';

export const Error404 = () => {
  return(
    <div className='Error404'>
      <h1>No recipe found</h1>
      <img className='Error404--img' src={blankRecipe} alt='Empty recipe book and measuring cups'/>
      <p className='Error404--p--credit'>Photo by Kara Eads on Unsplash</p>
    </div>
  );
}