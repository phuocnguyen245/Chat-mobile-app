import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {AppProvider} from './containers/AppContext';
import ChatPage from './containers/Chat';
import Login from './containers/Login';
import {store} from './containers/redux/store';
import Register from './containers/Register';

const Stack = createStackNavigator();

const App = () => {
  const AppNavigationStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <AppProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="AppNavigationStack" component={AppNavigationStack} options={{headerShown: false}} />
                <Stack.Screen name="NavigationStack" component={ChatPage} options={{headerShown: false}} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </AppProvider>
    </Provider>
  );
};

export default App;
