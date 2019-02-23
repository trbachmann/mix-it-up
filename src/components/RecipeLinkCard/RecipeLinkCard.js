import React from 'react';
import { Link } from 'react-router-dom';

export const RecipeLinkCard = (props) => {
  const { recipe } = props;
  let pathToUse;
  (recipe.notes === '') ? (pathToUse = '/desserts/') : (pathToUse = '/my-recipes/')
  return(
    <Link className='RecipeLinkCard--Link' to={pathToUse + recipe.id}>
      <div className='RecipeLinkCard--div'>
        <img className='RecipeLinkCard-img' src={recipe.images[0].hostedLargeUrl} alt={recipe.name}/>
        <h2>{recipe.name}</h2>
        <p>Time: {recipe.totalTime}</p>
        <p>From: {recipe.source.sourceDisplayName}</p>
      </div>
    </Link>
  );
}