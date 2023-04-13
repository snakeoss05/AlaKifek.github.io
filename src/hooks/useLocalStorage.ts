import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, intialvalue: T | (() => T)) {
  const [vaule, setvaule] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof intialvalue === "function") {
      return (intialvalue as () => T)();
    } else {
      return intialvalue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(vaule));
  }, [key, vaule]);
  return [vaule, setvaule] as [typeof vaule, typeof setvaule];
}
