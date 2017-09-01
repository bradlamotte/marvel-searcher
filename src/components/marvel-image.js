import React from 'react';
import PropTypes from 'prop-types';

export default class MarvelImage extends React.Component{
  _style(){
    return `portrait_${this.props.style}`;
  }

  _url(){
    return `${this.props.imageData.path}/${this.props.style}.${this.props.imageData.extension}`;
  }

  render(){
    return <img src={this._url()} alt="Marvel" />;
  }
}

MarvelImage.propTypes = {
  imageData: PropTypes.shape({ path: PropTypes.string, extension: PropTypes.string }),
  style: PropTypes.oneOf([
    'portrait_small',
    'portrait_medium',
    'portrait_xlarge',
    'portrait_fantastic',
    'portrait_uncanny',
    'portrait_incredible',
    'standard_small',
    'standard_medium',
    'standar_large',
    'standard_xlarge',
    'standard_fantastic',
    'standard_amazing',
    'landscape_small',
    'landscape_medium',
    'landscape_large',
    'landscape_xlarge',
    'landscape_amazing',
    'landscape_incredible'
  ])
};

MarvelImage.defaultProps = {
  style: 'portrait_uncanny'
};
