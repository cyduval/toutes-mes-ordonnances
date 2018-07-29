import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Button as ButtonElement, Header, Icon } from 'react-native-elements';
import { colors } from '../../constants';


class MyPharmaciesScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Mes pharmacies',
      drawerIcon: ({ tintColor }) => (
        <Icon
            name='ticket'
            type='font-awesome'
            size={24}
        />
      ),
    };
  
    render() {
      return (
        <SafeAreaView style={{ flex: 1,  flexDirection: 'column', marginTop: 24 }}>
            <Header
                leftComponent={{ size: 30, icon: 'md-arrow-round-back', type: 'ionicon', color: '#fff', onPress: () => this.props.navigation.navigate('Home') }}
                centerComponent={{ text: 'Mes pharmacies', style: { color: '#fff' } }}
                rightComponent={{ size: 30, icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{  }}
                innerContainerStyles={{  }}
                backgroundColor={colors.main}
            />

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 25 }}>
                <Text>
                  Mes pharmacies
                </Text>
            </View>
        </SafeAreaView>
      );
    }
  }


export default MyPharmaciesScreen;