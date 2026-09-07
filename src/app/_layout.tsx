import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { View } from "react-native";
import "../global.css"; // NativeWind styles
import { getSetting, initDB } from "../services/database";

// Export context so other screens can toggle the theme
export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    initDB();
    const loadTheme = async () => {
      const theme = await getSetting("themePref");
      if (theme === "dark") setIsDark(true);
    };
    loadTheme();
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <View className={`flex-1 ${isDark ? "dark bg-gray-900" : "bg-white"}`}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ThemeContext.Provider>
  );
}
