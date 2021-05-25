import * as React from 'react';
import PropTypes from 'prop-types';
import activeRoverTypes from '../propTypes/activeRovers';

export const QueryContext = React.createContext();

const QueryProvider = ({ children, activeRovers }) => {
  const [query, setQuery] = React.useState('');
  const [selectedRover, setSelectedRover] = React.useState('');
  const [loadedPhotos, setLoadedPhotos] = React.useState('');

  React.useEffect(() => {
    if (query && selectedRover) {
      setLoadedPhotos(activeRovers(selectedRover));
    }
  }, [query]);

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
};

QueryProvider.defaultProps = {
  children: {},
};
