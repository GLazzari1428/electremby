// Use ES Module 'import' syntax
import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Import electron-store as a native ESM default export --- <<< CORRECTED
import Store from 'electron-store';

// --- Import @jarboer/electron-prompt using the CJS compatibility pattern --- <<< KEPT FROM PREVIOUS
import pkgPrompt from '@jarboer/electron-prompt';
const { betterPrompt } = pkgPrompt;
// --- End of corrected imports ---

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration constants
const BROWSER_USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';
const CUSTOM_TITLE = 'Electremby';
const STORE_KEY_EMBY_URL = 'embyServerUrl';

// Check if the prompt import worked
if (typeof betterPrompt !== 'function') {
    console.error("FATAL: Failed to import betterPrompt from @jarboer/electron-prompt.");
    app.quit();
}

// --- Main Window Creation Function ---
function createWindow(embyUrl) {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: CUSTOM_TITLE,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  Menu.setApplicationMenu(null);
  mainWindow.webContents.setUserAgent(BROWSER_USER_AGENT);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(CUSTOM_TITLE);
  });

  mainWindow.loadURL(embyUrl);
}

// --- Function to Prompt for URL ---
async function promptForUrl(storeInstance) {
  const cssPath = path.join(__dirname, 'prompt-style.css');

  try {
    // Call the imported betterPrompt function
    const url = await betterPrompt({
      title: 'Emby Server URL',
      label: 'Enter your Emby Server URL (e.g., http://192.168.0.52:8096):',
      value: 'http://',
      inputAttrs: {
        type: 'url',
        required: true
      },
      type: 'input',
      alwaysOnTop: true,
      customStylesheet: cssPath,
      buttonLabels: {
        ok: "Save & Launch",
        cancel: "Cancel"
      }
    });

    if (url === null) {
      console.log('User cancelled URL input.');
      app.quit();
      return null;
    } else {
      console.log('User entered URL:', url);
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
         console.error('Invalid URL format. Please include http:// or https://');
         app.quit();
         return null;
      }
      storeInstance.set(STORE_KEY_EMBY_URL, url);
      return url;
    }
  } catch (error) {
    console.error('Error during prompt execution:', error);
    app.quit();
    return null;
  }
}

// --- Electron App Event Handlers ---
// Instantiate Store (using the correctly imported variable)
let store; // Define outside try-catch
try {
    store = new Store(); // Should work now with the direct default import
} catch (e) {
    console.error("FATAL: Failed to instantiate Store from electron-store.", e);
    app.quit();
}

app.whenReady().then(async () => {
  // Check if store instantiation failed earlier
  if (!store) {
      console.error("Store could not be initialized. Exiting.");
      app.quit();
      return;
  }

  let embyUrl = store.get(STORE_KEY_EMBY_URL);

  if (!embyUrl) {
    console.log('No stored Emby URL found. Prompting user...');
    embyUrl = await promptForUrl(store);
  } else {
    console.log('Found stored Emby URL:', embyUrl);
  }

  if (embyUrl) {
    createWindow(embyUrl);
  }

  app.on('activate', () => {
    const currentUrl = store.get(STORE_KEY_EMBY_URL);
    if (BrowserWindow.getAllWindows().length === 0 && currentUrl) {
      createWindow(currentUrl);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
