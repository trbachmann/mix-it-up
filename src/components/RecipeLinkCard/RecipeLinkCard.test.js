import React from 'react';
import { RecipeLinkCard } from './RecipeLinkCard';
import { shallow } from 'enzyme';
import * as data from '../../mockData';

describe('RecipeLinkCard', () => {
  it('should match the snapshot when the recipe props has not notes', () => {
    const mockProps = data.mockRecipesWithUserNotes[0];
    const wrapper = shallow(<RecipeLinkCard recipe={mockProps}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when the recipe props has notes', () => {
    const mockProps = data.mockRecipesWithUserNotes[1];
    const wrapper = shallow(<RecipeLinkCard recipe={mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});