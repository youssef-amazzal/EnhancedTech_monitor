import {LocalStore} from "../js/LocalStore";
import {nativeTheme} from "electron";

export function themeListener() {
  function listen() {
    const theme = LocalStore.get('theme');
    nativeTheme.themeSource = theme ?? "system";
    const user = LocalStore.get(`user`);

    if (user) {
      LocalStore.onDidChange('theme', (newValue) => {
        nativeTheme.themeSource = newValue;
      });
    } else {
      LocalStore.public.onDidChange('user', () => {
        LocalStore.onDidChange('theme', (newValue) => {
          nativeTheme.themeSource = newValue;
        });
      });
    }
  }

  return {listen}
}
