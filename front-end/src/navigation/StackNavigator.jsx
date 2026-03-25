import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/home.jsx"
import LoginScreen from "../screens/login.jsx"
import SignupScreen from "../screens/Signup.jsx";

const Stack=createNativeStackNavigator(); 

const StackNavigator=({isloggedin,setisloggedin})=>{
return(
<Stack.Navigator initialRouteName="home">
    <Stack.Screen name="home" component={HomeScreen}></Stack.Screen>
    <Stack.Screen name="login" component={LoginScreen}
    initialParams={{isloggedin:isloggedin,setisloggedin:setisloggedin}}></Stack.Screen>
    <Stack.Screen name="signUp" component={SignupScreen} options={{headerShown:false}}>
    </Stack.Screen>
</Stack.Navigator>
);}

export default StackNavigator;