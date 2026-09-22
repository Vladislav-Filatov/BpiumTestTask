import {useEffect, useState} from "react";

function useLocalStorageState (key, initialValue)  {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = localStorage.getItem(key);

      return savedValue === null ? initialValue : JSON.parse(savedValue);
    } catch (error) {
      console.warn(`Не удалось прочитать поле ${key}`, error);
      return initialValue;
    }
  });

  const updateValue = nextValue => {
    setValue(nextValue);

    try {
      localStorage.setItem(key, JSON.stringify(nextValue));
    } catch (error) {
      console.warn(`Не удалось сохранить поле ${key}`, error);
    }
  };

  useEffect(() => {
    const handleStorage = event => {
      if (event.storageArea !== localStorage) return;
      if (event.key !== key && event.key !== null) return;

      try {
        const nextValue = event.newValue === null ? initialValue : JSON.parse(event.newValue);
        setValue(nextValue);
      } catch (error) {
        console.warn(`Не удалось прочитать поле ${key}`, error);
        setValue(initialValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue]);

  return [value, updateValue];
}

export default useLocalStorageState;