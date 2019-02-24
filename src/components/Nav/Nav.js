import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Nav = (props) => {
  return(
    <div className='Nav--div'>
      <NavLink className='Nav--NavLink--margin' to='/'>Home</NavLink>
      <NavLink className='Nav--NavLink' to='/my-recipes'>My {props.totalUserRecipes} Recipes</NavLink>
    </div>
  );
}

Nav.propTypes = {
  totalUserRecipes: PropTypes.number
}