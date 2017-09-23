import React from 'react';
import PropTypes from 'prop-types';
import MarvelImage from './marvel-image';
import { Grid, Row, Col } from 'react-bootstrap';
import '../style/character.css';

export default class Comic extends React.Component{
  render(){
    return(
      <div className="comic-area">
        <Grid>
          <Row>
            <Col sm={8} smPush={4}>
              <div className="description-area">
                <h3>{this.props.comic.title}</h3>
                {this.props.comic.description}
              </div>
            </Col>
            <Col sm={4} smPull={8}>
              <MarvelImage imageData={this.props.comic.imageData} />
            </Col>
          </Row>
        </Grid>
      </div>
      );
  }
}

Comic.propTypes = {
  comic: PropTypes.object
};
