import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Signin } from './Signin';
import { BlogCreate } from './BlogCreate';
import { BlogPostPage } from './BlogPostPage';
import { BlogPostsList } from './BlogPostsList';
const mSecsInDay = 24 * 60 * 60 * 1000;

function Blog(): ReactElement {
  const match = useRouteMatch();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const store = window.localStorage;
    const tokenTime = parseInt(store.getItem('tokenTime') || '0');

    if (Date.now() - tokenTime < mSecsInDay) {
      setToken(store.getItem('token'));
      setUserId(store.getItem('userId'));
      setUserEmail(store.getItem('userEmail'));
    }
  }, []);

  const onLoginSuccess = useCallback((token, userId, email) => {
    const store = window.localStorage;
    store.setItem('token', token);
    store.setItem('userId', userId);
    store.setItem('userEmail', email);
    store.setItem('tokenTime', '' + (Date.now() - 10000));
    setToken(token);
    setUserId(userId);
    setUserEmail(email);
  }, []);

  const logout = useCallback(() => {
    const store = window.localStorage;
    setToken(null);
    setUserId(null);
    setUserEmail(null);
    store.removeItem('token');
    store.removeItem('userId');
    store.removeItem('userEmail');
  }, []);

  return (
    <Switch>
      <Route path={`${match.path}/signin`}>
        <Signin onSuccess={onLoginSuccess} token={token} logout={logout} />
      </Route>
      <Route path={`${match.path}/create`}>
        <BlogCreate token={token} logout={logout} />
      </Route>
      <Route path={`${match.path}/:postId`}>
        <BlogPostPage />
      </Route>
      <Route path={match.path}>
        <BlogPostsList />
      </Route>
    </Switch>
  );
}

export { Blog };
