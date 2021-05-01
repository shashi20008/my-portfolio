import { ReactElement } from 'react';

import './LoadingSpinner.css';

function LoadingSpinner(): ReactElement {
  return (
    <div className="lds-default">
      {Array(12)
        .fill(undefined)
        .map((_, i) => (
          <div key={i}></div>
        ))}
    </div>
  );
}

export { LoadingSpinner };
