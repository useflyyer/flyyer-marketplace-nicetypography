import {useMemo} from 'react';

export function useLongText(description: string | undefined | null) {
  return useMemo<string | null>(() => {
    if (description) {
      const n = Math.max(400 / description.length, 1);
      const array: string[] = [];
      for (let i = 0; i < n; i++) array.push(description);
      return array.join(' ');
    }

    return null;
  }, [description]);
}
