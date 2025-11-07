import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hooks/useTheme";
import { FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";

type todo = Doc<"todos">;

export default function Index() {
  const {toggleDarkMode} = useTheme()
  const {colors} = useTheme()
  const homeStyles = createHomeStyles(colors)

  const todo = useQuery(api.todos.getTodos)
  const toggleTodo = useMutation(api.todos.toggleTodo)
  const isLoading = todo === undefined;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({id})
    } catch (error) {
      console.error("Error toggling todo:", error);
      Alert.alert("Error","Failed to update todo.")
    }
  }

  if (isLoading) return <LoadingSpinner />;
  const renderTodoItem = ({item} : {item: todo}) => {
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
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
