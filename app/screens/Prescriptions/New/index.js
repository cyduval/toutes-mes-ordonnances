import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

class New extends React.Component {

    render() {
      const { prescription } = this.props; 
      
      return (
      <ScrollView>
        <View style={styles.container}>

          {
            prescription.photo ?
            (<View style={styles.element}>
              <Image
                source={{uri: prescription.photo}}
                style={styles.picture}
               />
              <Button
                icon={<Icon name='camera' color='#ffffff' />}
                fontFamily='Lato'
                buttonStyle={styles.button}
                title='Changer la photo' 
                onPress={() => this.props.navigation.navigate('Snap')}
                containerStyle={styles.containerButton}
              />
            </View>)
            :
            (<View style={styles.element}>
              <Button
                icon={<Icon name='camera' color='#ffffff' />}
                fontFamily='Lato'
                buttonStyle={styles.button}
                title='Ajouter une photo' 
                onPress={() => this.props.navigation.navigate('Snap')}
                containerStyle={styles.containerButton}
              />
            </View>)
          }

          {
            prescription.pharmacie ?
            (<View style={styles.element}>
              <Text h5 style={{ fontWeight: '700' }}>
                { prescription.pharmacie.title }
              </Text>
              <Text h5>
                { prescription.pharmacie.description }
              </Text>
              <Button
                icon={<Icon name='add' color='#ffffff' />}
                fontFamily='Lato'
                buttonStyle={styles.button}
                title='Changer sa pharmacie' 
                onPress={() => this.props.navigation.navigate('Choose')}
                containerStyle={styles.containerButton}
              />
            </View>)
            :
            (<View style={styles.element}>
              <Button
                icon={<Icon name='add' color='#ffffff' />}
                fontFamily='Lato'
                buttonStyle={styles.button}
                title='Choisir sa pharmacie' 
                onPress={() => this.props.navigation.navigate('Choose')}
                containerStyle={styles.containerButton}
              />
            </View>)
          }

          
        </View>
      </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 15,
    },
    containerButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    button: {
      margin: 15,
      backgroundColor: colors.main,
      padding: 10,
      width: '100%',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: 1,
      height: 1,
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20
    },
    picture: {
      width: 50,
      height: 50,
    },
    element: {
      flex: 1,
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: '#DDDDDD',
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: '#FFFFFF',
      padding: 15,
      width: '100%',
      marginTop: 15,
    }
  });


const mapStateToProps = state => ({
  prescription: state.prescription,
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
)(New);