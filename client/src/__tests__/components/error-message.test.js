import React from 'react';
import { mount } from 'enzyme';
import ErrorMessage from '../../components/error-message';

describe('with no message passed in', function(){
  it('does not render a div', () => {
    const err = mount(<ErrorMessage msg="" />);
    expect(err.find('div').length).toBe(0);
  });
});

describe('with a message passed in', function(){
  it('renders a div', () => {
    const err = mount(<ErrorMessage msg="An error occurred" />);
    expect(err.find('div').length).toBe(1);
  });
});
