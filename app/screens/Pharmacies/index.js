import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Constants } from 'expo';
import Header from 'app/components/Header';

class Pharmacies extends React.Component {

    render() {
      const { prescription } = this.props;
      return (
        <View style={styles.root}>
          <Header
            icon="menu"
            onPress={() => this.props.navigation.openDrawer()}
            text="Mes pharmacies"
          />

          <View style={styles.container}>

            {prescription.pharmacies.map((marker) => {
                
                return (<ListItem
                  key={marker.id}
                  title={marker.title}
                  subtitle={marker.description}
                  leftIcon={{ name: 'home' }}
                  containerStyle={styles.item}
                  onPress={() => this.props.navigation.navigate('Place',{ pharmacieId: marker.id })}
                />
                );}
            )}

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
    item: {
      width: '100%', 
      height: 70,
      borderBottomWidth: 2,
      borderColor: '#F5F5F5',
      borderStyle: 'solid',
      marginBottom: 3,
    },
  });



const mapStateToProps = state => ({
  prescription: state.prescription,
});

function mapDispatchToProps(dispatch) {
  return {
    // onSelect: data => dispatch(setPharmacie(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Pharmacies);