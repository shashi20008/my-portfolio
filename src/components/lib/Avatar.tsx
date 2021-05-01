import { PropsWithChildren, ReactElement, ReactNode } from 'react';

import './Avatar.css';

function Avatar({ children }: PropsWithChildren<ReactNode>): ReactElement {
  return <div className="avatar-wrapper">{children}</div>;
}

export { Avatar };
