import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Drawer
      screenOptions={{
        headerTintColor: colors.text,
        drawerActiveTintColor: colors.tint,
        drawerLabelStyle: { fontSize: 16 },
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          headerShown: true,
          drawerLabel: 'Settings',
          title: 'Settings',
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}
