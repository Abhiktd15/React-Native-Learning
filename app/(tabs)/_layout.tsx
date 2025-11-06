import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
const _layout = () => {
    const {colors} = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: colors.surface },
                headerTitleStyle: { color: colors.text, fontSize: 24, fontWeight: 'bold' },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: {
                    backgroundColor: colors.bg,
                    borderTopWidth: 1,
                    borderTopColor: 'yellow',
                    height: 90,
                    paddingTop: 10,
                    paddingBottom: 30
                },
                headerShown: false
            }}
        >
            <Tabs.Screen name="index" options={{ 
                title: "Todos",
                tabBarIcon:({color,size}) => <Ionicons name="flash-outline" color={color} size={size} />
            }} />
            <Tabs.Screen name="settings" options={{ 
                title: "Settings",
                tabBarIcon:({color,size}) => <Ionicons name="settings" color={color} size={size} />
            }} />
        </Tabs>
    )
}

export default _layout