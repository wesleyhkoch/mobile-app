import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StripeProvider } from '@stripe/stripe-react-native';

import { Accessories, Home, MyCart, ProductInfo, Products, Shopping } from './screens';

import { RootStackParamList } from './types';

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <StripeProvider publishableKey="pk_test_51LugN0BFRnerx6aotJAP8OUamtiOfEDfO7aQPDmj5WL5VS3s8S6hzrRg4Zen4WJlfytvry6k4ZbvSRxZX98jO4Bl00z0r5Ci0R">
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MyCart" component={MyCart} />
          <Stack.Screen name="Shopping" component={Shopping} />
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Accessories" component={Accessories} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
