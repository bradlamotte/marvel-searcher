import React from 'react';
import PropTypes from 'prop-types';
import MarvelImage from './marvel-image';
import { Grid, Row, Col } from 'react-bootstrap';
import '../style/character.css';

export default class Character extends React.Component{
  render(){
    return(
      <div className="character-area">
        <Grid>
          <Row>
            <Col sm={8} smPush={4}>
              <div className="description-area">
                <h3>{this.props.character.name}</h3>
                {this.props.character.description}
              </div>
            </Col>
            <Col sm={4} smPull={8}>
              <MarvelImage imageData={this.props.character.thumbnail} />
            </Col>
          </Row>
        </Grid>
      </div>
      );
  }
}

Character.propTypes = {
  character: PropTypes.object
};
