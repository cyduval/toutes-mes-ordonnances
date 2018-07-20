import React from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  lastname: t.String,
  firstname: t.String,
  secu: t.String,
  phone: t.String,
  email: t.String,
  pregnant: t.Boolean,
  breastfeed: t.Boolean,
  comment: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    lastname: {
        label: 'nom du patient (obligatoire)',
        placeholder: 'nom du patient (obligatoire)',
        error: 'obligatoire'
    },
    firstname: {
        label: 'prénom du patient (obligatoire)',
        error: 'obligatoire'
    },
    secu: {
        label: 'votre numéro de sécurité sociale (obligatoire)',
        error: 'obligatoire'
    },
    phone: {
        label: 'votre numéro de téléphone (obligatoire)',
        error: 'obligatoire'
    },
    email: {
      label: 'votre email (obligatoire)',
      error: 'obligatoire'
    },
    pregnant: {
        label: 'etes vous enceinte ?',
    },
    breastfeed: {
        label: 'Allaitez-vous ?',
    },
    comment: {
        label: 'votre message (Merci de préciser le jour et l\'heure de votre passage',
        multiline: true,
        stylesheet: {
          ...Form.stylesheet,
          textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
              height: 200,
              textAlignVertical: 'top',
            },
            error: {
              ...Form.stylesheet.textbox.error,
              height: 200,
            },
          },
        },
      },
  },
  stylesheet: formStyles,
};

export default class Formu extends React.Component  {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }
  
  render() {
    return (
        <ScrollView>
            <View style={styles.container}>
            <Form 
                ref={c => this._form = c}
                type={User} 
                options={options}
            />
            <Button
                title="Sign Up!"
                onPress={this.handleSubmit}
            />
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
