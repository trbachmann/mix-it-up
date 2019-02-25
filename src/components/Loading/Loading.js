import React from 'react';
import mixingImg from '../../images/charisse-kenion-unsplash.jpg';

export const Loading = () => {
  return(
    <div className='Loading'>
      <h1>Mixing up some great recipes...</h1>
      <img
        className='Loading--img' 
        src={mixingImg} 
        alt='chocolate chip cookie dough in a mixing bowl'/>
      <p className='Loading--p--credit'>Photo by Charisse Kenion on Unsplash</p>
    </div>
  );
}