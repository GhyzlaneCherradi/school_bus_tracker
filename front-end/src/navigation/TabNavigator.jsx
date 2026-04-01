import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { Ionicons } from "@expo/vector-icons";
import Profile from "../screens/parent/profile.jsx";
import Settings from "../screens/parent/settings.jsx";
import Alert from "../screens/parent/alert.jsx";

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
<Tab.Navigator
  initialRouteName="profile"
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName = "ellipse";

      if (route.name === "profile") {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === "alert") {
        iconName = focused ? "notifications" : "notifications-outline";
      } else if (route.name === "settings") {
        iconName = focused ? "settings" : "settings-outline";
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#7300A1",
    tabBarInactiveTintColor: "#8a8a8a",
    headerShown: false,
  })}
>
    <Tab.Screen name="profile" component={Profile}></Tab.Screen>
    <Tab.Screen name="alert" component={Alert}></Tab.Screen>
    <Tab.Screen name="settings" component={Settings}></Tab.Screen>
</Tab.Navigator>
);}

export default TabNavigator;