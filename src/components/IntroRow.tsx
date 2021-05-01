import { ReactElement } from 'react';
import { Avatar } from './lib/Avatar';
import { getContent } from '../common/content';
import { default as config } from '../config/config.json';

import './IntroRow.css';

function IntroRow(): ReactElement {
  return (
    <div className="intro-row pure-g">
      <div className="avatar-container pure-u-1-1 pure-u-md-2-5">
        <Avatar>
          <img className="pure-img" src="/pic.jpg" alt={getContent('landing-dp-alt')} />
        </Avatar>
      </div>
      <div className="pure-u-1-1 pure-u-md-3-5">
        <h1>{getContent('landing-title', config)}</h1>
        <code className="intro-line-1">{getContent('landing-intro-1')}</code>
        <code className="intro-line-2">{getContent('landing-intro-2', config)}</code>
      </div>
    </div>
  );
}

export { IntroRow };
