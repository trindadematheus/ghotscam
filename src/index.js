const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width } = primaryDisplay.workAreaSize;

  const mainWindow = new BrowserWindow({
    width: 440,
    height: 260,
    frame: false,
    x: width - 450,
    y: 10,
    alwaysOnTop: true,
    resizable: false,
    icon: path.join(__dirname, "..", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.loadFile(path.join(__dirname, "index.html"));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
