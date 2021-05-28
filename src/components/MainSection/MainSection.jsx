/* eslint-disable consistent-return */
import * as React from 'react';

import { QueryContext } from '../../context/QueryProvider';
import ImgViewer from '../ImgViewer/ImgViewer';

const PhotoPage = React.lazy(() => import('../PhotoPage'));
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7,
};

const MainSection = () => {
  const {
    activeRovers,
    queryState: [query, setQuery],
    selectedRoverState: [selectedRover, setSelectedRover],
    photosState: [loadedPhotos, setLoadedPhotos],
    manifestState: [manifestForQuery, setManifestForQuery],
    loadingState: [loading, setLoading],
  } = React.useContext(QueryContext);

  const observer = React.useRef();
  const lastQuery = React.useRef();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [allPhotosFetched, setAllPhotosFetched] = React.useState(false);

  React.useEffect(async () => {
    if (allPhotosFetched && query && lastQuery?.current) {
      if (query !== lastQuery) setAllPhotosFetched(false);
      setPageNumber(loadedPhotos?.length ? loadedPhotos.length + 1 : 0);
    }

    if (query) {
      lastQuery.current = query;
    }

    if (loadedPhotos?.length > 0) {
      setLoading(true);
      const newPage = await selectedRover.fetchData('/photos', query, pageNumber);
      setLoading(false);
      if (!newPage?.photos?.length) {
        setAllPhotosFetched(true);
      } else {
        setLoadedPhotos((loaded) => [...loaded, newPage.photos]);
      }
    }
  }, [pageNumber, query]);

  const lastPhotoRef = React.useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !allPhotosFetched && loadedPhotos?.length > 0) {
        setPageNumber(() => loadedPhotos.length + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, allPhotosFetched, loadedPhotos?.length]);

  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [magnifiedImg, setMagnifiedImg] = React.useState('');

  if (loadedPhotos?.length === 0) return <p>Empty</p>;
  return (
    <>
      <article id="main-section">
        <React.Suspense fallback={<p>Loading</p>}>
          {loadedPhotos.map((photoSet, i, a) => (
            <PhotoPage
              observerRef={lastPhotoRef}
              photoSet={photoSet}
              pageIndex={i}
              loadedPages={a.length}
              key={`page-${i + 1}`}
              magnifiedState={[magnifiedImg, setMagnifiedImg]}
              viewerState={[viewerOpen, setViewerOpen]}
            />
          ))}
          <div />
        </React.Suspense>
      </article>
      <ImgViewer viewerState={[viewerOpen, setViewerOpen]}>{magnifiedImg}</ImgViewer>
    </>
  );
};

export default MainSection;
