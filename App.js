//libraries
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

//components and others
import UserContextProvider from './src/contexts/UserContext';
import MainStack from './src/stacks/MainStack';

export default () => {
  return (
    // allows any screen of the app access to the user's info (avatar,favorites and others)
    <UserContextProvider> 
       {/* Open Navigation */}
      <NavigationContainer>
        {/* get all pages */}
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
};
