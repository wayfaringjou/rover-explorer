import * as React from 'react';
import dayjs from 'dayjs';

import { QueryContext } from '../../context/QueryProvider';

const assembleQueries = (
  event, {
    dateType = null, sol = null, earth_date = null, camera = null,
  }, callback,
) => {
  event.preventDefault();
  const queries = [];
  console.log(dateType, sol, earth_date, camera);
  console.log(sol ?? dateType === 'sol');
  if (dateType === 'sol' && sol !== null) queries.push(`sol=${sol}`);
  if (dateType === 'earth' && earth_date !== null) queries.push(`earth_date=${earth_date}`);
  if (camera) queries.push(`camera=${camera}`);

  callback(queries);
};

const handleClear = (event, queryCallback, loadedPhotosCallback) => {
  event.preventDefault();
  queryCallback([]);
  loadedPhotosCallback([]);
};

const SearchPanel = () => {
  const {
    activeRovers,
    queryState: [query, setQuery],
    selectedRoverState: [selectedRover, setSelectedRover],
    photosState: [loadedPhotos, setLoadedPhotos],
  } = React.useContext(QueryContext);

  const [camera, setCamera] = React.useState('');
  const [dateType, setDateType] = React.useState('sol');
  const [sol, setSol] = React.useState(0);
  const [earthDate, setEarthDate] = React.useState('');

  React.useEffect(() => {
    if (selectedRover?.data?.landing_date) {
      setEarthDate(selectedRover.data.landing_date);
    }
    if (selectedRover?.data?.cameras) {
      setCamera('');
    }
  }, [selectedRover, selectedRover?.data]);

  if (!selectedRover.data) {
    return <p>Loading Data</p>;
  }
  const {
    data: {
      name, cameras, max_sol, landing_date, max_date,
    },
  } = selectedRover;

  const parameters = {
    dateType, sol, earth_date: earthDate, camera,
  };

  return (
    <article id="search-panel">
      <header>
        <h2>Search mars photos</h2>
      </header>
      <form id="search-photos" onSubmit={(e) => assembleQueries(e, parameters, setQuery)}>

        <fieldset>
          <legend>Select Rover:</legend>
          {Object.keys(activeRovers).map((rover) => (
            <button
              key={rover}
              type="button"
              disabled={selectedRover.name === rover}
              onClick={(e) => {
                e.preventDefault();
                setQuery([]);
                setCamera('');
                setSelectedRover(activeRovers[rover]);
              }}
            >
              {activeRovers[rover]?.data.name}
            </button>
          ))}
        </fieldset>

        <fieldset>
          <legend>Select date type:</legend>
          <label htmlFor="sol-type">
            <input
              type="radio"
              id="sol-type"
              name="date-type"
              value="sol"
              checked={dateType === 'sol'}
              onChange={({ target: { value } }) => setDateType(value)}
            />
            Sol
          </label>
          <label htmlFor="earth-type">
            <input
              type="radio"
              id="earth-type"
              name="date-type"
              value="earth"
              checked={dateType === 'earth'}
              onChange={({ target: { value } }) => setDateType(value)}
            />
            Earth Date
          </label>
        </fieldset>

        {dateType === 'sol' && (
        <fieldset disabled={dateType !== 'sol'}>
          <legend>Search photos by &apos;sol&apos; (mission day):</legend>
          <label htmlFor="sol-range">
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
        </fieldset>
        )}

        {dateType === 'earth' && (
          <fieldset disabled={dateType !== 'earth'}>
            <legend>Search photos by earth date:</legend>
            <label htmlFor="earth_date">
              <p>{`${name} has photos from ${landing_date} to ${max_date}`}</p>
              <input
                type="date"
                name="earth_date"
                placeholder="Select date."
                min={landing_date}
                max={max_date}
                disabled={dateType !== 'earth'}
                onChange={({ target: { value } }) => setEarthDate(value)}
                value={earthDate}
              />
            </label>
          </fieldset>
        )}

        <fieldset>
          <legend>Select Camera:</legend>
          <button
            key="all"
            type="button"
            disabled={camera === ''}
            onClick={(e) => {
              e.preventDefault();
              setCamera('');
            }}
          >
            All
          </button>
          { cameras.map((cam) => (
            <button
              key={cam.name}
              type="button"
              disabled={cam.name.toLowerCase() === camera}
              onClick={(e) => {
                e.preventDefault();
                setCamera(cam.name.toLowerCase());
              }}
            >
              {cam.name}
            </button>
          ))}
        </fieldset>
        <hr />
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={(e) => handleClear(e, setQuery, setLoadedPhotos)}
        >
          Clear
        </button>
      </form>
    </article>
  );
};

export default SearchPanel;
