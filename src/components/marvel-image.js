import React from 'react';
import PropTypes from 'prop-types';

export default class MarvelImage extends React.Component{
  _style(){
    return `portrait_${this.props.style}`;
  }

  _url(){
    return `${this.props.imageData.path}/${this._style()}.${this.props.imageData.extension}`;
  }

  render(){
    return <img src={this._url()} alt="Marvel" />;
  }
}

MarvelImage.propTypes = {
  imageData: PropTypes.shape({ path: PropTypes.string, extension: PropTypes.string }),
  style: PropTypes.oneOf(['small', 'medium', 'xlarge', 'fantastic', 'uncanny', 'incredible'])
};

MarvelImage.defaultProps = {
  style: 'uncanny'
};
