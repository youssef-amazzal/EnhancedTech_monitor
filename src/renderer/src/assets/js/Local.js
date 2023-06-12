const store = window.api.store
export const LocalStore = {
  set: (key, value) => {
    store.set(key, value);
  },
  get: (key, defaultVal = null) => {
    return store.get(key) ?? defaultVal;
  },
  has: (key) => {
    return store.has(key);
  },
  delete: (key) => {
    store.delete(key);
  },
  clear: () => {
    store.clear();
  },
  onDidChange: (key, callback) => {
    const unsubscribe = store.onDidChange(key, callback);
    return unsubscribe;
  },
  onDidAnyChange: (callback) => {
    const unsubscribe = store.onDidAnyChange(callback);
    return unsubscribe;
  },
  public: {
    set: (key, value) => {
      store.public.set(key, value);
    },
    get: (key, defaultVal = null) => {
      return store.public.get(key) ?? defaultVal;
    },
    has: (key) => {
      return store.public.has(key);
    },
    delete: (key) => {
      store.public.delete(key);
    },
    clear: () => {
      store.public.clear();
    },
    onDidChange: (key, callback) => {
      const unsubscribe = store.public.onDidChange(key, callback);
      return unsubscribe;
    },
  },
  temp: {
    set: (key, value) => {
      store.temp.set(key, value);
    },
    get: (key, defaultVal = null) => {
      return store.temp.get(key) ?? defaultVal;
    },
    has: (key) => {
      return store.temp.has(key);
    },
    delete: (key) => {
      store.temp.delete(key);
    },
    clear: () => {
      store.temp.clear();
    },
    onDidChange: (key, callback) => {
      const unsubscribe = store.temp.onDidChange(key, callback);
      return unsubscribe;
    },
  }
}
