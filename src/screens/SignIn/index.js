// import libraries
import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

//import components and others
import { UserContext } from '../../contexts/UserContext';
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

// Import logos and other images
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    //used for navigation between screens
    const navigation = useNavigation();

    // create states to save and set email and password
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    //Function to login and go to main page
    const handleSignClick = async () => {
        if(emailField != '' && passwordField != ''){

            let json = await Api.signIn(emailField, passwordField);
            if(json.token) {
                await AsyncStorage.setItem('token', json.token);  //save token 

                userDispatch({   //save context
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({ //send to next screen
                    routes:[{name:'MainTab'}]
                });

            } else {
                alert('E-mail e/ou senha errados!');
            }

        } else {
            alert("Preencha os campos!")
        }
    }

    //Function to go to the register screen
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]   //Send an Object called routes, that is an array with another object called name with 
        })                               //the name of the route
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>

                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail" 
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                 />

                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha" 
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                 />


                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>

            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    )
}