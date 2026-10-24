import StemHero from "./StemHero";
import { useRouter } from '@/hooks/useRouter';
import { useCollection } from '@/hooks/useCollection';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { RediscoverPage } from '@/pages/RediscoverPage';
import { DiscoveryPage } from '@/pages/DiscoveryPage';
import { CollectionPage } from '@/pages/CollectionPage';

export default function App() {
  const { route, navigate } = useRouter();
  const { savedIds, isSaved, toggleSave } = useCollection();

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navigation route={route} navigate={navigate} collectionCount={savedIds.length} />

      <main className="flex-1">
        {route.name === 'home' && (
          <HomePage navigate={navigate} isSaved={isSaved} toggleSave={toggleSave} />
        )}
        {route.name === 'explore' && (
          <ExplorePage navigate={navigate} isSaved={isSaved} toggleSave={toggleSave} />
        )}
        {route.name === 'rediscover' && <RediscoverPage navigate={navigate} />}
        {route.name === 'discovery' && (
          <DiscoveryPage
            topicId={route.topicId}
            navigate={navigate}
            isSaved={isSaved}
            toggleSave={toggleSave}
          />
        )}
        {route.name === 'collection' && (
          <CollectionPage
            savedIds={savedIds}
            navigate={navigate}
            isSaved={isSaved}
            toggleSave={toggleSave}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
