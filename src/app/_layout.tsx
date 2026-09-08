import { Stack } from "expo-router";
import { colorScheme } from "nativewind";
import { createContext, useEffect, useState } from "react";
import { View } from "react-native";
import "../global.css";
import { getSetting, initDB } from "../services/database";

export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      await initDB();
      const theme = await getSetting("themePref");
      const dark = theme === "dark";
      setIsDark(dark);

      requestAnimationFrame(() => {
        try {
          colorScheme.set(dark ? "dark" : "light");
        } catch {}
      });
      setReady(true);
    };
    bootstrap();
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      colorScheme.set(next ? "dark" : "light");
      return next;
    });
  };

  if (!ready) {
    return <View style={{ flex: 1 }} className="flex-1 bg-white" />;
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <View
        style={{ flex: 1 }}
        className={`flex-1 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ThemeContext.Provider>
  );
}
