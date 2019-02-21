import React from 'react';

const RecipeCard = (props) => {
  return(
    <div className='RecipeCard'>
      <h2>{props.name}</h2>
    </div>
  );
}

export default RecipeCard;