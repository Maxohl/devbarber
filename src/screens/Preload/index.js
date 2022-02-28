// import libraries
import React, { useEffect, useContext } from 'react';

//import components and others
import Api from '../../Api';
import { Container, LoadingIcon } from './styles';
import BarberLogo from '../../assets/barber.svg';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

// everytime the screen opens, run the following code (useeffect)
    useEffect(() => {
        const checkToken = async () => {
            // verify if the user has already logged before
            const token = await AsyncStorage.getItem('token');
            if(token) {
                //validate token
                let res = await Api.checkToken(token);
                if(res.token) {
                    await AsyncStorage.setItem('token', res.token);  //save token 

                    userDispatch({   //save context
                        type: 'setAvatar',
                        payload: {
                            avatar: res.data.avatar
                        }
                    });
    
                    navigation.reset({ //send to next screen
                        routes:[{name:'MainTab'}]
                    });

                } else {
                    navigation.navigate('SignIn'); 
                }
            } else {
                navigation.navigate('SignIn');
            }
        }

        checkToken();

    }, []);

    return (
        <Container>
            <BarberLogo width="100%" height="160" /> 
            <LoadingIcon size="large" color="#FFF" />
        </Container>
    )
}