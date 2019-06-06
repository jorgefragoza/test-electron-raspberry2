const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain

let mainWindow;

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
	if (mainWindow) {
		if(mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
});

if (isSecondInstance) app.quit();

let createWindow = () => {
	mainWindow = new BrowserWindow({
		frame: false
	});

	mainWindow.setFullScreen(true);
	mainWindow.show();

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// Open the DevTools.
	//mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
<<<<<<< HEAD
});
=======
});
>>>>>>> 90d9e28f5a5907d4edc110492cd00e71e4ce9572
