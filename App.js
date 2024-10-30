import './gesture-handler';

import AppNavigation from './navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './navigation/UserContext'; // Importa tu contexto
export default function App() {

  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <UserProvider>
        <AppNavigation/>
      </UserProvider>
    </GestureHandlerRootView>

  );
}