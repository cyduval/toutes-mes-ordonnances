import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

const BG_IMAGE = require('toutesmesordonnances/assets/images/home.jpg');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Home extends React.Component {

    render() {
      return (
        <View style={styles.container}>
            <ImageBackground
                source={BG_IMAGE}
                style={styles.bgImage}
            >
                <View style={styles.content}>
                    <View style={styles.menu}>
                        <Icon
                            style={styles.iconMenu}
                            name='menu'
                            size={30}
                            color="#000000"
                            onPress={() => this.props.navigation.openDrawer()}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                    <Text style={styles.title}>Toutes mes ordonnances</Text>
                    </View>


                    <View style={styles.buttonsRow}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Pharmacies')}>
                            <View style={[styles.buttonInner, styles.buttonInner1]}>
                                <Text style={styles.buttonText}>
                                    Mes pharmacies
                                </Text>           
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Prescriptions')}>
                            <View style={[styles.buttonInner, styles.buttonInner2]}>
                                <Text style={styles.buttonText}>
                                    Envoyer mon ordonnance
                                </Text>           
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonBarContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Pill')}>
                            <View style={styles.buttonBar}>
                                <Text style={styles.buttonText}>
                                Mon pilulier
                                </Text>           
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        </View>
      );
    }
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        flex: 1,
        paddingTop: 25,
    },
    menu: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        // borderStyle: 'solid',
        // borderColor: 'red',
        // borderWidth: 3,
        maxHeight: 40,
        alignItems: 'center',
        // backgroundColor: '#FFFFFF',
    },
    iconMenu: {  
    },
    titleContainer: {  
        marginTop: 10, 
    },
    title: {  
        color: colors.white,
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700',
    },
    buttonsRow: {
        flex: 1, 
        flexDirection: 'row', 
        // borderStyle: 'solid',
        // borderColor: 'red',
        // borderWidth: 1,
        justifyContent: 'space-around', 
    },
    buttonInner: {
        // borderStyle: 'solid',
        // borderColor: 'green',
        // borderWidth: 1,
        backgroundColor: colors.white,
        flex: 1,
        width: (SCREEN_WIDTH / 2) -20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
    },
    buttonInner1: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 0,
    },
    buttonInner2: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 10,
    },
    buttonText: {
        color: colors.main,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    buttonBarContainer: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        backgroundColor: colors.white,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        // borderStyle: 'solid',
        // borderColor: 'green',
        // borderWidth: 1,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
    },
    buttonBar: {

    },   
});



export default Home;