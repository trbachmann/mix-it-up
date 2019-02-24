import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from './Nav';

const mocktotalUserRecipes = 4;

describe('Nav', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Nav totalUserRecipes={mocktotalUserRecipes}/>);
    expect(wrapper).toMatchSnapshot();
  })
});