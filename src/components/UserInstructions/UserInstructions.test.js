import React from 'react';
import { shallow } from 'enzyme';
import { UserInstructions } from './UserIntructions';

describe('UserInstructions', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<UserInstructions />);
    expect(wrapper).toMatchSnapshot();
  });
});