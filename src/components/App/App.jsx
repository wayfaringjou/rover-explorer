import * as React from 'react';
import {
  Header, SearchPanel, MainSection, Footer,
} from '..';

/*
- Header containing the application title
- Search panel containing with subcomponents which allow the user to select the
Sol and Camera defining the group of photos to be displayed
- The search panel must contain a search button the user clicks to display the photos
- Main section where the photos matching the search criteria will be displayed
- Footer section with your developer information
 */

function App() {
  return (
    <div className="App">
      <Header />
      <SearchPanel />
      <MainSection />
      <Footer />
    </div>
  );
}

export default App;
