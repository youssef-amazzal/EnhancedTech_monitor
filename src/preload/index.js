import {contextBridge, ipcRenderer} from 'electron'
import {electronAPI} from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  store: {
    get(key) {
      return ipcRenderer.sendSync('electron-store-get', key)
    },
    set(property, val) {
      ipcRenderer.send('electron-store-set', property, val)
    },
    has(key) {
      return ipcRenderer.sendSync('electron-store-has', key)
    },
    delete(key) {
      ipcRenderer.send('electron-store-delete', key)
    },
    clear() {
      ipcRenderer.send('electron-store-clear')
    },
    onDidChange(key, callback) {
      ipcRenderer.send(`electron-store-onDidChange`, {key, callback})
    },
    onDidAnyChange() {
      ipcRenderer.send(`electron-store-onDidAnyChange`)
    },
    public: {
      get(key) {
        return ipcRenderer.sendSync('electron-store-public-get', key)
      },
      set(property, val) {
        ipcRenderer.send('electron-store-public-set', property, val)
      },
      has(key) {
        return ipcRenderer.sendSync('electron-store-public-has', key)
      },
      delete(key) {
        ipcRenderer.send('electron-store-public-delete', key)
      },
      clear() {
        ipcRenderer.send('electron-store-public-clear')
      },
      onDidChange(key, callback) {
        ipcRenderer.send(`electron-store-public-onDidChange`, {key, callback})
      },
    },
    temp: {
      get(key) {
        return ipcRenderer.sendSync('electron-store-temp-get', key)
      },
      set(property, val) {
        ipcRenderer.send('electron-store-temp-set', property, val)
      },
      has() {
        return ipcRenderer.sendSync('electron-store-temp-has')
      },
      delete(key) {
        ipcRenderer.send('electron-store-temp-delete', key)
      },
      clear() {
        ipcRenderer.send('electron-store-temp-clear')
      },
      onDidChange(key, callback) {
        ipcRenderer.send(`electron-store-temp-onDidChange`, {key, callback})
      }
    },
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
