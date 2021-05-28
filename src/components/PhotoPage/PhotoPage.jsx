import * as React from 'react';
import PropTypes from 'prop-types';
import photoTypes from '../../propTypes/photo';

const ImgCard = React.lazy(() => import('../ImgCard'));

const PhotoPage = ({ photoSet, index, observerRef }) => {
  console.log('');
  return (
    <section
      id={`page-${index}`}
      className="photo-page"
      key={`page-${index + 1}`}
    >
      <header className="page-header">
        <h3>{`Page ${index + 1}`}</h3>
      </header>
      <section className="photo-set" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {photoSet.map((photo, i, a) => (
          <ImgCard
            key={photo.id}
            photo={photo}
            observerRef={observerRef}
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
  index: PropTypes.number.isRequired,
  observerRef: PropTypes.func.isRequired,
};
