import { ReactElement } from 'react';
import { getContent } from '../../common/content';
import { Highlight } from '../../types/common.types';

function HighlightedItem(props: Highlight): ReactElement {
  return (
    <div className="highlighted-item">
      <h3 className="title clip-text-overflow">{props.title}</h3>
      <hr style={{ margin: '0.5rem 0 1rem' }} />
      <p className="description ">{props.description}</p>
      <div className="cta-container">
        <a href={props.url} className="cta-button pure-button" target="_blank" rel="noreferrer">
          {getContent(`highlight-cta-${(props.type || 'none').toLowerCase()}`)}
        </a>
      </div>
    </div>
  );
}

export { HighlightedItem };
