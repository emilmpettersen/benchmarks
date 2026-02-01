import { useCallback, useEffect, useState } from 'react';

export function useLocalStorageArray(key, initialValue = []) {
  const [array, setArray] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(array));
  }, [key, array]);

  const addItem = useCallback((item) => setArray((prev) => [...prev, item]), []);

  const clearArray = useCallback(() => setArray([]), []);

  return [array, addItem, clearArray];
}
