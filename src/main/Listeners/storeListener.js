import {ipcMain} from "electron";
import {LocalStore} from "../js/LocalStore";

export function storeListener() {

  function listen() {
    // IPC listener
    ipcMain.on('electron-store-get', (event, val) => {
      event.returnValue = LocalStore.get(val)
    });

    ipcMain.on('electron-store-set', async (_event, key, val) => {
      LocalStore.set(key, val)
    });

    ipcMain.on('electron-store-has', (event, val) => {
      event.returnValue = LocalStore.has(val)
    });

    ipcMain.on('electron-store-delete', (event, val) => {
      LocalStore.delete(val)
    });

    ipcMain.on('electron-store-clear', () => {
      LocalStore.clear()
    });

    ipcMain.on('electron-store-onDidChange', (event, val) => {
      event.returnValue = LocalStore.onDidChange(val[0], val[1])
    });

    ipcMain.on('electron-store-onDidAnyChange', (event) => {
      event.returnValue = LocalStore.onDidAnyChange()
    });

    ipcMain.on('electron-store-public-get', (event, val) => {
      event.returnValue = LocalStore.public.get(val)
    });

    ipcMain.on('electron-store-public-set', async (_event, key, val) => {
      LocalStore.public.set(key, val)
    });

    ipcMain.on('electron-store-public-has', (event, val) => {
      event.returnValue = LocalStore.public.has(val)
    });

    ipcMain.on('electron-store-public-delete', (event, val) => {
      LocalStore.public.delete(val)
    });

    ipcMain.on('electron-store-public-clear', () => {
      LocalStore.public.clear()
    });

    ipcMain.on('electron-store-public-onDidChange', (event, val) => {
      event.returnValue = LocalStore.public.onDidChange(val[0], val[1])
    });

    ipcMain.on('electron-store-temp-get', (event, val) => {
      event.returnValue = LocalStore.temp.get(val)
    });

    ipcMain.on('electron-store-temp-set', async (_event, key, val) => {
      LocalStore.temp.set(key, val)
    });

    ipcMain.on('electron-store-temp-has', (event, val) => {
      event.returnValue = LocalStore.temp.has(val)
    });

    ipcMain.on('electron-store-temp-delete', (event, val) => {
      LocalStore.temp.delete(val)
    });

    ipcMain.on('electron-store-temp-clear', () => {
      LocalStore.temp.clear()
    });

    ipcMain.on('electron-store-temp-onDidChange', (event, val) => {
      event.returnValue = LocalStore.temp.onDidChange(val[0], val[1])
    });

  }

  return {listen}
}
