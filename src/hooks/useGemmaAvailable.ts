import { useEffect, useState } from 'react';
import { isGemmaAvailable } from '@/lib/gemma';

export function useGemmaAvailable() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    isGemmaAvailable().then((result) => {
      if (active) setAvailable(result);
    });
    return () => {
      active = false;
    };
  }, []);

  return available;
}