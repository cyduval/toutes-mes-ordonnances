import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Icon, Text, Overlay } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

class New extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    const firestore = firebase.firestore();
    const settings = {
      timestampsInSnapshots: true
    };
    firestore.settings(settings);

    const userUid = this.props.auth.user.uid;
    this.ref = firestore.collection(userUid);
  }


    send = function() {
      const { auth, prescription } = this.props;
      if (auth.loginStatus !== 'logged') {
        this.setState({isVisible: true});
        return;
      }

      console.log(4444);
      console.log(auth);

      this.ref.add({
        uri: prescription.photo,
        pharmacie: prescription.pharmacie.title,
      });
      this.props.navigation.navigate('Home');
 
    };

    render() {
      const { prescription } = this.props; 
      const isSendEnabled = prescription && prescription.photo && prescription.pharmacie;
      return (
        <View style={styles.container}>


          <View style={{ flex: 1 }}>

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

          <Button
            icon={<Icon name='add' color='#ffffff' />}
            fontFamily='Lato'
            disabled={!isSendEnabled}
            buttonStyle={styles.button}
            title='Envoyer' 
            onPress={() => this.send()}
            containerStyle={[styles.containerButton, {justifyContent: 'flex-end'}]}
          />

            <Overlay
              isVisible={this.state.isVisible}
              onBackdropPress={() => this.setState({isVisible: false})}
              height={200}
            >
              <Text h5 style={{ fontWeight: '500' }}>Vous devez être logué pour envoyer votre ordonnance</Text>

              <View style={styles.chooseActions}>
                <Button
                  buttonStyle={styles.chooseButton1}
                  title='Annuler' 
                  onPress={() => this.setState({isVisible: false})}
                  containerStyle={styles.containerButton1}
                />
                <Button
                  buttonStyle={styles.chooseButton2}
                  title='S\identifier' 
                  onPress={() => { this.setState({isVisible: false}); this.props.navigation.navigate('Account'); } }
                  containerStyle={styles.containerButton1}
                />
              </View>
            </Overlay>
          
        </View>
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
    },
    chooseActions: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerButton1: {
      margin: 10,
    },
    chooseButton1: {
      margin: 5,
      backgroundColor: '#f10031',
      padding: 5,
    },
    chooseButton2: {
      margin: 5,
      backgroundColor: colors.main,
      padding: 5,
    },  
  });


const mapStateToProps = state => ({
  prescription: state.prescription,
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
)(New);