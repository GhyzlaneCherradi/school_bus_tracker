import { createDrawerNavigator } from "@react-navigation/drawer"; 
import TabNavigator from "./TabNavigator";
import children from "../screens/parent/children.jsx";
import Tracking from "../screens/parent/tracking.jsx";
const Drawer=createDrawerNavigator(); 
/* retourne un objet qui fournit
{
navigator: "react component", => utilisé pour définir un navigator de type Drawer.
screen: "react component" => utilisé pour déclarer les écrans
pouvant être empilés dans ce navigator.
}
*/
const DrawerNavigator=()=>{
return(
<Drawer.Navigator initialRouteName="DashboardHome">
   <Drawer.Screen name="DashboardHome" component={TabNavigator} options={{ title: "Dashboard" }} />
   <Drawer.Screen name="Children" component={children} />
   <Drawer.Screen name="Tracking" component={Tracking} />
</Drawer.Navigator>
);}

export default DrawerNavigator;