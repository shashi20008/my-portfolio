import { ReactElement, useEffect, useState } from 'react';
import { loadContent } from './common/content';
import { LandingPage } from './components/LandingPage';
import { Loading } from './components/Loading';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

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
      <Header />
      <div className="App-Inner">{!loading ? <LandingPage /> : <Loading />}</div>
      <Footer />
    </div>
  );
}

export default App;
