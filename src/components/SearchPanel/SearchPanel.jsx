import * as React from 'react';
import dayjs from 'dayjs';
import './SearchPanel.css';

import { QueryContext } from '../../context/QueryProvider';

const assembleQueries = (
  event, {
    dateType = null, sol = null, earth_date = null, camera = null,
  }, callback,
) => {
  event.preventDefault();
  const queries = [];
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
    manifestState: [manifestForQuery, setManifestForQuery],
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
      name, cameras, max_sol, landing_date, max_date, photo_manifest,
    },
  } = selectedRover;

  const parameters = {
    dateType, sol, earth_date: earthDate, camera,
  };

  const currentPhotoIndex = dateType === 'sol'
    ? photo_manifest?.photos.findIndex((manifest) => manifest.sol === parseInt(sol, 10))
    : photo_manifest?.photos.findIndex((manifest) => manifest.earth_date === earthDate);

  return (
    <article id="search-panel" className="box stack">
      <header className="box bg-neutral-800 shadow">
        <h2>Search mars photos</h2>
      </header>
      <form
        id="search-photos"
        className=""
        onSubmit={(e) => {
          setLoadedPhotos([]);
          setManifestForQuery(photo_manifest.photos[currentPhotoIndex]);
          assembleQueries(e, parameters, setQuery);
        }}
      >

        <fieldset id="rover-select" className="box bg-neutral-400 shadow">
          <legend className="bg-neutral-800 shadow">Select Rover:</legend>
          <div className="cluster">
            <div className="cluster-int">
              {Object.keys(activeRovers).map((rover) => (
                <button
                  key={rover}
                  type="button"
                  className="toggle shutter shadow"
                  disabled={selectedRover.name === rover}
                  onClick={(e) => {
                    e.preventDefault();
                    setQuery([]);
                    setCamera('');
                    setSol(0);
                    setEarthDate(activeRovers[rover].data.landing_date);
                    setSelectedRover(activeRovers[rover]);
                  }}
                >
                  {activeRovers[rover]?.data.name}
                </button>

              ))}
            </div>
          </div>
        </fieldset>

        <fieldset id="type-select" className="box bg-neutral-400 shadow stack">
          <legend className="bg-neutral-800 shadow">Select date type:</legend>
          <label htmlFor="sol-type" className="radio">
            <span className="radio-input">
              <input
                type="radio"
                id="sol-type"
                name="date-type"
                value="sol"
                checked={dateType === 'sol'}
                onChange={({ target: { value } }) => setDateType(value)}
              />
              <span className="radio-control" />
            </span>
            <span className="radio-label">Sol</span>
          </label>
          <label htmlFor="earth-type" className="radio">
            <span className="radio-input">
              <input
                type="radio"
                id="earth-type"
                name="date-type"
                value="earth"
                checked={dateType === 'earth'}
                onChange={({ target: { value } }) => setDateType(value)}
              />
              <span className="radio-control" />
            </span>
            <span className="radio-label">Earth Date</span>
          </label>
        </fieldset>

        {dateType === 'sol' && (
        <fieldset disabled={dateType !== 'sol'} id="sol-select" className="box bg-neutral-400 shadow stack">
          <legend className="bg-neutral-800 shadow">Search photos by &apos;sol&apos; (mission day):</legend>
          <label htmlFor="sol-range">
            <p>{`${name} has photos from sol: 0 to sol: ${max_sol}`}</p>
            <p>{`Sol ${sol} has ${photo_manifest.photos[currentPhotoIndex]?.total_photos ?? 'no'} photos available.`}</p>
            <input
              type="range"
              id="sol-range"
              value={sol}
              onChange={({ target: { value } }) => {
                setCamera('');
                setSol(value);
              }}
              min="0"
              max={max_sol}
              step="1"
            />
            <input
              type="number"
              id="sol-range"
              value={sol}
              onChange={({ target: { value } }) => {
                setCamera('');
                setSol(value);
              }}
              min="0"
              max={max_sol}
            />
          </label>
        </fieldset>
        )}

        {dateType === 'earth' && (
          <fieldset disabled={dateType !== 'earth'} id="earth-select" className="box bg-neutral-400 shadow stack">
            <legend className="bg-neutral-800 shadow">Search photos by earth date:</legend>
            <label htmlFor="earth_date" className="stack">
              <p>{`${name} has photos from ${landing_date} to ${max_date}`}</p>
              <p>{`Earth date ${earthDate} has ${photo_manifest.photos[currentPhotoIndex]?.total_photos ?? 'no'} photos available.`}</p>
              <input
                type="date"
                name="earth_date"
                placeholder="Select date."
                min={landing_date}
                max={max_date}
                disabled={dateType !== 'earth'}
                onChange={({ target: { value } }) => {
                  setCamera('');
                  setEarthDate(value);
                }}
                value={earthDate}
              />
            </label>
          </fieldset>
        )}

        <fieldset id="camera-select" className="box bg-neutral-400 shadow">
          <legend className="bg-neutral-800 shadow">Select Camera:</legend>
          <div className="cluster">
            <div className="cluster-int">
              <button
                key="all"
                className="toggle shutter shadow"
                type="button"
                disabled={camera === ''}
                onClick={(e) => {
                  e.preventDefault();
                  setCamera('');
                }}
              >
                All
              </button>
              {photo_manifest?.photos[currentPhotoIndex]?.cameras.map((cam) => (
                <button
                  className="toggle shutter shadow"
                  key={cam}
                  type="button"
                  disabled={cam.toLowerCase() === camera}
                  onClick={(e) => {
                    e.preventDefault();
                    setCamera(cam.toLowerCase());
                  }}
                >
                  {cam}
                </button>
              ))}
            </div>
          </div>
        </fieldset>
        <div id="submit-clear" className="box">
          <div className="cluster">
            <div className="cluster-int">
              <button type="submit" className="shutter shadow">Search</button>
              <button
                type="button"
                className="shutter shadow"
                onClick={(e) => handleClear(e, setQuery, setLoadedPhotos)}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
    </article>
  );
};

export default SearchPanel;
