import React from 'react';
import {
    Image,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

class OnBoardingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
      }

    async onFinish() {
        this.props.onboardingFinish();
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
                            require('toutesmesordonnances/assets/1.png')
                        }
                        />,
                        title: 'Onboarding 1',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: '#fff',
                        image: < Image source = {
                            require('toutesmesordonnances/assets/2.png')
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