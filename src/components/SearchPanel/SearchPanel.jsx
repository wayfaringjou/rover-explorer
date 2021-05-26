/* eslint-disable camelcase */
import * as React from 'react';
import { QueryContext } from '../../context/QueryProvider';

const SearchPanel = () => {
  const {
    activeRovers,
    queryState: [query, setQuery],
    selectedRoverState: [selectedRover, setSelectedRover],
  } = React.useContext(QueryContext);

  const [sol, setSol] = React.useState(0);
  const [earthDate, setEarthDate] = React.useState('');
  const [dateType, setDateType] = React.useState('');

  if (!selectedRover.data) {
    return <p>Loading Data</p>;
  }

  const {
    name,
    data: { max_sol, landing_date, max_date },
  } = selectedRover;

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
              {Object.keys(activeRovers).map((rover) => (
                <option value={rover} key={rover}>
                  {activeRovers[rover].data.name}
                </option>
              ))}
            </select>
          </label>
          {/* TODO: manage radio with state and hide/disable non-selected type */}
          <p>Select date type:</p>
          <label htmlFor="sol-type">
            <input type="radio" id="sol-type" name="date-type" value="sol" checked />
            Sol
          </label>
          <label htmlFor="earth-type">
            <input type="radio" id="earth-type" name="date-type" value="earth" />
            Earth Date
          </label>
          <label htmlFor="sol-range">
            <p>Search photos by &apos;sol&apos; (mission day):</p>
            <p>{`${name} has photos from sol: 0 to sol: ${max_sol}`}</p>
            <input
              type="range"
              id="sol-range"
              value={sol}
              onChange={({ target: { value } }) => setSol(value)}
              min="0"
              max={max_sol}
              step="1"
            />
            <input
              type="number"
              id="sol-range"
              value={sol}
              onChange={({ target: { value } }) => setSol(value)}
              min="0"
              max={max_sol}
            />
          </label>

          <label htmlFor="earth_date">
            <p>Search photos by earth date:</p>
            <p>{`${name} has photos from ${landing_date} to ${max_date}`}</p>
            <input
              type="date"
              name="earth_date"
              placeholder="Select date."
              min={landing_date}
              max={max_date}
            />
          </label>
          <button type="submit">Search</button>
        </fieldset>
      </form>
    </article>
  );
};

export default SearchPanel;
