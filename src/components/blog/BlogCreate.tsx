import { ReactElement } from 'react';
import { Redirect } from 'react-router';
import { APICallerProps } from '../../types/blog.types';

import './BlogCreate.css';

function BlogCreate({ token }: APICallerProps): ReactElement {
  if (token === null) {
    return (
      <Redirect
        to={{
          pathname: 'signin',
          state: { from: 'create' },
        }}
      />
    );
  }

  return <div>Blog create page</div>;
}

export { BlogCreate };
