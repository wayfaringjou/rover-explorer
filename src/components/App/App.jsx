import * as React from 'react';
import {
  Header, SearchPanel, MainSection, Footer, ErrorMsg,
} from '..';
import { activeRover } from '../../utils/fetchResources';
import QueryProvider from '../../context/QueryProvider';
/*
- Header containing the application title
- Search panel containing with subcomponents which allow the user to select the
Sol and Camera defining the group of photos to be displayed
- The search panel must contain a search button the user clicks to display the photos
- Main section where the photos matching the search criteria will be displayed
- Footer section with your developer information
 */

function App() {
  const [errors, setErrors] = React.useState();

  // Data about rovers is requested on load
  // Data is requested imperatively when search is done
  // Data is requested with intersectionObserver callback page by page
  const activeRovers = React.useRef({
    curiosity: activeRover({ name: 'curiosity' }),
    opportunity: activeRover({ name: 'opportunity' }),
    spirit: activeRover({ name: 'spirit' }),
    perseverance: activeRover({ name: 'perseverance' }),
  });

  React.useEffect(() => {
    if (activeRovers.current) {
      const {
        curiosity, opportunity, spirit, perseverance,
      } = activeRovers.current;
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
      }).catch((error) => setErrors(error.message));
    }
  }, [activeRovers.current]);

  return (
    <QueryProvider activeRovers={activeRovers.current}>
      <div className="App">
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
