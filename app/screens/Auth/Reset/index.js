import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Header, Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

class Reset extends React.Component {
    static navigationOptions = {
        title: 'Reset',
    };
  
    render() {
      return (
        <View style={styles.root}>
            <Header
              leftComponent={{ size: 30, icon: 'keyboard-backspace', color: '#fff', onPress: () => this.props.navigation.goBack(), }}
              centerComponent={{ text: 'Mot de passe oublié', style: { color: '#fff' } }}
              statusBarProps={{ barStyle: 'light-content' }}
              outerContainerStyles={{ width: '100%'  }}
              innerContainerStyles={{  }}
              backgroundColor={colors.main}
            />
            <View style={styles.container}>
                <Text>
                    Reset
                </Text>
            </View>

        </View>
      );
    }
  }
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: Constants.statusBarHeight,
      },
      container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        // justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%',
      },
});


const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
});

function mapDispatchToProps(dispatch) {
  return {

  };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

export default compose(
    withConnect,
  )(Reset);