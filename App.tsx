import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Accessories, Home, MyCart, ProductInfo, Products } from './screens';

import { RootStackParamList } from './types';

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Accessories" component={Accessories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
