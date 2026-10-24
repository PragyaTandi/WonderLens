import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'wonderlens-collection';

export function useCollection() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedIds(JSON.parse(stored));
    } catch {
      // localStorage not available or corrupted
    }
  }, []);

  const persist = useCallback((ids: string[]) => {
    setSavedIds(ids);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // ignore write errors
    }
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggleSave = useCallback(
    (id: string) => {
      if (savedIds.includes(id)) {
        persist(savedIds.filter((s) => s !== id));
      } else {
        persist([...savedIds, id]);
      }
    },
    [savedIds, persist],
  );

  return { savedIds, isSaved, toggleSave };
}
