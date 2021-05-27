import * as React from 'react';

import { QueryContext } from '../../context/QueryProvider';

const MainSection = () => {
  const {
    activeRovers,
    queryState: [query, setQuery],
    selectedRoverState: [selectedRover, setSelectedRover],
    photosState: [loadedPhotos, setLoadedPhotos],
  } = React.useContext(QueryContext);

  if (loadedPhotos?.length === 0) return <p>Empty</p>;

  return (
    <article id="main-section">
      {loadedPhotos.map((photo) => (
        <img
          key={photo.id}
          alt={`${photo.rover.name} Date: ${photo.earth_date} ${photo.camera.full_name}`}
          src={photo.img_src}
          style={{ maxWidth: '200px', margin: '20px' }}
        />
      ))}
    </article>
  );
};

export default MainSection;
