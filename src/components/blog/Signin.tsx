import { ReactElement, useCallback, useEffect, useState } from 'react';
import _get from 'lodash/get';
import { default as config } from '../../config/config.json';
import { SigninProps, TokenResponse } from '../../types/blog.types';

import './Signin.css';
import { makePostRequest } from '../../common/api';
import { LoadingSpinner } from '../lib/LoadingSpinner';
import { useHistory } from 'react-router-dom';

function Signin({ onSuccess, token }: SigninProps): ReactElement {
  const history = useHistory();
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Already logged-in.
    const previousPage = _get(history, 'location.state.from');
    if (token) {
      history.push(previousPage || '/blog');
    }
  }, [token]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { elements }: HTMLFormElement = e.target;
      const req = {
        email: _get(elements, 'email.value', ''),
        password: _get(elements, 'password.value', ''),
      };

      try {
        setMsg('');
        setSubmitting(true);
        const resp = await makePostRequest<TokenResponse>(`${config.serverBaseUrl}/token`, req);
        console.log(resp);
        onSuccess(resp.token, resp.userId, resp.userEmail);
      } catch (e) {
        console.log(e);
        setMsg(_get(e, 'response.message', 'Something went wrong.'));
      }
      setSubmitting(false);
    },
    [onSuccess],
  );

  return (
    <div className="signin-container">
      {msg && <p className="error-message">{msg}</p>}
      {submitting && (
        <div className="cover-spinner">
          <LoadingSpinner />
        </div>
      )}
      <form className="pure-form" onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email address" required spellCheck="false" />
        <input type="password" name="password" placeholder="Password" required />
        <button className="pure-button pure-button-primary" type="submit">
          Signin
        </button>
      </form>
    </div>
  );
}

export { Signin };
