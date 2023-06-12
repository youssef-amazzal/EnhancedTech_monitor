import {LocalStore} from "../js/LocalStore";

const {app, session} = require('electron')

export function cleanUpListener() {
  function listen() {
    app.on('before-quit', () => {
      if (!LocalStore.public.get('rememberMe')) {
        LocalStore.temp.clear();
        session.defaultSession.clearStorageData();
      }
    })
  }

  return {listen}
}
