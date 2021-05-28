import * as React from 'react';
import { createPortal } from 'react-dom';

const ImgViewer = ({ children, viewerState: [viewerOpen, setViewerOpen] }) => {
  if (!viewerOpen) return null;
  return createPortal(
    <div className="overlay">
      <article>
        <button type="button" onClick={(() => setViewerOpen(false))}>Close</button>
        {children}
      </article>
    </div>,
    document.getElementById('portal'),
  );
};

export default ImgViewer;
