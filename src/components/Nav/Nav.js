import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return(
    <div className='Nav--div'>
      <NavLink className='Nav--NavLink--margin' to='/'>Home</NavLink>
      <NavLink className='Nav--NavLink' to='/my-recipes'>My Recipes</NavLink>
    </div>
  )
}