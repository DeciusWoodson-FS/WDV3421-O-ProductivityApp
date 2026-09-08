# Personal Productivity App

A cross-platform personal productivity application built with Expo, React Native, and NativeWind. This app allows users to manage daily tasks with priority levels, persist data locally, and customize their experience with a dark mode theme toggle.

## ✨ Features & Tech Stack

*   **Core Functionality:** Create, read, update, and delete tasks with visual priority color-coding (High, Medium, Low).
*   **Data Persistence & Theme:** Uses `expo-sqlite` and `expo-secure-store` for cross-platform data saving, including a system-wide dark mode toggle.
*   **Tech Stack:** Built using Expo, React Native, TypeScript, Expo Router, and NativeWind/Tailwind CSS.

## 🚀 Setup Instructions

1.  Clone the repository and navigate to the project directory: `cd ProductivityApp`
2.  Install the required dependencies via terminal: `npm install`
3.  Start the Expo development server, clearing the cache to ensure NativeWind loads correctly: `npx expo start -c`
4.  Press `w` to open on the web, `i` for the iOS Simulator, or scan the QR code with the Expo Go app for physical devices.

## 🧪 Testing Guide

*   **Task Management:** Add a new task with a specific priority. Verify the task appears with the correct priority color-coding on the home screen.
*   **Validation:** Attempt to save a task with an empty title and verify the error alert prevents submission.
*   **Interaction & Deletion:** Mark a task as complete to verify the statistics update. Delete a task to trigger the platform-specific confirmation dialog (native alert on mobile, browser confirm on web).
*   **Data Persistence:** Toggle dark mode in the settings, then completely refresh or restart the app to ensure your theme preference and saved tasks remain intact.
