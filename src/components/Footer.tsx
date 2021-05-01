import { ReactElement } from 'react';
import { getContent } from '../common/content';

import './Footer.css';

function Footer(): ReactElement {
  return (
    <footer className="footer">
      <span>{getContent('copyright-notice')}</span>
    </footer>
  );
}

export { Footer };
