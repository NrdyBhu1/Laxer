// Modules to control application life and create native browser window
const {
	app,
	Menu,
	Tray,
	remote,
	BrowserWindow
} = require('electron');
const path = require('path');


function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1366,
		height: 768,
		frame: false,
		transparent: true,
		alwaysOnTop: true,
		skipTaskbar: true,
		x: 0,
		y: 0,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			preload: path.join(__dirname, 'preload.js')
		}
	});

	// and load the index.html of the app.
	mainWindow.loadFile('index.html');
	mainWindow.setIgnoreMouseEvents(true, {
		forward: true
	});
	mainWindow.removeMenu();

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null
app.whenReady().then(() => {
	tray = new Tray("icon.png")
	const colorsubmenu = Menu.buildFromTemplate([{
			label: "Yellow",
			type: "checkbox"
		},
		{
			label: "Blue",
			type: "checkbox"
		},
		{
			label: "Green",
			type: "checkbox"
		},
		{
			label: "Red",
			type: "checkbox"
		},
		{
			label: "Peach",
			type: "checkbox",
			checked: true
		}
	])
	const contextmenu = Menu.buildFromTemplate([{
			label: "Quit",
			tooltip: "Quit the app",
			click: () => app.quit()
		},
		{
			label: "Reload",
			tooltip: "Reload the app",
			click: () => {
				const win = remote.getCurrentWindow();
				win.reload();
			}
		}//,
		// {
		// 	label: "Color",
		// 	submenu: colorsubmenu
		// }
	]);
	tray.setToolTip("Laxer");
	tray.setContextMenu(contextmenu);
	createWindow();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
