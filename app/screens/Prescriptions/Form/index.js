import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import { setPharmacie } from 'app/screens/Prescriptions/actions';
import { colors } from 'toutesmesordonnances/constants';
import { getUser, updateUser } from 'toutesmesordonnances/utils/firebase';

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        firstname: '',
        lastname: '',
        comment: '',
        secu: '',
        phone: '',
        email: '',
        pregnant: false,
        breastfeed: false,
        cgv: false,
        submitting: false,
    };

  }

    componentWillMount = async () => {
        const u = await getUser();
        if (u) {
            this.setState({ 
                firstname: u.firstname || '',
                lastname: u.lastname || '',
                email: u.email || '',
                secu: u.secu || '',
                phone: u.phone || '',
                pregnant: u.pregnant || false,
                breastfeed: u.breastfeed || false,
            });
        }
    }

    isValidForm() {
        const { firstname, lastname, secu, phone, cgv } = this.state;

        let valid = true;

        if (!firstname) {
            valid = false;
        }
        if (!lastname) {
            valid = false;
        }
        if (!secu) {
            valid = false;
        }
        if (!phone) {
            valid = false;
        }

        if (!cgv) {
            valid = false;
            Alert.alert(
                'Veuillez cocher les cgv svp',
                '',
                [
                    {text: 'Ok', onPress: () => console.log('')},
                ],
                { cancelable: false }
            );
        }
        return valid;
    }

    submit() {
        const { app } = this.props;
        if (!isNetwork(app.isNetwork)) {
            noNetwork();
            return;
        }
        if (this.isValidForm()) {
            console.log('form valide');
            this.setState({ submitting: true });
            updateUser(this.state);
            this.props.onSubmitForm(this.state);
            // this.setState({ submitting: false });
        } else {
            console.log('form invalide');
        }
    }

    render() {
        const { firstname, lastname, secu, phone, email, comment, pregnant, breastfeed, cgv, submitting } = this.state;

        let errorFirstname = null;
        if (submitting && !firstname) {
            errorFirstname = 'prénom requis';
        }

        let errorLastname = null;
        if (submitting && !lastname) {
            errorLastname = 'nom requis';
        }

        let errorPhone = null;
        if (submitting && !phone) {
            errorPhone = 'téléphone requis';
        }

        let errorSecu = null;
        if (submitting && !secu) {
            errorSecu = 'numéro de sécurité social';
        }

        return (
            <View style={styles.content}>
                <View style={styles.form}>
                    <Input
                        placeholder='prénom'
                        onChangeText={firstname => this.setState({ submitting: false, firstname })}
                        errorMessage={errorFirstname}
                        value={firstname}
                        keyboardAppearance='light'
                        autoFocus={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Input
                        placeholder='nom'
                        onChangeText={lastname => this.setState({ submitting: false, lastname })}
                        errorMessage={errorLastname}
                        value={lastname}
                        keyboardAppearance='light'
                        autoFocus={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Input
                        placeholder='email'
                        editable={false}
                        value={email}
                        keyboardAppearance='light'
                        autoFocus={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Input
                        placeholder='téléphone'
                        onChangeText={phone => this.setState({ submitting: false, phone })}
                        errorMessage={errorPhone}
                        value={phone}
                        keyboardAppearance='light'
                        autoFocus={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Input
                        placeholder='numéro de sécurité social'
                        onChangeText={secu => this.setState({ submitting: false, secu })}
                        errorMessage={errorSecu}
                        value={secu}
                        keyboardAppearance='light'
                        autoFocus={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Input
                        placeholder='commentaire'
                        onChangeText={comment => this.setState({ submitting: false, comment })}
                        value={comment}
                        keyboardAppearance='light'
                        autoFocus={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline
                        number={3}
                    />
                    <View style={styles.checkbox}>
                        <CheckBox
                            title='Etes-vous enceinte ?'
                            checked={pregnant}
                            onPress={() => this.setState({pregnant: !this.state.pregnant})}
                        />
                        <CheckBox
                            title='Allaitez-vous ?'
                            checked={breastfeed}
                            onPress={() => this.setState({breastfeed: !this.state.breastfeed})}
                        />
                        <CheckBox
                            title="En cochant cette case je certifie l'éxactitude des informations fournies"
                            checked={cgv}
                            onPress={() => this.setState({cgv: !this.state.cgv})}
                        />
                    </View>
                </View>

                <View style={styles.buttons}>
                <Button
                    fontFamily='Lato'
                    buttonStyle={styles.button}
                    title='Retour' 
                    onPress={() => {this.props.back()}}
                    containerStyle={styles.containerButton}
                />
                <Button
                    fontFamily='Lato'
                    buttonStyle={styles.button}
                    title='Envoyez' 
                    onPress={() => {this.submit()}}
                    containerStyle={styles.containerButton}
                    loading={submitting}
                    disabled={submitting}
                />
                </View>
            </View>
      );
    }
  }

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: 'center',
    },
    form: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      marginTop: 15,
    },
    buttons: {
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    checkbox: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    containerButton: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      width: '45%',
    },
    button: {
      margin: 12,
      backgroundColor: colors.main,
      padding: 7,
      width: '100%',
    },
  });


const mapStateToProps = state => ({
  prescription: state.prescription,
  app: state.app,
});

function mapDispatchToProps(dispatch) {
  return {
    onSelect: data => dispatch(setPharmacie(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Form);