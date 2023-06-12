import {LocalStore} from "../js/LocalStore";
import {nativeTheme} from "electron";

export function themeListener() {
  function listen() {
    const theme = LocalStore.get('theme');
    nativeTheme.themeSource = theme;
    
    LocalStore.onDidChange('theme', (newValue) => {
      nativeTheme.themeSource = newValue;
    });
  }

  return {listen}
}
