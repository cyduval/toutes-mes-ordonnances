import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { Button as ButtonElement, Header, Icon } from 'react-native-elements';
import { colors } from '../../constants';
import MyPharmaciesScreen from '../MyPharmacies';
import MyPrescriptionsScreen from '../MyPrescriptions';
import MyPillScreen from '../MyPill';

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });

class HomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
            name='home'
            type='font-awesome'
            size={24}
        />
      ),
    };
  
    render() {
      return (
        <SafeAreaView style={{ flex: 1,  flexDirection: 'column', marginTop: 24 }}>
            <Header
                leftComponent={{ size: 30, icon: 'home', color: '#fff' }}
                centerComponent={{ text: 'Home', style: { color: '#fff' } }}
                rightComponent={{ size: 30, icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{  }}
                innerContainerStyles={{ }}
                backgroundColor={colors.main}
            />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 20, width: '100%' }}>

                <ButtonElement
                    raised
                    title='Mes pharmacies'
                    buttonStyle={{
                        backgroundColor: colors.main,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        padding: 5,
                        height: '100%',
                    }}
                    titleProps={{ fontSize: 30 }}
                    containerStyle={{ width: '35%', height: '100%' }}
                    onPress={() => this.props.navigation.navigate('MyPharmacies')}
                />

                <ButtonElement
                    raised
                    title='Envoyer mon ordonnance'
                    buttonStyle={{
                        backgroundColor: colors.main,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        padding: 5,
                        height: '100%',
                    }}
                    titleProps={{ fontSize: 30 }}
                    containerStyle={{ width: '35%', height: '100%' }}
                    onPress={() => this.props.navigation.navigate('MyPrescriptions')}
                />

            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <ButtonElement
                    raised
                    icon={{name: 'pill', type: 'material-community', size: 30, color: colors.white}}
                    title='Mon pilulier'
                    buttonStyle={{
                        backgroundColor: colors.main,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        padding: 5,
                    }}
                    titleProps={{ fontSize: 30 }}
                    containerStyle={{ width: '80%' }}
                    onPress={() => this.props.navigation.navigate('MyPill')}
                />
            </View>
        </SafeAreaView>
      );
    }
  }
  

  
  export default createDrawerNavigator({
    Home: {
      screen: HomeScreen,
    },
    MyPharmacies: {
        screen: MyPharmaciesScreen,
    },
    MyPrescriptions: {
        screen: MyPrescriptionsScreen,
    },
    MyPill: {
        screen: MyPillScreen,
    },
  }, {
    drawerPosition: 'right',
  });