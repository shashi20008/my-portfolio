import { ReactElement, useCallback, useState } from 'react';
import { getContent } from '../common/content';

import './Header.css';

function Header(): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((old) => !old), []);

  return (
    <div className="header">
      <div className="App-Inner header-centered">
        <div className="heading-left-side">
          <img className="header-logo" src="/logo.svg" />
          <span>{getContent('header-title')}</span>
        </div>
        <div className="header-right-side">
          <ul className={`header-menu ${menuOpen ? 'open' : ''}`}>
            <li>
              <a href="/">{getContent('header-home')}</a>
            </li>
            <li>
              <a href="/gallery">{getContent('header-gallery')}</a>
            </li>
            <li>
              <a href="/blog">{getContent('header-blog')}</a>
            </li>
          </ul>
          <div className="nav-icon" onClick={toggleMenu}></div>
        </div>
      </div>
    </div>
  );
}

export { Header };
