import * as React from 'react';

import { QueryContext } from '../../context/QueryProvider';
import useInterserctionObserver from '../../hooks/useIntersectionObserver';

const PhotoPage = React.lazy(() => import('../PhotoPage'));
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const MainSection = () => {
  const {
    activeRovers,
    queryState: [query, setQuery],
    selectedRoverState: [selectedRover, setSelectedRover],
    photosState: [loadedPhotos, setLoadedPhotos],
  } = React.useContext(QueryContext);

  const [setNode, entry] = useInterserctionObserver(observerOptions);
  // React.useEffect();
  console.log(entry);
  if (loadedPhotos?.length === 0) return <p>Empty</p>;
  console.log(loadedPhotos);
  return (
    <article id="main-section">
      <React.Suspense fallback={<p>Loading</p>}>
        { loadedPhotos.map((photoSet, i) => (
          <PhotoPage photoSet={photoSet} index={i} key={`page-${i + 1}`} />
        ))}
      </React.Suspense>
    </article>
  );
};

export default MainSection;
