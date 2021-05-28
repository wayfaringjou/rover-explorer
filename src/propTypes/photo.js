import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  sol: PropTypes.number,
  camera: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    rover_id: PropTypes.number,
    full_name: PropTypes.string,
  }),
  img_src: PropTypes.string,
  earth_date: PropTypes.string,
  rover: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    landing_date: PropTypes.string,
    launch_date: PropTypes.string,
    status: PropTypes.string,
  }),
});
