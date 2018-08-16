import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View          // Container component
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';
import Swiper from './Swiper';


export default class Onboarding extends Component {
  render() {
    return (
      <Swiper onboardingFinish={this.props.onboardingFinish} >
        {/* First screen */}
        <View style={[styles.slide, { backgroundColor: colors.main}]}>
          <Icon name="file-o" type="font-awesome" color="#FFFFFF" size={100} />
          <Text style={styles.header}>ORDONNANCES</Text>
          <Text style={styles.text}>Sanner votre ordonnance et envoyez la à votre pharmacien</Text>
        </View>
        {/* Second screen */}
        <View style={[styles.slide, { backgroundColor: '#4AAFEE' }]}>
          <Icon name="medical-bag" type="material-community" color="#FFFFFF" size={100} />
          <Text style={styles.header}>MEDICAMENTS</Text>
          <Text style={styles.text}>Scannez le code barre d'un médicament pour lire la notice</Text>
        </View>
        {/* Third screen */}
        <View style={[styles.slide, { backgroundColor: '#FC515B' }]}>
          <Icon name="pill" type="material-community" color="#FFFFFF" size={100} />
          <Text style={styles.header}>PILULIER</Text>
          <Text style={styles.text}>Gérez et organisez la fréquence de vos prises de médicaments</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
  },
});