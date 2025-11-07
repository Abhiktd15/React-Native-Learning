import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hooks/useTheme";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";

type todo = Doc<"todos">;

export default function Index() {
  const [editingId,setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText,setEditText] = useState("");
  
  const {colors} = useTheme()
  const homeStyles = createHomeStyles(colors)

  const todo = useQuery(api.todos.getTodos)
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const deleteTodo = useMutation(api.todos.deleteTodo)
  const editTodo = useMutation(api.todos.updateTodo)
  const isLoading = todo === undefined;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({id})
    } catch (error) {
      console.error("Error toggling todo:", error);
      Alert.alert("Error","Failed to update todo.")
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo","Are you sure you want to delete this todo?",
      [
        {text: "Cancel", style: "cancel"},
        {text: "Delete", style: "destructive", onPress: async () => deleteTodo({id})}
      ]
    )
  }

  // Edit todo
  const handleEditTodo = (todo:todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  }
  const handleSaveEdit = async () => {
    if(editingId){
      try {
        await editTodo({id:editingId, text: editText});
        setEditingId(null);
        setEditText("");
      } catch (error) {
        console.error("Error editing todo:", error);
        Alert.alert("Error","Failed to edit todo.")        
      }
    }
  }
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  }
  
  if (isLoading) return <LoadingSpinner />;
  const renderTodoItem = ({item} : {item: todo}) => {
    const isEditing = editingId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient colors={colors.gradients.surface} style= {homeStyles.todoItem}
          start={{x:0,y:0}}
          end={{x:1,y:1}}
        >
          <TouchableOpacity style={homeStyles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTodo(item._id)}>
            <LinearGradient colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[homeStyles.checkboxInner,{borderColor: item.isCompleted ? "transparent" : colors.border}]}
              >
              {item.isCompleted && <Ionicons name="checkmark" size={20} color={colors.surface} />}
              </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />      
              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff"/>
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff"/>
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>

              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text style={[homeStyles.todoText, item.isCompleted && {
                textDecorationLine: 'line-through',
                color: colors.textMuted,
                opacity: 0.7,
              }]}>{item.text}</Text>

              <View style={homeStyles.todoActions}>
                <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff"/>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff"/>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
          </View>
          )}
        </LinearGradient>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={ colors.gradients.background }
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView
        style={homeStyles.container}
      >
        <Header/>
        <TodoInput/>
        
        <FlatList 
          data={todo}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          // showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
