import * as React from 'react';
import PropTypes from 'prop-types';
import photoTypes from '../../propTypes/photo';
import './ImgCard.css';

const ImgCard = ({
  photo,
  observerRef,
  index, pages,
  pageIndex,
  loadedPages,
  magnifiedState: [magnifiedImg, setMagnifiedImg],
  viewerState: [viewerOpen, setViewerOpen],
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <figure className="photo-thumb">
      <img
        id={photo.id}
        width="auto"
        height="288"
        loading="lazy"
        key={photo.id}
        alt={`${photo.rover.name} Date: ${photo.earth_date} ${photo.camera.full_name}`}
        src={photo.img_src}
        ref={pageIndex + 1 === loadedPages && index + 1 === pages && loaded ? observerRef : null}
        onLoad={() => setLoaded(true)}
      />
      <figcaption className="caption">
        <header>
          <h4 className="vt323">{`${photo.rover.name}: Sol: ${photo.sol}`}</h4>
        </header>
        <p>{`Camera: ${photo.camera.full_name}`}</p>
        <button
          type="button"
          className="shutter shadow"
          onClick={() => {
            setMagnifiedImg(
              <figure>
                <img
                  alt={`${photo.rover.name} Date: ${photo.earth_date} ${photo.camera.full_name}`}
                  src={photo.img_src}
                  id={photo.id}
                />
                <figcaption>
                  <header>
                    <h2>{photo.rover.name}</h2>
                  </header>
                  <p className="caption">
                    {`Date: ${photo.earth_date} Sol: ${photo.sol}`}
                  </p>
                  <p className="caption">{`Camera: ${photo.camera.full_name}`}</p>
                </figcaption>
              </figure>,
            );
            setViewerOpen(true);
          }}
        >
          Enhance
        </button>
      </figcaption>
      <div className="overlay" />
    </figure>
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
  magnifiedState: PropTypes.arrayOf(PropTypes
    .oneOfType([PropTypes.string, PropTypes.func, PropTypes.element])).isRequired,
  viewerState: PropTypes.arrayOf(PropTypes
    .oneOfType([PropTypes.bool, PropTypes.func])).isRequired,
};
