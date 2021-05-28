import * as React from 'react';
import {
  Header, SearchPanel, MainSection, Footer, ErrorMsg,
} from '..';
import { activeRover } from '../../utils/fetchResources';
import QueryProvider from '../../context/QueryProvider';
import './App.css';

/*
- Header containing the application title
- Search panel containing with subcomponents which allow the user to select the
Sol and Camera defining the group of photos to be displayed
- The search panel must contain a search button the user clicks to display the photos
- Main section where the photos matching the search criteria will be displayed
- Footer section with your developer information
 */

function App() {
  const [errors, setErrors] = React.useState({});
  console.log(errors);
  // Data about rovers is requested on load
  // Data is requested imperatively when search is done
  // Data is requested with intersectionObserver callback page by page
  const [activeRovers, setActiveRovers] = React.useState({
    curiosity: activeRover({ name: 'curiosity' }),
    opportunity: activeRover({ name: 'opportunity' }),
    spirit: activeRover({ name: 'spirit' }),
    perseverance: activeRover({ name: 'perseverance' }),
  });

  React.useEffect(() => {
    if (activeRovers) {
      const {
        curiosity, opportunity, spirit, perseverance,
      } = activeRovers;
      Promise.allSettled([
        curiosity.setRoverData(),
        opportunity.setRoverData(),
        spirit.setRoverData(),
        perseverance.setRoverData(),
      ]).then((results) => {
        const rejected = results.filter((result) => result.status === 'rejected');

        if (rejected.length > 0) {
          throw new Error('Error fetching rover data, wait a while and try refreshing.');
        }

        setActiveRovers({
          curiosity, opportunity, spirit, perseverance,
        });
      }).catch((error) => setErrors(error.message));
    }
  }, []);

  return (
    <QueryProvider activeRovers={activeRovers} errorHandler={setErrors}>
      <div className="App vignette">
        <ErrorMsg errorState={[errors, setErrors]} />
        <Header />
        <SearchPanel />
        <MainSection />
        <Footer />
      </div>
    </QueryProvider>
  );
}

export default App;
