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

function CenteredLoadingSpinner(): ReactElement {
  return (
    <div className="centered-loading-spinner">
      <LoadingSpinner />
    </div>
  );
}

export { LoadingSpinner, CenteredLoadingSpinner };
