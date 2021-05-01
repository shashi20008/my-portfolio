import { ReactElement } from 'react';
import { LoadingSpinner } from './lib/LoadingSpinner';
import { FullPageCover } from './lib/FullPageCover';

import './Loading.css';

function Loading(): ReactElement {
  return (
    <FullPageCover center={true} className="loading-container">
      <LoadingSpinner />
    </FullPageCover>
  );
}

export { Loading };
