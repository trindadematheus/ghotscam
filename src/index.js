const { app, BrowserWindow, screen, Tray, Menu } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } =
    primaryDisplay.workAreaSize;

  const iconPath = path.join(__dirname, "..", "icon.png");

  const browserWidth = 440;
  const browserHeight = 260;
  let isGhostModeActive = true;

  const mainWindow = new BrowserWindow({
    width: browserWidth,
    height: browserHeight,
    frame: false,
    x: 10,
    y: 10,
    alwaysOnTop: true,
    resizable: false,
    focusable: false,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setIgnoreMouseEvents(true);
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  const tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Ghost Mode",
      type: "checkbox",
      checked: isGhostModeActive,
      click: () => {
        mainWindow.setIgnoreMouseEvents(!isGhostModeActive);
        isGhostModeActive = !isGhostModeActive;
      },
    },
    {
      type: "separator",
    },
    {
      label: "Position",
      type: "submenu",
      submenu: [
        {
          label: "TOP-LEFT",
          type: "normal",
          click: () => mainWindow.setPosition(10, 10),
        },
        {
          label: "TOP-RIGHT",
          type: "normal",
          click: () =>
            mainWindow.setPosition(screenWidth - (browserWidth + 10), 10),
        },
        {
          label: "BOTTOM-LEFT",
          type: "normal",
          click: () =>
            mainWindow.setPosition(10, screenHeight - (browserHeight + 10)),
        },
        {
          label: "BOTTOM-RIGHT",
          type: "normal",
          click: () =>
            mainWindow.setPosition(
              screenWidth - (browserWidth + 10),
              screenHeight - (browserHeight + 10)
            ),
        },
      ],
    },
    {
      type: "separator",
    },
    // {
    //   label: "Video Source",
    //   type: "submenu",
    //   submenu: [
    //     {
    //       label: "top-left",
    //       type: "normal",
    //     },
    //     {
    //       label: "top-right",
    //       type: "normal",
    //     },
    //     {
    //       label: "bottom-right",
    //       type: "normal",
    //     },
    //     {
    //       label: "bottom-right",
    //       type: "normal",
    //     },
    //   ],
    // },
    // {
    //   type: "separator",
    // },
    {
      label: "Scale",
      type: "submenu",
      submenu: [
        {
          label: "0.5x",
          type: "normal",
          click: () => {
            mainWindow.setBounds({
              width: browserWidth * 0.5,
              height: browserHeight * 0.5,
            });
            mainWindow.reload();
          },
        },
        {
          label: "1x",
          type: "normal",
          click: () => {
            mainWindow.setBounds({
              width: browserWidth,
              height: browserHeight,
            });
            mainWindow.reload();
          },
        },
        {
          label: "1.5x",
          type: "normal",
          click: () => {
            mainWindow.setBounds({
              width: browserWidth * 1.5,
              height: browserHeight * 1.5,
            });
            mainWindow.reload();
          },
        },
      ],
    },
    {
      type: "separator",
    },
    {
      type: "normal",
      label: "Close",
      role: "quit",
      enabled: true,
    },
  ]);

  tray.setToolTip("Ghost Cam");
  tray.on("click", () => tray.popUpContextMenu());
  tray.setContextMenu(contextMenu);
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
