import { ReactElement } from 'react';

import './FullPageCover.css';

function FullPageCover({ center, children, className }: FullPageCoverProps): ReactElement {
  return <div className={`fullpage-cover ${className} ${center ? 'center' : ''}`}>{children}</div>;
}

interface FullPageCoverProps {
  center: boolean;
  children: ReactElement | null;
  className: string;
}

export { FullPageCover };
