# Reflection

### What was most challenging about cross-platform development?

The most challenging aspect of this cross-platform project was managing environment-specific dependencies and bundler configurations. Specifically, getting `expo-sqlite` to work seamlessly across both mobile and web proved difficult due to Metro bundler conflicts with WebAssembly (`.wasm`) and web worker extraction. Because Expo's web SQLite implementation is still experimental, compiling it alongside NativeWind's custom Metro serializer caused build-time crashes.

### How did you handle the time constraint?

I managed the three-day time constraint by strictly adhering to the Minimum Viable Product (MVP) scope and prioritizing core functionality over premature polish. By dividing the project logically—setting up the database and routing on day one, building out the Task CRUD UI on day two, and dedicating day three entirely to cross-platform testing and the Dark Mode enhanced feature—I maintained steady progress.

### What would you improve with more time?

Given more time, I would focus heavily on enhancing the application's overall user experience. I would implement smooth layout animations for task creation and deletion to make the interface feel more tactile. Additionally, I would spend time researching a stable workaround to unify the web and mobile database layers using SQLite across all platforms, rather than relying on a web fallback. Expanding the app to include the optional "Categories" feature alongside the existing Dark Mode implementation would also add significant value.

### What surprised you about the development process?

The biggest surprise during the development process was the stark contrast between the ease of initial UI development and the fragility of the underlying bundler configuration. Tools like Expo Router and NativeWind allowed for incredibly fast visual iteration when building the mobile interface. However, I was surprised by how quickly the development environment could break under the hood—such as losing TypeScript JSX resolution just from clearing `node_modules`, or the Metro bundler failing to resolve worker chunks. It was a strong reminder of how complex the modern JavaScript toolchain truly is.
