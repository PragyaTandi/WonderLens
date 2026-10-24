import { useEffect, useState } from 'react';
import { isGemmaAvailable } from '@/lib/gemma';

export function useGemmaAvailable() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    isGemmaAvailable().then(setAvailable);
  }, []);
  return available;
}