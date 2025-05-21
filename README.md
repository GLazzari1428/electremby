# Electremby ⚡️📺

A simple, unofficial desktop client for Emby media server, built with Electron. It wraps the standard Emby web UI, providing a basic desktop experience without requiring an Emby Premiere subscription.

![Screenshot Placeholder](https://via.placeholder.com/600x400.png?text=Electremby+Screenshot+Here)

## Why?

The official Emby Theater application often requires an Emby Premiere subscription for certain features or platforms. This project was created as a learning exercise and a way to have a standalone desktop application for Emby on Linux (and potentially other platforms) that uses the freely accessible web interface, bypassing the need for a subscription for basic viewing.

## Features ✨

*   **Wraps Emby Web UI:** Provides the familiar Emby web interface in a dedicated desktop window.
*   **No Subscription Required:** Uses the standard web client, avoiding Emby Premiere checks for basic functionality.
*   **First-Run Setup:** Asks for your Emby Server URL on the first launch.
*   **Persistent Storage:** Remembers your server URL using `electron-store`.
*   **Customizable Prompt:** Uses `@jarboer/electron-prompt` with basic dark theme styling for the setup dialog.
*   **Clean Interface:** Hides the default Electron menu bar.
*   **Custom Window Title:** Displays "Electremby" (or your choice) in the title bar.
*   **Packaged Builds:** Uses `electron-builder` to create `.AppImage` and `.deb` installers for Linux.

## Getting Started (Development)

### Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm) installed on your system.
*   Your Emby Server running and accessible on your network.

### Installation & Running

1.  **Clone the repository:**
    ```
    git clone 
    cd electremby
    ```
2.  **Install dependencies:**
    ```
    npm install
    ```
3.  **Run the app in development mode:**
    ```
    npm start
    ```
    *   The first time you run it, it will prompt you to enter your Emby Server URL (e.g., `http://<your-server-ip>:8096`).

## Building Executables 📦

To create standalone application packages (`.AppImage`, `.deb`):

1.  **Make sure all dependencies are installed:**
    ```
    npm install
    ```
2.  **Run the build script:**
    ```
    npm run build
    ```
3.  **Find the output:** The built files will be located in the `dist/` directory.

    *   **AppImage:** Make it executable (`chmod +x Electremby-*.AppImage`) and run directly (`./Electremby-*.AppImage`).
    *   **Debian Package:** Install using your package manager (e.g., `sudo dpkg -i electremby_*.deb` followed by `sudo apt --fix-broken install` if needed).

## Technology Used 🛠️

*   [Electron](https://www.electronjs.org/)
*   [Node.js](https://nodejs.org/)
*   [electron-store](https://github.com/sindresorhus/electron-store) (For storing settings)
*   [@jarboer/electron-prompt](https://github.com/jarboer/electron-prompt) (For the setup prompt)
*   [electron-builder](https://www.electron.build/) (For packaging)

## License 📄

This project is licensed under the [MIT License](LICENSE).
