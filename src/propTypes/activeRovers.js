import PropTypes from 'prop-types';

const roverDataTypes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  landing_date: PropTypes.string,
  launch_date: PropTypes.string,
  status: PropTypes.string,
  max_sol: PropTypes.number,
  max_date: PropTypes.string,
  total_photos: PropTypes.number,
  cameras: PropTypes.arrayOf(PropTypes.object),
});

const roverTypes = PropTypes.shape({
  name: PropTypes.string,
  data: roverDataTypes,
  fetchData: PropTypes.func,
  setRoverData: PropTypes.func,
  getData: PropTypes.func,
});

export default PropTypes.shape({
  curiosity: roverTypes,
  opportunity: roverTypes,
  spirit: roverDataTypes,
  perseverance: roverTypes,
});
