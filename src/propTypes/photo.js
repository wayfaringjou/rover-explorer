import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  sol: PropTypes.number,
  camera: PropTypes.objectOf(PropTypes.object),
  img_src: PropTypes.string,
  earth_date: PropTypes.string,
  rover: PropTypes.objectOf(PropTypes.object),
});
