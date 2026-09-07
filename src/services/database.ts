import * as SecureStore from "expo-secure-store";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

// 1. SQLite Database Setup
const db = SQLite.openDatabaseSync("productivity.db");

export const initDB = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT NOT NULL,
        isCompleted INTEGER DEFAULT 0
      );
    `);
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};

export const getTasks = () => {
  return db.getAllSync("SELECT * FROM tasks ORDER BY isCompleted ASC, id DESC");
};

export const addTask = (
  title: string,
  description: string,
  priority: string,
) => {
  db.runSync(
    "INSERT INTO tasks (title, description, priority) VALUES (?, ?, ?)",
    [title, description, priority],
  );
};

export const toggleTaskCompletion = (id: number, currentStatus: number) => {
  const newStatus = currentStatus === 1 ? 0 : 1;
  db.runSync("UPDATE tasks SET isCompleted = ? WHERE id = ?", [newStatus, id]);
};

export const deleteTask = (id: number) => {
  db.runSync("DELETE FROM tasks WHERE id = ?", [id]);
};

// 2. Cross-Platform Secure Storage
export const saveSetting = async (key: string, value: string) => {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export const getSetting = async (key: string): Promise<string | null> => {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};
