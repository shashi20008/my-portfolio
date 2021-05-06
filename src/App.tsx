import { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadContent } from './common/content';
import { LandingPage } from './components/LandingPage';
import { Blog } from './components/blog/Blog';
import { Loading } from './components/Loading';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const PAGE_TO_COMPONENT: {
  [key: string]: (arg: any) => ReactElement;
} = {
  home: LandingPage,
  blog: Blog,
};

function App(): ReactElement {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await loadContent();
      setLoading(false);
    })().catch((e) => console.log(e.stack));
  }, []);

  return (
    <div className="App">
      <Header pageKey="home" />
      <div className="App-Inner">
        {loading ? (
          <Loading />
        ) : (
          <Router>
            <Switch>
              <Route path="/blog">
                <Blog />
              </Route>
              <Route path="/gallery">
                <div></div>
              </Route>
              <Route path="/">
                <LandingPage />
              </Route>
            </Switch>
          </Router>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
