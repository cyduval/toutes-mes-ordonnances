import React from 'react';
import {
    compose
} from 'redux';
import {
    connect
} from 'react-redux';
import {
    Image,
    AsyncStorage
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

class OnBoardingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
      }

    async onFinish() {
        console.log(8888);
        try {
            await AsyncStorage.setItem('onboarding', 'yes');
            this.props.onboardingFinish();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return ( <Onboarding 
            onDone = {
                this.onFinish
            }
            onSkip = {
                this.onFinish
            }
            pages = {
                [{
                        backgroundColor: '#fff',
                        image: < Image source = {
                            require('../../assets/1.png')
                        }
                        />,
                        title: 'Onboarding 1',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image: < Image source = {
                            require('../../assets/2.png')
                        }
                        />,
                        title: 'Onboarding 2',
                        subtitle: 'eeeeeee',
                    },
                ]
            }
            />
        );
    }
}

export default OnBoardingScreen;