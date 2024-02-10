import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router'; // Ensure Link is imported from 'expo-router'
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

interface TabBarIconProps {
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ color, size }) => (
  <FontAwesome name="code" size={size} color={color} style={{ marginBottom: -3 }} />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const modalLink ="/modal" as never
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} size={28} />,
          headerRight: () => (
            <Link href={modalLink} asChild>
              <Pressable
                onPress={() => {
                  // Add onPress event handler for Pressable
                  console.log('Info button pressed');
                }}>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
