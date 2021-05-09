import { ReactElement, useEffect } from 'react';

import './FullPageCover.css';

function FullPageCover({
  center = false,
  children = null,
  className = '',
  blurBackground = false,
}: FullPageCoverProps): ReactElement {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);
  return (
    <div className={`fullpage-cover ${className} ${center ? 'center' : ''} ${blurBackground ? 'blur-background' : ''}`}>
      {children}
    </div>
  );
}

interface FullPageCoverProps {
  center?: boolean;
  blurBackground?: boolean;
  children?: ReactElement | null;
  className?: string;
}

export { FullPageCover };
