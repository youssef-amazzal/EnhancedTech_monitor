import {computed} from "vue";
import IconAccepted from "~icons/mdi/check-circle";
import IconRefused from "~icons/mdi/close-circle";
import IconDeleted from "~icons/mdi/delete-forever";
import {i18n} from "./i18n";

export const HEADERS = {
  title: {
    text: () => i18n.global.t('home.docs.title'),
    style: `width: 40%`,
  },
  sequence: {
    text: () => i18n.global.t('home.docs.sequence'),
    style: `width: 10%`,
  },
  created_at: {
    text: () => i18n.global.t('home.docs.added'),
    style: `width: 20%`,
  },
  status: {
    text: () => i18n.global.t('home.docs.status'),
    style: `width: 10%`,
  },
}

export const STATUS = {
  deleted: {
    text: computed(() => i18n.global.t('home.task.status.deleted')),
    class: 'bg-red-500 text-white font-semibold',
    severity: 'danger',
    icon: IconDeleted,
  },
  to_do: {
    text: computed(() => i18n.global.t('home.task.status.to_do')),
    class: 'bg-gray-400 text-white font-semibold',
  },
  in_progress: {
    text: computed(() => i18n.global.t('home.task.status.in_progress')),
    class: 'bg-blue-500 text-white font-semibold',
  },
  pending: {
    text: computed(() => i18n.global.t('home.task.status.pending')),
    class: 'bg-yellow-600 text-white font-semibold',
    severity: 'danger',
    icon: IconRefused,
  },
  done: {
    text: computed(() => i18n.global.t('home.task.status.done')),
    class: 'bg-green-500 text-white font-semibold',
    severity: 'success',
    icon: IconAccepted,
  },
  archived: {
    text: computed(() => i18n.global.t('home.task.status.archived')),
    class: 'bg-orange-800 text-white font-semibold',
    severity: 'success',
    icon: IconAccepted,
  },
}

export const ACTIONS = {
  deleted: {
    text: () => i18n.global.t('home.task.status.deleted'),
    class: 'bg-red-500 text-white font-semibold',
  },
  scan_ok: {
    text: () => i18n.global.t('home.actions.scan_ok'),
    class: 'bg-gray-600 text-white font-semibold',
  },
  controle_ok: {
    text: () => i18n.global.t('home.actions.controle_ok'),
    class: 'bg-green-500 text-white font-semibold',
    icon: IconAccepted,
  },
  controle_unclear: {
    text: () => i18n.global.t('home.actions.controle_unclear'),
    class: 'bg-red-500 text-white font-semibold',
    icon: IconRefused,
  },
  controle_duplicate: {
    text: () => i18n.global.t('home.actions.controle_duplicate'),
    class: 'bg-yellow-700 text-white font-semibold',
    icon: IconRefused,
  },
  controle_missing: {
    text: () => i18n.global.t('home.actions.controle_missing'),
    class: 'bg-red-500 text-white font-semibold',
    icon: IconRefused,
  },
  operation_ok: {
    text: () => i18n.global.t('home.actions.operation_ok'),
    class: 'bg-green-500 text-white font-semibold',
    icon: IconAccepted,
  }
};



export const keySymbols = {
  'arrowdown'    : '↓',
  'arrowleft'    : '←',
  'arrowright'   : '→',
  'arrowup'      : '↑',
  'backspace'    : '⟵ Backspace',
  'capslock'     : '⇪ Caps Lock',
  'delete'       : '⌦ Delete',
  'end'          : '↘ End',
  'enter'        : '⏎ Enter',
  'escape'       : 'Esc',
  'home'         : '↖ Home',
  'insert'       : 'Ins',
  'numlock'      : 'Num Lock',
  'pagedown'     : '⇟ Page Down',
  'pageup'       : '⇞ Page Up',
  'pause'        : 'Pause',
  'printscreen'  : 'PrtSc',
  'scrolllock'   : '⇳ Scroll Lock',
  'shift'        : '⇧ Shift',
  ' '            : '⎵ Space',
  'tab'          : 'Tab',
  'win'          : '⊞ Win',
  'meta'         : '⊞ Win',
  'alt'          : 'Alt',
  'command'      : '⌘ Command',
  'control'      : 'Ctrl',
  'contextmenu'  : 'Menu',
};


export const formatKey = (key) => {
  return keySymbols[key] || (key.charAt(0).toUpperCase() + key.slice(1));
}
