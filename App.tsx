import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "./types"
import { Home } from "./screens/Home"
import { MyCart } from "./screens/MyCart"
import { ProductInfo } from "./screens/ProductInfo"

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='MyCart' component={MyCart} />
        <Stack.Screen name='ProductInfo' component={ProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
