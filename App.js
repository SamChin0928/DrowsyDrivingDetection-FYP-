import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenA from './ScreenA';
import ScreenB from './ScreenB';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Drowsy Detection') {
              iconName = 'eye';
              size = 20;
              color = focused ? 'black' : 'grey';
            } else if (route.name === 'Driving Analysis') {
              iconName = 'chart-area';
              size = 20;
              color = focused ? 'black' : 'grey';
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}
        activeColor='#f0edf6'
        inactiveColor='#3e2465'
        barStyle={{ backgroundColor: '#694fad' }}
      >
        <Tab.Screen
          name="Drowsy Detection"
          component={ScreenA}
        />
        <Tab.Screen
          name="Driving Analysis"
          component={ScreenB}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;