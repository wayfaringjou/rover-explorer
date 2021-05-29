import * as React from 'react';
import { createPortal } from 'react-dom';
import './ImgViewer.css';

const ImgViewer = ({ children, viewerState: [viewerOpen, setViewerOpen] }) => {
  if (!viewerOpen) return null;
  return createPortal(
    <div className="img-viewer overlay">
      <article className="image-viewer stack">
        <button className="shutter shadow" type="button" onClick={(() => setViewerOpen(false))}>Close</button>
        {children}
      </article>
    </div>,
    document.getElementById('portal'),
  );
};

export default ImgViewer;
