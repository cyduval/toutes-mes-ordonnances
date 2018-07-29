import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { colors } from '../../constants';

  
class MyPillScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Mon pilulier',
      drawerIcon: ({ tintColor }) => (
        <Icon
            name='pill'
            type='material-community'
            size={24}
        />
      ),
    };
  
    render() {
      return (
        <SafeAreaView style={{ flex: 1,  flexDirection: 'column', marginTop: 24 }}>
            <Header
                leftComponent={{ size: 30, icon: 'md-arrow-round-back', type: 'ionicon', color: '#fff', onPress: () => this.props.navigation.navigate('Home')  }}
                centerComponent={{ text: 'Mon pilulier', style: { color: '#fff' } }}
                rightComponent={{ size: 30, icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{ }}
                innerContainerStyles={{  }}
                backgroundColor={colors.main}
            />

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text>
                    Mon pilulier
                </Text>
            </View>

        </SafeAreaView>
      );
    }
  }


export default MyPillScreen;