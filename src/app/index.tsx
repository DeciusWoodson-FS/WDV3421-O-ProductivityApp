import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  deleteTask,
  getTasks,
  toggleTaskCompletion,
} from "../services/database";

export default function TaskListScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");

  const loadTasks = useCallback(async () => {
    const data = await getTasks();
    setTasks(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks]),
  );

  const handleToggle = async (id: number, status: number) => {
    await toggleTaskCompletion(id, status);
    await loadTasks();
  };

  const handleDelete = (id: number) => {
    const confirmDelete = async () => {
      await deleteTask(id);
      await loadTasks();
    };

    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to delete this task?")) {
        confirmDelete();
      }
    } else {
      Alert.alert("Delete Task", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: confirmDelete },
      ]);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return task.isCompleted === 0;
    if (filter === "Completed") return task.isCompleted === 1;
    return true;
  });

  const completedCount = tasks.filter((t) => t.isCompleted === 1).length;

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "High":
        return "border-red-500 bg-red-50 dark:bg-red-900/30";
      case "Medium":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30";
      case "Low":
        return "border-green-500 bg-green-50 dark:bg-green-900/30";
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-800";
    }
  };

  return (
    <View className="flex-1 p-4 bg-white dark:bg-gray-900 pt-12">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-black dark:text-white">
          My Tasks
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/explore")}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
        >
          <Text className="text-black dark:text-white">Settings</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-gray-600 dark:text-gray-400 mb-4 font-medium">
        {completedCount} of {tasks.length} tasks completed
      </Text>

      <View className="flex-row mb-4 space-x-2">
        {["All", "Active", "Completed"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full ${filter === f ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-800"}`}
          >
            <Text
              className={
                filter === f ? "text-white" : "text-black dark:text-white"
              }
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`p-4 mb-3 border-l-4 rounded shadow-sm flex-row justify-between items-center ${getPriorityStyle(item.priority)}`}
          >
            <View className="flex-1 pr-4">
              <Text
                className={`text-lg font-bold text-black dark:text-white ${item.isCompleted ? "line-through opacity-50" : ""}`}
              >
                {item.title}
              </Text>
              {item.description ? (
                <Text className="text-gray-600 dark:text-gray-300 mt-1">
                  {item.description}
                </Text>
              ) : null}
            </View>
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity
                onPress={() => handleToggle(item.id, item.isCompleted)}
                className="p-2 bg-blue-100 dark:bg-blue-900 rounded"
              >
                <Text className="text-blue-700 dark:text-blue-200">
                  {item.isCompleted ? "Undo" : "Done"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                className="p-2 bg-red-100 dark:bg-red-900 rounded"
              >
                <Text className="text-red-700 dark:text-red-200">X</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => router.push("/add-task")}
        className="mt-4 p-4 bg-blue-500 rounded-lg items-center"
      >
        <Text className="text-white text-lg font-bold">+ Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
}
