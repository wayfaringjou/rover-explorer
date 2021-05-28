import * as React from 'react';

import { QueryContext } from '../../context/QueryProvider';
import useInterserctionObserver from '../../hooks/useIntersectionObserver';

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
  } = React.useContext(QueryContext);

  const [setNode, entry] = useInterserctionObserver(observerOptions);
  const [loadingStatus, setLoadingStatus] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    console.log(!loadingStatus);
    console.log(loadedPhotos?.length && entry?.isIntersecting && !loadingStatus);
    if (loadedPhotos?.length >= 1 && entry?.isIntersecting && !loadingStatus) {
    // If query state has a 'page=*' element already, clear it
      const camRE = /^page=.+/;
      setQuery(query.filter((q) => camRE.test(q)));
      setQuery([...query, `page=${loadedPhotos.length + 1}`]);
      if (isMounted) {
        setLoadingStatus('true');
        let nextPage;

        selectedRover.fetchData('/photos', query)
          .then((res) => {
            if (res.error) throw new Error(res.error);
            nextPage = res.photos;
            console.log(nextPage);
            setLoadedPhotos([...loadedPhotos, nextPage]);
            setLoadingStatus('false');
          })
          .catch((error) => console.log(error));
      }
    }

    // eslint-disable-next-line no-return-assign
    return () => isMounted = false;
  }, [entry?.isIntersecting, loadedPhotos?.length, loadingStatus]);
  console.log(entry);
  if (loadedPhotos?.length === 0) return <p>Empty</p>;
  console.log(loadedPhotos);
  return (
    <article id="main-section">
      <React.Suspense fallback={<p>Loading</p>}>
        {loadedPhotos.map((photoSet, i) => (
          <PhotoPage observerRef={setNode} photoSet={photoSet} index={i} key={`page-${i + 1}`} />
        ))}
        <div />
      </React.Suspense>
    </article>
  );
};

export default MainSection;
