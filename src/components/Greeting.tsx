import { ReactElement, useCallback, useEffect, useState } from 'react';
import { FullPageCover } from './lib/FullPageCover';

import './Greeting.css';
import { hasRecentlyVisited, markVisit } from '../common/utils';
import { getContent } from '../common/content';

const KEYS = ['greeting-1', 'greeting-2'];

function Greeting(): ReactElement | null {
  const [contentKey, setContent] = useState<string | null>('');

  useEffect(() => {
    const recentVisit = hasRecentlyVisited();
    markVisit();

    if (recentVisit) {
      return setContent(null);
    }

    setContent(KEYS[0]);
  }, []);

  const onAnimationEnd = useCallback(() => {
    setContent((old) => (old === KEYS[0] ? KEYS[1] : null));
  }, []);

  if (contentKey === null) {
    return null;
  }

  return (
    <FullPageCover className="greeting-container" center={true}>
      {!!contentKey ? (
        <h1 key={contentKey} className="content-container" onAnimationEnd={onAnimationEnd}>
          {getContent(contentKey)}
        </h1>
      ) : null}
    </FullPageCover>
  );
}

export { Greeting };
