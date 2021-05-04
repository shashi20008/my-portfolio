import { ReactElement, useEffect } from 'react';

import './FullPageCover.css';

function FullPageCover({ center, children, className }: FullPageCoverProps): ReactElement {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);
  return <div className={`fullpage-cover ${className} ${center ? 'center' : ''}`}>{children}</div>;
}

interface FullPageCoverProps {
  center: boolean;
  children: ReactElement | null;
  className: string;
}

export { FullPageCover };
