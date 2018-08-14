import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Text, Overlay } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import { sendPrescription, resetPrescription } from 'app/screens/Prescriptions/actions';
import { Constants } from 'expo';
import Header from 'app/components/Header';

import { addPrescription } from 'toutesmesordonnances/utils/firebase';

import sendEmail from 'toutesmesordonnances/utils/sendEmail';

import OverlayLogin from 'app/components/OverlayLogin';
import noNetwork from 'toutesmesordonnances/utils/noNetwork';
import isNetwork from 'toutesmesordonnances/utils/isNetwork';
import NoNetwork from 'app/components/NoNetwork';

import Snap from 'app/screens/Prescriptions/Snap';
import Choose from 'app/screens/Prescriptions/Choose';
import Form from 'app/screens/Prescriptions/Form';
import StepIndicator from 'react-native-step-indicator';

// import mail from 'toutesmesordonnances/utils/mail';

const labels = ["Scanner son ordonnance","Choisir sa pharmacie","mes infos"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.main,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.main,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colors.main,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.main,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.main,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: colors.main
};


class New extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            currentPosition: 0,
        };
        this.onPageChange = this.onPageChange.bind(this);
    }

    componentWillMount() {
        this.props.onResetPrescription();
    }
  
    onSubmitForm = async(datas) => {
        const { app, auth, prescription } = this.props;
        if (auth.loginStatus !== 'logged') {
            this.setState({isVisible: true});
            return;
        }

        if (!isNetwork(app.isNetwork)) {
            noNetwork();
            return;
        }

        const d = {
            ...datas, 
            uri: prescription.photo.uri, 
            pharmacie: prescription.pharmacie.title
        };

        const result = await addPrescription(d);
        console.log(11111);
        console.log(result);

        const d1 = {
            ...d, 
            url: result, 
        };

        this.props.onResetPrescription();

        await sendEmail(d1);


        this.props.navigation.navigate('List');
  
    };

    onPageChange(position){
        console.log('onPageChange');
        console.log(position);
        this.setState({currentPosition: position});
    }



    renderStep(){
        const { currentPosition } = this.state; 
        console.log('renderStep');
        console.log(currentPosition);
        switch (currentPosition) {
          case 1:
            return <Choose back={() => {this.onPageChange(0); }}  next={() => {this.onPageChange(2); }} />;
          case 2:
            return <Form onSubmitForm={(datas) => this.onSubmitForm(datas)} back={() => {this.onPageChange(1); }}  />;
          default:
            return <Snap next={() => {this.onPageChange(1); }}  />;
        }
    }

   
    render() {
      const { auth, app, prescription } = this.props; 
      const isSendEnabled = prescription && prescription.photo && prescription.pharmacie;

      if (auth.loginStatus !== 'logged') {
        return (<OverlayLogin />);
      }

      if (!isNetwork(app.isNetwork)) {
        return <NoNetwork />;
      }

      return (
        <View style={styles.root}>
          <Header
            onPress={() => this.props.navigation.goBack()}
            text="nouvelle ordonnance"
          />
          <View style={styles.container}>

            <View style={styles.stepper}>
              <StepIndicator
                  stepCount={3}
                  customStyles={customStyles}
                  currentPosition={this.state.currentPosition}
                  labels={labels}
                  // onPress={this.onPageChange}
              />
            </View>

            {this.renderStep()}

          </View>


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
      // alignItems: 'center', 
      height: '100%',
      width: '100%',
    },
    stepper: {
      marginTop: 10,
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
    onResetPrescription: () => dispatch(resetPrescription()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(New);