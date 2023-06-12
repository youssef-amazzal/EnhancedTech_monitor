import {computed, ref, shallowRef} from "vue";
import IconFr from "~icons/circle-flags/fr"
import IconEn from "~icons/circle-flags/en"
import {i18n} from "../assets/js/i18n";
import {useSettingsStore} from "../stores/SettingsStore";
import {onKeyDown, useMagicKeys, whenever} from "@vueuse/core";
import {LocalStore} from "../assets/js/Local";


const t = i18n.global.t

export const useSettings = () => {
  const {lang, theme} = useSettingsStore()


  /******************************************
   *             THEME SETTINGS              *
   *******************************************/

  const themeOptions = [
    {
      id: 1,
      key: 'system',
      label: computed(() => t('settings.theme.system')),
      image: '/src/assets/images/system_theme.png',
    },
    {
      id: 1,
      key: 'dark',
      label: computed(() => t('settings.theme.dark')),
      image: '/src/assets/images/dark_theme.png',
    },
    {
      id: 2,
      key: 'light',
      label: computed(() => t('settings.theme.light')),
      image: './src/assets/images/light_theme.png',
    }
  ]

  const selectedTheme = shallowRef(themeOptions.find(t => t.key === theme.current).label.value)
  const changeTheme = () => {
    const newTheme = themeOptions.find(t => t.label.value === selectedTheme.value);
    theme.set(newTheme.key)
  }

  /******************************************
   *            LANGUAGE SETTINGS           *
   ******************************************/

  const langOptions = [
    {
      id: 0,
      key: 'en',
      label: computed(() => t('settings.language.en')),
      icon: IconEn,
    },
    {
      id: 1,
      key: 'fr',
      label: computed(() => t('settings.language.fr')),
      icon: IconFr,
    }
  ]

  const selectedLang = shallowRef(langOptions.find(l => l.key === lang.current.key))
  const changeLang = (e) => {
    const key = e.value.key;
    lang.set(key);
    setTimeout(() => {
      selectedTheme.value = themeOptions.find(t => t.key === theme.current).label.value;
    }, 100)
  }


  /******************************************
   *          SHORTCUTS SETTINGS            *
   ******************************************/


  const {current, ctrl_r} = useMagicKeys()
  const pressedKeys = computed(() => Array.from(current))

  const keyCombinations = {
    verify: {
      hotkey: LocalStore.get('shortcuts.verify', [' ']),
      action: (args) => {
        const {index: activeIndex, data} = args;
        const page = data.value[activeIndex.value];
        markPage(page, 'controle_ok');
      },
      repeatable: false,
    },
    unclear: {
      hotkey: LocalStore.get('shortcuts.unclear', ['control', '1']),
      action: (args) => {
        const {index : activeIndex, data} = args;
        const page = data.value[activeIndex.value];
        markPage(page, 'controle_unclear');
      },
      repeatable: false,
    },
    duplicate: {
      hotkey: LocalStore.get('shortcuts.duplicate', ['control', '2']),
      action: (args) => {
        const {index : activeIndex, data} = args;
        const page = data.value[activeIndex.value];
        markPage(page, 'controle_duplicate');
      },
      repeatable: false,
    },
    delete: {
      hotkey: LocalStore.get('shortcuts.delete', ['control', '3']),
      action: (args) => {
        const {index : activeIndex, data} = args;
        const page = data.value[activeIndex.value];
        page.isDeleted = true;
        page.status = 'deleted';
      },
      repeatable: false,
    },
    next: {
      hotkey: LocalStore.get('shortcuts.next', ['arrowright']),
      action: (args) => {
        const {index : activeIndex, data} = args;
        activeIndex.value = (activeIndex.value + 1) % data.value.length;
      },
      repeatable: true,
    },
    previous: {
      hotkey: LocalStore.get('shortcuts.previous', ['arrowleft']),
      action: (args) => {
        const {index : activeIndex, data} = args;
        activeIndex.value = (activeIndex.value - 1 + data.value.length) % data.value.length;
      },
      repeatable: true,
    },
    close: {
      hotkey: LocalStore.get('shortcuts.close', ['escape']),
      action: (args) => {
        const {active} = args;
        active.value = false;
      },
      repeatable: false,
    }
  }

  const listenToShortcuts = (args = {}) => {
    Object.keys(keyCombinations).forEach(key => {

      const shortcut = keyCombinations[key];

      onKeyDown(true, (e) => {
        if (args.active && !ctrl_r.value && JSON.stringify(pressedKeys.value) === JSON.stringify(shortcut.hotkey)) {
          e.preventDefault();
          shortcut.action(args);
        }

      }, {dedupe: !shortcut.repeatable})
    })
  }

  const buildShortcutOptions = (keyCombination) => {
    return Object.keys(keyCombination).map(key => {
      return {
        key: key,
        title: computed(() => t(`settings.shortcuts.${key}.title`)),
        description: computed(() => t(`settings.shortcuts.${key}.description`)),
        keyCombination: shallowRef(keyCombination[key].hotkey),
        edit: shallowRef(false),
        listening: false,
      }
    });
  }

  const shortcutOptions = ref(buildShortcutOptions(keyCombinations))
  const saveShortcut = (shortcut) => {
    LocalStore.set(`shortcuts.${shortcut.key}`, shortcut.keyCombination);
  }

  const changeShortcut = (shortcut) => {
    if (!shortcut.listening) {
      shortcut.listening = true;
      onKeyDown(true, (e) => {
        if (shortcut.edit && !ctrl_r.value) {
          e.preventDefault();
          shortcut.keyCombination = pressedKeys.value;
        }
      }, {dedupe: true})

      whenever(() => !shortcut.edit, () => {
        saveShortcut(shortcut);
      })
    }
  }

  return {
    themeOptions, selectedTheme, changeTheme,
    langOptions, selectedLang, changeLang,
    shortcutOptions, keyCombinations, changeShortcut, listenToShortcuts
  }
}


const markPage = (page, markAs) => {
  const id_employee = LocalStore.public.get('user').id;
  const id_page = page.id;
  const type = markAs;

  const activity = {
    id_employee : id_employee,
    id_page : id_page,
    type : type
  }

  page.status = markAs === 'controle_ok' ? 'done' : 'pending';
  page.isDeleted = false;

  if (page.isDirty) {
    page.activities[0] = activity;
    return;
  }

  page.activities.unshift(activity);
  page.isDirty = true;
}
