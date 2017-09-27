import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import MarvelImage from '../components/marvel-image';

const IMAGE_DATA = {
  path: 'http://test.com',
  extension: 'png'
}
const DEFAULT_STYLE = 'portrait_uncanny';

const _imageFormat = (imageData, imageStyle) =>
  `${imageData.path}/${imageStyle}.${imageData.extension}`

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MarvelImage imageData={IMAGE_DATA} />, div);
});

it('does not render when no imageData passed in', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MarvelImage />, div);
});

it('renders proper image url format using imageData passed in', () => {
  const image = shallow(<MarvelImage imageData={IMAGE_DATA} />);
  expect(image.instance()._url()).toBe(_imageFormat(IMAGE_DATA, DEFAULT_STYLE));
});

it('uses default style when no style passed in', () => {
  expect(MarvelImage.defaultProps.imageStyle).toEqual(DEFAULT_STYLE);
});

it('uses custom style passed in', () => {
  const image = shallow(<MarvelImage imageData={IMAGE_DATA} imageStyle="standard_small" />);
  expect(image.instance()._url()).toBe(_imageFormat(IMAGE_DATA, 'standard_small'));
});

describe('with no image data passed in', function(){
  it('does not render an img', () => {
    const image = mount(<MarvelImage />);
    expect(image.find('img').length).toBe(0);
  });
});

describe('with valid image data passed in', function(){
  it('does render an img', () => {
    const image = mount(<MarvelImage imageData={IMAGE_DATA} />);
    expect(image.find('img').length).toBe(1);
  });
});
