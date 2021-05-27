import * as React from 'react';
import PropTypes from 'prop-types';
import photoTypes from '../../propTypes/photo';

const ImgCard = React.lazy(() => import('../ImgCard'));

const PhotoPage = ({ photoSet, index }) => {
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
      <section className="photo-set" style={{ display: 'flex', 'flex-wrap': 'wrap' }}>
        {photoSet.map((photo) => (
          <ImgCard key={photo.id} photo={photo} />
        ))}
      </section>
    </section>
  );
};

export default PhotoPage;

PhotoPage.propTypes = {
  photoSet: PropTypes.arrayOf(photoTypes).isRequired,
  index: PropTypes.number.isRequired,
};
