import { useState, useEffect } from 'react';
import { memory } from '../utils/memoryManager';

export const useMemory = (key) => {
  const [data, setData] = useState(() => memory.get(key));

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = memory.get(key);
      if (JSON.stringify(newData) !== JSON.stringify(data)) {
        setData(newData);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [key, data]);

  const setValue = (value) => {
    memory.set(key, value);
    setData(value);
  };

  const clearValue = () => {
    memory.delete(key);
    setData(null);
  };

  return { data, setValue, clearValue };
};
