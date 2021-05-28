/* eslint-disable consistent-return */
import * as React from 'react';

import { QueryContext } from '../../context/QueryProvider';
// import useInterserctionObserver from '../../hooks/useIntersectionObserver';

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

  // const [setNode, entry] = useInterserctionObserver(observerOptions);
  const observer = React.useRef();
  const lastQuery = React.useRef();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [allPhotosFetched, setAllPhotosFetched] = React.useState(false);

  React.useEffect(async () => {
    console.log('running');
    if (allPhotosFetched && query && lastQuery?.current) {
      if (query !== lastQuery) setAllPhotosFetched(false);
      setPageNumber(loadedPhotos?.length ? loadedPhotos.length + 1 : 0);
    }

    if (query) {
      lastQuery.current = query;
    }

    console.log(loadedPhotos?.length > 0);
    console.log(loadedPhotos);

    if (loadedPhotos?.length > 0) {
      console.log(`will load ${pageNumber}`);
      setLoading(true);
      const newPage = await selectedRover.fetchData('/photos', query, pageNumber);
      setLoading(false);
      if (!newPage?.photos?.length) {
        setAllPhotosFetched(true);
      } else {
        console.log(newPage);
        setLoadedPhotos((loaded) => [...loaded, newPage.photos]);
        console.log(loadedPhotos);
      }
    }
  }, [pageNumber, query]);

  const lastPhotoRef = React.useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      console.log(loadedPhotos.length > 0);
      if (entries[0].isIntersecting && !allPhotosFetched && loadedPhotos?.length > 0) {
        console.log('Visible');
        setPageNumber(() => loadedPhotos.length + 1);
      }
    });
    if (node) observer.current.observe(node);
    console.log(node);
  }, [loading, allPhotosFetched, loadedPhotos?.length]);
  /*
  React.useEffect(() => {
    let isMounted = true;
    console.log(loadedPhotos?.length && entry?.isIntersecting && !loading);
    console.log(`Loading is ${loading}`);
    if (loading) return;

    if (loadedPhotos?.length >= 1 && entry?.isIntersecting && !loading) {
    // If query state has a 'page=*' element already, clear it
      const camRE = /^page=.+/;
      setQuery(query.filter((q) => camRE.test(q)));
      setQuery([...query, `page=${loadedPhotos.length + 1}`]);
      if (isMounted) {
        setLoading('true');
        let nextPage;
        console.log(`fetching with query ${query}`);
        selectedRover.fetchData('/photos', query)
          .then((res) => {
            if (res.error) throw new Error(res.error);
            nextPage = res.photos;
            const newPhotoSet = [...loadedPhotos, nextPage];
            console.log(newPhotoSet);
            setLoadedPhotos(() => (newPhotoSet));
            setLoading('false');
          })
          .catch((error) => console.log(error));
      }
    }

    // eslint-disable-next-line no-return-assign
    return () => {
      isMounted = false;
    };
  }, [entry?.isIntersecting, loadedPhotos?.length, loading]);
*/
  // console.log(entry);
  if (loadedPhotos?.length === 0) return <p>Empty</p>;

  const { data: { photo_manifest } } = selectedRover;

  console.log(loadedPhotos);
  return (
    <article id="main-section">
      <React.Suspense fallback={<p>Loading</p>}>
        {loadedPhotos.map((photoSet, i, a) => (
          <PhotoPage
            observerRef={lastPhotoRef}
            photoSet={photoSet}
            pageIndex={i}
            loadedPages={a.length}
            key={`page-${i + 1}`}
          />
        ))}
        <div />
      </React.Suspense>
    </article>
  );
};

export default MainSection;
