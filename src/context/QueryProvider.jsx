import * as React from 'react';
import PropTypes from 'prop-types';
import activeRoverTypes from '../propTypes/activeRovers';

export const QueryContext = React.createContext();

const QueryProvider = ({ children, activeRovers, errorHandler }) => {
  const [query, setQuery] = React.useState([]);
  const [selectedRover, setSelectedRover] = React.useState(activeRovers.curiosity);
  const [loadedPhotos, setLoadedPhotos] = React.useState([]);

  React.useEffect(async () => {
    // TODO handle erroneous requests
    if (query.length) {
      const { photos, error } = await selectedRover.fetchData('/photos', query);
      if (error) {
        console.log(photos, error);
        errorHandler(error);
      } else {
        setLoadedPhotos([photos]);
      }
    }
  }, [query, selectedRover.data]);

  const value = {
    queryState: [query, setQuery],
    selectedRoverState: [selectedRover, setSelectedRover],
    photosState: [loadedPhotos, setLoadedPhotos],
    activeRovers,
  };

  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};

export default QueryProvider;

QueryProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.object]),
  activeRovers: activeRoverTypes.isRequired,
  errorHandler: PropTypes.func.isRequired,
};

QueryProvider.defaultProps = {
  children: {},
};
