import React, { Component } from 'react';
import { Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { errorSet } from '../actions';


class ErrorMessage extends Component {

  render() {
    return (
      <Overlay 
        isVisible={this.props.error != ''} 
        onBackdropPress={ () => this.props.errorSet('') }
        windowBackgroundColor="rgba(255, 255, 255, .8)"
        overlayBackgroundColor="white"
        width="auto"
        height={200}
        fullscreen
      >
        <Text>{this.props.error}</Text>
      </Overlay>
    );
  }
}


const mapStateToProps = ({ auth }) => {
  const { error } = auth;
  return { error };
};

export default connect(mapStateToProps, {
  errorSet
})(ErrorMessage);
