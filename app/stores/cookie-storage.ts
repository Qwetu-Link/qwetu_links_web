import Cookies from "js-cookie";
import type { PersistStorage, StorageValue } from "zustand/middleware";

export function createCookieStorage<T>(): PersistStorage<T> {
  return {
    getItem: (name): StorageValue<T> | null => {
      const value = Cookies.get(name);
      if (!value) return null;
      try {
        return JSON.parse(value) as StorageValue<T>;
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      Cookies.set(name, JSON.stringify(value), {  
        expires: 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    },
    removeItem: (name) => Cookies.remove(name),
  };
}