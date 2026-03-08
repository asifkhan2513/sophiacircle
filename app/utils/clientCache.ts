export const setClientCache = (
  key: string,
  data: any,
  ttlSeconds: number = 3600
) => {
  if (typeof window === "undefined") return;
  const now = new Date();
  const item = {
    data: data,
    expiry: now.getTime() + ttlSeconds * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getClientCache = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.data as T;
};

export const deleteClientCache = (key: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};
