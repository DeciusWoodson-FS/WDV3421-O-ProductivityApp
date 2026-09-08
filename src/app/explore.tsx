import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getSetting, saveSetting } from "../services/database";
import { ThemeContext } from "./_layout";

export default function SettingsScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [userName, setUserName] = useState("");

  // Load the saved name on mount
  useEffect(() => {
    const loadSettings = async () => {
      const savedName = await getSetting("userName");
      if (savedName) setUserName(savedName);
    };
    loadSettings();
  }, []);

  const handleNameSave = () => {
    saveSetting("userName", userName.trim());
    router.back();
  };

  const handleThemeToggle = (val: boolean) => {
    toggleTheme();
    saveSetting("themePref", val ? "dark" : "light");
  };

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
          Settings
        </Text>
      </View>

      <View className="space-y-6">
        {/* Theme Toggle */}
        <View className="flex-row justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <Text className="text-lg font-semibold text-black dark:text-white">
            Dark Mode
          </Text>
          <Switch
            value={isDark}
            onValueChange={handleThemeToggle}
            trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
            thumbColor={isDark ? "#ffffff" : "#f3f4f6"}
          />
        </View>

        {/* User Name Setting */}
        <View className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <Text className="text-lg font-semibold text-black dark:text-white mb-2">
            Display Name
          </Text>
          <TextInput
            className="w-full bg-white dark:bg-gray-900 text-black dark:text-white p-3 rounded border border-gray-300 dark:border-gray-700 mb-3"
            placeholder="Enter your name"
            placeholderTextColor="#9ca3af"
            value={userName}
            onChangeText={setUserName}
          />
          <TouchableOpacity
            onPress={handleNameSave}
            className="bg-blue-500 py-3 rounded items-center"
          >
            <Text className="text-white font-bold">Save Name</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
