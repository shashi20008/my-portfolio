import { ReactElement } from 'react';
import { Greeting } from './Greeting';
import { IntroRow } from './IntroRow';
import { SocialRow } from './SocialRow';
import { Highlights } from './highlights';

import './LandingPage.css';

function LandingPage(): ReactElement {
  return (
    <div className="landing-page">
      <Greeting />
      <IntroRow />
      <SocialRow />
      <Highlights />
    </div>
  );
}

export { LandingPage };
