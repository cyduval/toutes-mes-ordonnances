import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

class Pill extends React.Component {
  
    render() {
      return (
        <SafeAreaView style={{ flex: 1,  flexDirection: 'column', marginTop: 24 }}>
            <Header
                leftComponent={{ size: 30, icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                centerComponent={{ text: 'Mon pilulier', style: { color: '#fff' } }}
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


export default Pill;