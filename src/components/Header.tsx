import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getContent } from '../common/content';

import './Header.css';

function Header(): ReactElement {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [pageKey, setPageKey] = useState<string>('');

  useEffect(() => {
    const listener = () => setPageKey((history.location.pathname || '').split('/').filter(Boolean).shift() || '');
    listener();
    return history.listen(listener);
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen((old) => !old), []);

  return (
    <div className="header">
      <div className="App-Inner header-centered">
        <div className="heading-left-side">
          <img className="header-logo" src="/logo.svg" />
          <span>{getContent(`header-title-${pageKey || 'home'}`)}</span>
        </div>
        <div className="header-right-side">
          <ul className={`header-menu ${menuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/">{getContent('header-home')}</Link>
            </li>
            <li>
              <Link to="/gallery">{getContent('header-gallery')}</Link>
            </li>
            <li>
              <Link to="/blog">{getContent('header-blog')}</Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={toggleMenu}></div>
        </div>
      </div>
    </div>
  );
}

export { Header };
