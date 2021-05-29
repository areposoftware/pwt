/* eslint-disable @typescript-eslint/no-floating-promises */
import { useCallback, useEffect, useRef, useState } from 'react';

import { App } from '../../core/models/app';

type ErrorHandler = (error?: Error) => void;

const defaultErrorHandler: ErrorHandler = (error?: Error) => {
  console.error(error);
};

export const useAppStore = <T>(
  key: string,
  initialValue?: T,
  errorHandler?: ErrorHandler,
): readonly [T | null, (value: any) => void, () => void] => {
  // eslint-disable-next-line unicorn/no-null
  const [storedValue, setStoredValue] = useState<T | null>(null);

  const _errorHandler = useRef(
    typeof errorHandler === null ? defaultErrorHandler : errorHandler,
  );

  const error = (error?: Error) => {
    _errorHandler.current && _errorHandler.current(error);
  };

  useEffect(() => {
    (async () => {
      try {
        const value: T | null = await App.getInstance().store.getItem(key);
        if (value === null)
          await App.getInstance().store.setItem(key, initialValue);
        setStoredValue(initialValue ?? value);
      } catch (_error) {
        error(_error);
      }
    })();
  }, [key, initialValue]);

  const setValue = useCallback(
    (value) => {
      async function set(value: T) {
        try {
          setStoredValue(value);
          await App.getInstance().store.setItem(key, value);
        } catch (_error) {
          error(_error);
        }
      }

      set(value);
    },
    [key],
  );

  const removeValue = useCallback(() => {
    async function remove() {
      try {
        // eslint-disable-next-line unicorn/no-null
        setStoredValue(null);
        await App.getInstance().store.removeItem(key);
      } catch (_error) {
        error(_error);
      }
    }

    remove();
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
};
