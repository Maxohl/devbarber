//import libraries
import React from 'react';
import styled from 'styled-components/native';


// main area of the app
export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex : 1;
    justify-content : center;
    align-items : center

`;

// area for inputs
export const InputArea = styled.View`
    padding: 40px;
    width: 100%;
`;

// Login button
export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #268596;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
// Text of Login Button
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;

`;

// Go to Register button
export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;
// First half of text of the Go to register button
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #268596
`;
// Second half of the text of the Go to register button
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #268596;
    font-weight: bold;
    margin-left: 5px;
`;