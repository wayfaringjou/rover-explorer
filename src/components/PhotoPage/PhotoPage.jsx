import * as React from 'react';
import PropTypes from 'prop-types';
import photoTypes from '../../propTypes/photo';

const ImgCard = React.lazy(() => import('../ImgCard'));

const PhotoPage = ({
  photoSet, pageIndex, loadedPages, observerRef,
}) => {
  console.log('');
  return (
    <section
      id={`page-${pageIndex}`}
      className="photo-page"
      key={`page-${pageIndex + 1}`}
    >
      <header className="page-header">
        <h3>{`Page ${pageIndex + 1}`}</h3>
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
          />
        ))}
      </section>
    </section>
  );
};

export default PhotoPage;

PhotoPage.propTypes = {
  photoSet: PropTypes.arrayOf(photoTypes).isRequired,
  pageIndex: PropTypes.number.isRequired,
  loadedPages: PropTypes.number.isRequired,
  observerRef: PropTypes.func.isRequired,
};
