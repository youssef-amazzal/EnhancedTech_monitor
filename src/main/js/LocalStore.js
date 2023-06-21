import Store from "electron-store";

const store = new Store();
export const LocalStore = {
  set: (key, value) => {
    const user = getFromStore('user');
    user ? store.set(`${user.id}.${key}`, value) : LocalStore.public.set(key, value);
  },
  get: (key) => {
    const user = getFromStore('user');
    return user ? store.get(`${user.id}.${key}`) : LocalStore.public.get(key);
  },
  has: (key) => {
    const user = getFromStore('user');
    return user ? store.has(`${user.id}.${key}`) : LocalStore.public.has(key);
  },
  delete: (key) => {
    const user = getFromStore('user');
    store.delete(`${user.id}.${key}`);
  },
  clear: () => {
    store.clear();
  },
  onDidChange: (key, callback) => {
    const user = getFromStore('user');
    const unsubscribe = user ? store.onDidChange(`${user.id}.${key}`, callback) : store.onDidChange(`public.${key}`, callback);
    return unsubscribe;
  },
  onDidAnyChange: (callback) => {
    const unsubscribe = store.onDidAnyChange(callback);
    return unsubscribe;
  },
  public: {
    set: (key, value) => {
      store.set(`public.${key}`, value);
    },
    get: (key) => {
      return store.get(`public.${key}`, null);
    },
    has: (key) => {
      return store.has(`public.${key}`);
    },
    delete: (key) => {
      store.delete(`public.${key}`);
    },
    clear: () => {
      store.delete('public');
    },
    onDidChange: (key, callback) => {
      const unsubscribe = store.onDidChange(`public.${key}`, callback);
      return unsubscribe;
    },
  },
  temp: {
    set: (key, value) => {
      store.set(`temp.${key}`, value);
    },
    get: (key) => {
      return store.get(`temp.${key}`, null);
    },
    has: (key) => {
      return store.has(`temp.${key}`);
    },
    delete: (key) => {
      store.delete(`temp.${key}`);
    },
    clear: () => {
      store.delete('temp');
    },
    onDidChange: (key, callback) => {
      const unsubscribe = store.onDidChange(`temp.${key}`, callback);
      return unsubscribe;
    }
  },
};

function getFromStore(key) {
  const data = store.get(`public.${key}`);
  return data ? data : null;
}
