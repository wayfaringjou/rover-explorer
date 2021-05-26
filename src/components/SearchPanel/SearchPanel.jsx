import * as React from 'react';
import { QueryContext } from '../../context/QueryProvider';

const SearchPanel = () => {
  const {
    activeRovers,
    queryState: [query, setQuery],
    selectedRoverState: [selectedRover, setSelectedRover],
  } = React.useContext(QueryContext);
  React.useEffect(() => {
    console.log('redraw');
    console.log(selectedRover);
  });
  const [sol, setSol] = React.useState(0);
  const [earthDate, setEarthDate] = React.useState('');
  console.log(selectedRover);
  if (selectedRover.data) {
    const {
      data: { max_sol, landing_date, max_date },
    } = selectedRover;
    console.log(selectedRover.displayRoverData());
    console.log(max_sol);
    console.log('here');
  }

  return (
    <article id="search-panel">
      <form id="search-photos">
        <fieldset>
          <legend>
            Search mars photos
          </legend>
          <label htmlFor="rover">
            <select
              name="rover"
              id="rover"
              onChange={({ target: { value } }) => {
                setSelectedRover(activeRovers[value]);
              }}
            >
              {Object.keys(activeRovers).map((rover) => {
                const { data } = activeRovers[rover];
                return (
                  <option
                    value={rover}
                    key={rover}
                  >
                    {rover}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="sol-range">
            <input
              type="range"
              value={sol}
              onChange={({ target: { value } }) => setSol(value)}
              min="0"
              max={selectedRover.data
                ? selectedRover.data.max_sol : 0}
              step="1"
            />
          </label>
          <label htmlFor="earth_date">
            <input
              type="date"
              name="earth_date"
              placeholder="Select date."
              min={selectedRover.data ? selectedRover.data.landing_date : ''}
              max={selectedRover && selectedRover.displayRoverData(['max_date'])}
            />
          </label>

        </fieldset>
      </form>
    </article>
  );
};

export default SearchPanel;
