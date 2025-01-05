const storage = window.localStorage;

export const setStorage = async (key: string, value: string) => {
  await storage.setItem(key, value);
};

export const getStorage = async (key: string) => {
  return await storage.getItem(key);
};
