import * as React from 'react';
import PropTypes from 'prop-types';
import photoTypes from '../../propTypes/photo';

const ImgCard = ({
  photo, observerRef, index, pages,
}) => {
  console.log('');
  return (
    <div>
      <img
        width="auto"
        height="200"
        loading="lazy"
        key={photo.id}
        alt={`${photo.rover.name} Date: ${photo.earth_date} ${photo.camera.full_name}`}
        src={photo.img_src}
        style={{ maxHeight: '200px', margin: '20px' }}
        ref={index + 1 === pages ? observerRef : null}
      />
    </div>
  );
};

export default ImgCard;

ImgCard.propTypes = {
  photo: photoTypes.isRequired,
  observerRef: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};
