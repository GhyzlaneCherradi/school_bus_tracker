import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator'
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { useState } from 'react';
export default function App(){
  const [isloggedin,setisloggedin] =useState(false);
  
  return (
    <NavigationContainer>
       {isloggedin ? <DrawerNavigator/>:<StackNavigator isloggedin={isloggedin} setisloggedin={setisloggedin}/>}
   </NavigationContainer>
  );
}

