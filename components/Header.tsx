import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
    const {colors} = useTheme()
    const headerStyles = createHomeStyles(colors)
    const todos = useQuery(api.todos.getTodos)

    const completedCount = todos ? todos.filter(todo => todo.isCompleted).length : 0;
    const totalCount = todos ? todos.length : 0;
    const progressPercentage = totalCount === 0 ? 0 : (completedCount/totalCount) * 100;


    return (
        <View style={headerStyles.header}>
            <View style={headerStyles.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={headerStyles.iconContainer}>
                    <Ionicons name='flash-outline' size={28} color="#ffffff"/>
                </LinearGradient>

                <View style={headerStyles.titleTextContainer}> 
                    <Text style={headerStyles.title}>Today&apos;s Tasks 👀</Text>
                    <Text style={headerStyles.subtitle}>{completedCount} of {totalCount} completed</Text>
                </View> 
            </View>
            <View style={headerStyles.progressContainer}>
                <View style={headerStyles.progressBarContainer}>
                    <View style={headerStyles.progressBar}>
                        <LinearGradient colors={colors.gradients.success} style={[headerStyles.progressFill, {width: `${progressPercentage}%`}]} />
                    </View>
                    <Text style={headerStyles.progressText}>{Math.round(progressPercentage)}%</Text>
                </View>
            </View>
        </View>
    )
}

export default Header