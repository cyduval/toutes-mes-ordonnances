import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { colors } from 'toutesmesordonnances/constants';

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });

class Prescriptions extends React.Component {

    render() {
      return (
        <SafeAreaView style={{ flex: 1,  flexDirection: 'column', marginTop: 24 }}>
            <Header
                leftComponent={{ size: 30, icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer(), }}
                centerComponent={{ text: 'Mes ordonnances', style: { color: '#fff' } }}
                statusBarProps={{ barStyle: 'light-content' }}
                outerContainerStyles={{  }}
                innerContainerStyles={{  }}
                backgroundColor={colors.main}
            />

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 25 }}>
                <Text>
                  Mes ordonnances
                </Text>
            </View>
        </SafeAreaView>
      );
    }
  }


export default Prescriptions;