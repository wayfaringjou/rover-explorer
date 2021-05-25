import * as React from 'react';
import { QueryContext } from '../../context/QueryProvider';

const SearchPanel = () => {
  const { activeRovers, queryState, selectedRoverState } = React.useContext(QueryContext);
  console.log(activeRovers, queryState, selectedRoverState);
  return (<article id="search-panel" />
  );
};

export default SearchPanel;
