import React from 'react';

export default class Comic extends React.Component{
  render(){
    if(this.props.msg){
      return (
        <div className="alert alert-danger">
          {this.props.msg}
        </div>
      );
    }
    return null;
  }
}
