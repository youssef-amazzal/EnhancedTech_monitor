import Store from "electron-store";
import {ipcMain} from "electron";


export function storeListener() {
  function listen() {

    const store = new Store();
    // IPC listener
    ipcMain.on('electron-store-get', async (event, val) => {
      event.returnValue = store.get(val);
    });
    ipcMain.on('electron-store-set', async (_event, key, val) => {
      store.set(key, val);
    });
  }

  return { listen }
}
