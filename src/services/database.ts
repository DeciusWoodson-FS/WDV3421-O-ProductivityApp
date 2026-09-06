import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("tasks.db");

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT NOT NULL,
      isCompleted INTEGER DEFAULT 0
    );
  `);
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
