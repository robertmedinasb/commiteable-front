import { useState } from 'react';
import './App.scss';
import Form from './components/Form/Form';
import CommitsContainer from './components/CommitsContainer/CommitsContainer';
import Header from './components/Header/Header';

function App() {
  const [commits, setCommits] = useState(null);

  return (
    <div className='App'>
      <Header />
      <Form setCommits={setCommits} />
      <CommitsContainer commits={commits} />
    </div>
  );
}

export default App;
