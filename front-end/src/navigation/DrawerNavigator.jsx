import { createDrawerNavigator } from "@react-navigation/drawer"; 
import { useSelector } from "react-redux";
import TabNavigator from "./TabNavigator";
import Children from "../screens/parent/children.jsx";
import Tracking from "../screens/parent/tracking.jsx";
import AdminPanel from "../screens/admin/AdminPanel.jsx";
const Drawer=createDrawerNavigator(); 
/* retourne un objet qui fournit
{
navigator: "react component", => utilisé pour définir un navigator de type Drawer.
screen: "react component" => utilisé pour déclarer les écrans
pouvant être empilés dans ce navigator.
}
*/
const DrawerNavigator=()=>{
const role = useSelector((state) => state.auth.role);
return(
<Drawer.Navigator initialRouteName="DashboardHome">
   <Drawer.Screen name="DashboardHome" component={TabNavigator} options={{ title: "Dashboard" }} />
   <Drawer.Screen name="Children" component={Children} />
   <Drawer.Screen name="Tracking" component={Tracking} />
   {role === "admin" && <Drawer.Screen name="Admin" component={AdminPanel} />}
</Drawer.Navigator>
);}

export default DrawerNavigator;