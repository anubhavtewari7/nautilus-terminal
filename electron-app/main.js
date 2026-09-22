const { app, BrowserWindow, shell, Menu, Tray, nativeImage } = require('electron');
const path = require('path');

const APP_URL = 'https://nautilus-terminal.vercel.app';

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'NAUTILUS Terminal',
    backgroundColor: '#0a0a0f',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the live Vercel deployment
  mainWindow.loadURL(APP_URL);

  // Show window once ready (avoids white flash)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in the system browser, not in the app
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(APP_URL)) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  // Keep navigation within the app
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(APP_URL)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createTray() {
  // Use a blank tray icon — replace with your own icon path if you have one
  const icon = nativeImage.createEmpty();
  tray = new Tray(icon);
  tray.setToolTip('NAUTILUS Terminal');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open NAUTILUS', click: () => { if (mainWindow) mainWindow.show(); else createWindow(); } },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
  tray.on('double-click', () => { if (mainWindow) mainWindow.show(); });
}

// Remove default menu bar
Menu.setApplicationMenu(null);

app.whenReady().then(() => {
  createWindow();
  if (process.platform !== 'linux') createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
