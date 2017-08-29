import React from 'react';
import PropTypes from 'prop-types';
import MarvelImage from './marvel-image';

export default class Character extends React.Component{
  render(){
    return(
      <div className="character-area">
        <MarvelImage imageData={this.props.character.thumbnail} />
        <div className="name">
          {this.props.character.name}
        </div>
        <div className="description">
          {this.props.character.description}
        </div>
      </div>
      );
  }
}

Character.propTypes = {
  character: PropTypes.object
};
