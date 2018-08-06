import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { View, StyleSheet, Image } from 'react-native';
import { Header, Button, Icon, Text, Overlay } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import { sendPrescription } from 'app/screens/Prescriptions/actions';
import { Constants } from 'expo';
// import * as moment from 'moment';

import moment from 'moment';
// import mail from 'toutesmesordonnances/utils/mail';

class New extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    if (this.props.auth && this.props.auth.user) {
      const firestore = firebase.firestore();
      const settings = {
        timestampsInSnapshots: true
      };
      firestore.settings(settings);

      const userUid = this.props.auth.user.uid;
      this.ref = firestore.collection(userUid);
    }
  }



    send1 = async() => {
      console.log(11);
      const { app, auth, prescription } = this.props;
      if (auth.loginStatus !== 'logged') {
        this.setState({isVisible: true});
        return;
      }

      if (app.isNetwork === 'none' || app.isNetwork === 'unknown' || app.isNetwork === 'undefined') {
        noNetwork();
        return;
      }


      console.log(111);
      console.log(  moment().format('YYYY-MM-DD HH:mm:ss')  );

      this.ref.add({
        uri: prescription.photo.uri,
        base64: prescription.photo.base64,
        pharmacie: prescription.pharmacie.title,
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
      });


      const response = await fetch(
        'https://www.toutemapharmacie.com/public/scan/new2.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ordonnance: prescription.photo.base64, 
            pharmacie: prescription.pharmacie.title, 
            user: auth.user
          })
        }
      );
      if (response.status !== 200) {
        throw new Error(`Got back HTTP status ${response.status}`);
      }
      console.log(22);
      this.props.navigation.navigate('List');
  
      // alert(11);

      // const body = await response.json();
      // alert(body);
      // alert(JSON.stringify(body));


      /*
      const response = await fetch(
        'https://www.toutemapharmacie.com/'
      );
      console.log(22);
      if (response.status !== 200) {
        throw new Error(`Got back HTTP status ${response.status}`);
      }
      console.log(33);
      console.log(response);
      alert(response.data);
      // const body = await response.json();
      // console.log(body);
      */
    };


    send = async() => {
      
      const { auth, prescription } = this.props;
      if (auth.loginStatus !== 'logged') {
        this.setState({isVisible: true});
        return;
      }

      console.log(4444);
      console.log(auth);

      this.ref.add({
        uri: prescription.photo.uri,
        pharmacie: prescription.pharmacie.title,
        date: moment().format('YYYY-MM-DD hh:ii:ss'),
      });

      console.log(8888);
      try {
        let response = await fetch('https://www.toutemapharmacie.com/public/scan/new2.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ordonnance: prescription.photo.base64, 
            pharmacie: prescription.pharmacie.title, 
            user: auth.user
          }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
      } catch (error) {
        console.error('pbpbpb');
        console.error(error);
      }

      console.log(9999);
      /*
      fetch('https://www.toutemapharmacie.com/public/scan/new2.php')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
      */
      


      // this.props.onSend({ ordonnance: prescription.photo, pharmacie: prescription.pharmacie.title, user: auth.user });
      this.props.navigation.navigate('Home');
    };

    render() {
      const { prescription } = this.props; 
      const isSendEnabled = prescription && prescription.photo && prescription.pharmacie;
      return (
        <View style={styles.root}>
          <Header
              leftComponent={{ size: 30, icon: 'keyboard-backspace', color: '#fff', onPress: () => this.props.navigation.goBack(), }}
              centerComponent={{ text: 'Mes ordonnances', style: { color: '#fff' } }}
              statusBarProps={{ barStyle: 'light-content' }}
              outerContainerStyles={{ width: '100%'  }}
              innerContainerStyles={{  }}
              backgroundColor={colors.main}
          />
          <View style={styles.container}>

            {
              prescription.photo ?
              (<View style={styles.element}>
                <Image
                  source={{uri: prescription.photo.uri}}
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
            onPress={() => this.send1()}
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
  app: state.app,
});

function mapDispatchToProps(dispatch) {
  return {
    onSend: data => dispatch(sendPrescription(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(New);