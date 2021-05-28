import * as React from 'react';
import PropTypes from 'prop-types';
import photoTypes from '../../propTypes/photo';

const ImgCard = ({
  photo, observerRef, index, pages, pageIndex, loadedPages,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div>
      <img
        id={photo.id}
        width="auto"
        height="200"
        loading="lazy"
        key={photo.id}
        alt={`${photo.rover.name} Date: ${photo.earth_date} ${photo.camera.full_name}`}
        src={photo.img_src}
        style={{ maxHeight: '200px', margin: '20px' }}
        ref={pageIndex + 1 === loadedPages && index + 1 === pages && loaded ? observerRef : null}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImgCard;

ImgCard.propTypes = {
  photo: photoTypes.isRequired,
  observerRef: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
  loadedPages: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};
