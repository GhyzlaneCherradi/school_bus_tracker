import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import Profile from "../screens/parent/profile.jsx";
import Settings from "../screens/parent/settings.jsx";
import alert from "../screens/parent/alert.jsx";

const Tab=createBottomTabNavigator(); 
/* retourne un objet qui fournit
{
navigator: "react component", => utilisé pour définir un navigator de type Tab.
screen: "react component" => utilisé pour déclarer les écrans
pouvant être empilés dans ce navigator.
}
*/
const TabNavigator=()=>{
return(
<Tab.Navigator initialRouteName="profile">
    <Tab.Screen name="profile" component={Profile}></Tab.Screen>
    <Tab.Screen name="alert" component={alert}></Tab.Screen>
    <Tab.Screen name="settings" component={Settings}></Tab.Screen>
</Tab.Navigator>
);}

export default TabNavigator;