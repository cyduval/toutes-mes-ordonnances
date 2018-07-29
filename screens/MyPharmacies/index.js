import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import { Button as ButtonElement, Header } from 'react-native-elements';
import { colors } from '../../constants';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

class MyPharmaciesScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Mes pharmacies',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../../assets/icons/chats-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
        <View style={{ flex: 1,  flexDirection: 'column'}}>
            <Header
                leftComponent={{ icon: 'md-arrow-round-back', type: 'ionicon', color: '#fff', onPress: () => this.props.navigation.goBack() }}
                centerComponent={{ text: 'Mes pharmacies', style: { color: '#fff' } }}
                rightComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{  }}
                innerContainerStyles={{  }}
                backgroundColor={colors.main}
            />

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text>
                  Mes pharmacies
                </Text>
            </View>
        </View>
      );
    }
  }


export default MyPharmaciesScreen;