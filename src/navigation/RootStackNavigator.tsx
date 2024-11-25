import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PermissionScreen from '../screens/PermissionScreen';
import { ROOT_STACK_SCREENS } from './constants';

export type RootStackParamList = {
  [ROOT_STACK_SCREENS.PERMISSION]: undefined;
  [ROOT_STACK_SCREENS.HOME]: {
    data: string
  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ROOT_STACK_SCREENS.PERMISSION} component={PermissionScreen} />
      <Stack.Screen name={ROOT_STACK_SCREENS.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
}