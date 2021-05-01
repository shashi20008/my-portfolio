import { ReactElement } from 'react';
import { default as config } from '../config/config.json';

import './SocialRow.css';

function SocialRow(): ReactElement {
  const links = config.links;
  return (
    <div className="social-row pure-g">
      <div className="social-buttons pure-u-1-1">
        {Object.entries(links).map(([site, url]) => (
          <div key={site} className="social-button">
            <a className="social-link" href={url} target="_blank" rel="noreferrer">
              <img className="social-icon pure-img" src={`/logos/${site}-logo.png`} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export { SocialRow };
