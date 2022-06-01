import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/accountScreen";
import SignInScreen from "./src/screens/signInScreen";
import SignUpScreen from "./src/screens/signUpScreen";
import TrackCreateScreen from "./src/screens/trackCreateScreen";
import TrackDetailsScreen from "./src/screens/trackDetailsScreen";
import TrackListScreen from "./src/screens/trackListScreen";
import { Provider as AuthProvider } from "./src/context/authContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/resolveAuthScreen";
import {Provider as LocationProvider} from './src/context/locationContext';
import {Provider as TrackProvider} from './src/context/TrackContext';
import { FontAwesome} from '@expo/vector-icons'

const TrackListFlow = createStackNavigator({
  TrackList:TrackListScreen,
  TrackDetail:TrackDetailsScreen
})

TrackListFlow.navigationOptions = {
  title:'Tracks',
  tabBarIcon: <FontAwesome name="th-list" size={20}/>
}
const SwitchNavigator = createSwitchNavigator({
  ResolveAuth:ResolveAuthScreen,
  LoginFlow: createStackNavigator({
    Signup: SignUpScreen,
    SignIn:SignInScreen
  }),
  mainFlow: createBottomTabNavigator({
    TrackListFlow,
    CreateTrack: TrackCreateScreen,
    Account:AccountScreen,
  }),
  
})

const App = createAppContainer(SwitchNavigator);
export default () => {
  return(
    <TrackProvider>
    <LocationProvider>
    <AuthProvider>
      <App ref={(navigator)=> {setNavigator(navigator)}} />
    </AuthProvider>
    </LocationProvider>
    </TrackProvider>
  )
}
