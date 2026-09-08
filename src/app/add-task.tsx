import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addTask } from "../services/database";

export default function AddTaskScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Missing Information", "Please enter a task title.");
      return;
    }

    await addTask(title.trim(), description.trim(), priority);
    router.back();
  };

  const priorities = ["Low", "Medium", "High"];

  return (
    <View className="flex-1 p-4 bg-white dark:bg-gray-900 pt-12">
      <View className="flex-row items-center mb-6 space-x-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
        >
          <Text className="text-black dark:text-white font-bold">Back</Text>
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-black dark:text-white">
          Add New Task
        </Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 dark:text-gray-300 mb-1 font-semibold">
            Title
          </Text>
          <TextInput
            className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-3 rounded border border-gray-300 dark:border-gray-700"
            placeholder="What needs to be done?"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View>
          <Text className="text-gray-700 dark:text-gray-300 mb-1 font-semibold">
            Description (Optional)
          </Text>
          <TextInput
            className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-3 rounded border border-gray-300 dark:border-gray-700 min-h-[100px]"
            placeholder="Add details..."
            placeholderTextColor="#9ca3af"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View>
          <Text className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Priority
          </Text>
          <View className="flex-row space-x-2">
            {priorities.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPriority(p)}
                className={`flex-1 py-3 items-center rounded border ${
                  priority === p
                    ? "bg-blue-500 border-blue-500"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                }`}
              >
                <Text
                  className={`font-bold ${priority === p ? "text-white" : "text-gray-700 dark:text-gray-300"}`}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          className="w-full bg-green-500 py-4 rounded-lg items-center mt-4"
        >
          <Text className="text-white text-lg font-bold">Save Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
