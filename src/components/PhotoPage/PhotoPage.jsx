import * as React from 'react';
import PropTypes from 'prop-types';
import photoTypes from '../../propTypes/photo';
import { QueryContext } from '../../context/QueryProvider';

const ImgCard = React.lazy(() => import('../ImgCard'));

const PhotoPage = ({
  photoSet, pageIndex, loadedPages, observerRef, magnifiedState, viewerState,
}) => {
  const {
    manifestState: [manifestForQuery, setManifestForQuery],
  } = React.useContext(QueryContext);

  const { total_photos } = manifestForQuery;

  return (
    <section
      id={`page-${pageIndex + 1}`}
      className="photo-page"
      key={`page-${pageIndex + 1}`}
    >
      <header className="page-header">
        <h3>{`Page ${pageIndex + 1}`}</h3>
        <p>{`Photos ${pageIndex * 25 + 1}-${photoSet.length * (pageIndex + 1)} from ${total_photos} (All cameras)`}</p>
      </header>
      <section className="photo-set" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {photoSet.map((photo, i, a) => (
          <ImgCard
            key={photo.id}
            photo={photo}
            observerRef={observerRef}
            pageIndex={pageIndex}
            loadedPages={loadedPages}
            index={i}
            pages={a.length}
            magnifiedState={magnifiedState}
            viewerState={viewerState}
          />
        ))}
      </section>
      <a href="#page-1">Return to top</a>
    </section>
  );
};

export default PhotoPage;

PhotoPage.propTypes = {
  photoSet: PropTypes.arrayOf(photoTypes).isRequired,
  pageIndex: PropTypes.number.isRequired,
  loadedPages: PropTypes.number.isRequired,
  observerRef: PropTypes.func.isRequired,
  magnifiedState: PropTypes.arrayOf(PropTypes
    .oneOfType([PropTypes.string, PropTypes.func, PropTypes.element])).isRequired,
  viewerState: PropTypes.arrayOf(PropTypes
    .oneOfType([PropTypes.bool, PropTypes.func])).isRequired,
};
