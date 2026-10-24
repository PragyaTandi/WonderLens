import { useState, useEffect, useCallback } from 'react';
import type { PageRoute } from '@/data/types';

function parseHash(): PageRoute {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash === '/explore') return { name: 'explore' };
  if (hash === '/rediscover') return { name: 'rediscover' };
  if (hash === '/collection') return { name: 'collection' };
  if (hash === '/scan') return { name: 'scan' };
  if (hash.startsWith('/discovery/')) {
    return { name: 'discovery', topicId: hash.slice('/discovery/'.length) };
  }
  return { name: 'home' };
}

export function routeToHash(route: PageRoute): string {
  switch (route.name) {
    case 'home': return '';
    case 'explore': return '/explore';
    case 'rediscover': return '/rediscover';
    case 'collection': return '/collection';
    case 'scan': return '/scan';
    case 'discovery': return `/discovery/${route.topicId}`;
  }
}

export function useRouter() {
  const [route, setRoute] = useState<PageRoute>(parseHash());

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((r: PageRoute) => {
    const hash = routeToHash(r);
    window.location.hash = hash;
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return { route, navigate };
}
