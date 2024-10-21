import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Results from '../screens/Results';
import PdfViewer from '../screens/PdfViewer';
import Analisis from '../screens/Analisis';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: true}}>
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="Results" component={Results}/>
              <Stack.Screen name="Analisis" component={Analisis}/>
              <Stack.Screen name="PdfViewer" component={PdfViewer}/>
              
          </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
  
  export default AppNavigation