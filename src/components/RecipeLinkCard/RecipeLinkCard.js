import React from 'react';
import { Link } from 'react-router-dom';

export const RecipeLinkCard = (props) => {
  const { recipe } = props;
  return(
    <Link to={'/desserts/'+ recipe.id}>
      <div className='RecipeLinkCard'>
        <img src={recipe.images[0].hostedLargeUrl}/>
        <h2>{recipe.name}</h2>
        <p>Time: {recipe.totalTime}</p>
        <p>From: {recipe.source.sourceDisplayName}</p>
      </div>
    </Link>
  );
}