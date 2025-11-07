import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const TodoInput = () => {
    const {colors} = useTheme()
    const homeStyles = createHomeStyles(colors)
    const [todo,setTodo] = useState("")
    const createTodos = useMutation(api.todos.createTodos)

    const handleCreateTodo = async () => {
        if(todo.trim()){
            try {
                await createTodos({text:todo.trim()})
                setTodo("")
            } catch (error) {
                console.error("Error creating todo:", error);  
                Alert.alert("Error","Failed to add todo.")
            }
        }
    }

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    style={homeStyles.input}
                    placeholder="What needs to be done?"
                    value={todo}
                    onChangeText={setTodo}
                    onSubmitEditing={handleCreateTodo}
                    placeholderTextColor={colors.textMuted}
                />

                <TouchableOpacity onPress={handleCreateTodo} activeOpacity={0.8} disabled={!todo.trim()}>
                    <LinearGradient   colors={todo.trim() ? colors.gradients.primary : colors.gradients.muted} 
                    style={[homeStyles.addButton, !todo.trim() && homeStyles.addButtonDisabled]}>
                        <Ionicons name='add' size={28} color={colors.textMuted}/>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoInput