import { ReactElement } from 'react';
import { HighlightedItem } from './HighlightedItem';
import { default as config } from '../../config/config.json';

import './Highlights.css';

function Highlights(): ReactElement {
  return (
    <div className="highlights-outer">
      <h2>Showcase</h2>
      <div className="highlights-inner">
        {(config.highlights || []).map((highlight, idx) => (
          <HighlightedItem key={idx} {...highlight} />
        ))}
      </div>
    </div>
  );
}

export { Highlights };
