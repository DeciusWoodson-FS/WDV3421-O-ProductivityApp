import * as SecureStore from "expo-secure-store";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

function getDB(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync("productivity.db");
  }
  return dbPromise;
}

export const initDB = async () => {
  try {
    const db = await getDB();
    await db.execAsync(`
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

export const getTasks = async () => {
  const db = await getDB();
  return db.getAllAsync(
    "SELECT * FROM tasks ORDER BY isCompleted ASC, id DESC",
  );
};

export const addTask = async (
  title: string,
  description: string,
  priority: string,
) => {
  const db = await getDB();
  await db.runAsync(
    "INSERT INTO tasks (title, description, priority) VALUES (?, ?, ?)",
    [title, description, priority],
  );
};

export const toggleTaskCompletion = async (
  id: number,
  currentStatus: number,
) => {
  const db = await getDB();
  const newStatus = currentStatus === 1 ? 0 : 1;
  await db.runAsync("UPDATE tasks SET isCompleted = ? WHERE id = ?", [
    newStatus,
    id,
  ]);
};

export const deleteTask = async (id: number) => {
  const db = await getDB();
  await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
};

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
