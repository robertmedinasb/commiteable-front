import { useEffect, useState } from 'react';
import './App.scss';
import logoImg from './commiteable.png';

function App() {
  const [repo, setRepo] = useState('');
  const [owner, setOwner] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorRepo, setErrorRepo] = useState(null);
  const [errorOwner, setErrorOwner] = useState(null);
  const [branches, setBranches] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateOwner();
    validateRepo();
    if (!errorOwner & !errorRepo) {
      setSubmitted(true);
      alert(JSON.stringify({ repo, owner }));
    }
  };

  const handleBlur = (e) => {
    console.log(e);
    if (e.target.name === 'owner') validateOwner();
    if (e.target.name === 'repo') validateRepo();
  };

  const validateOwner = () => {
    if (!/\w{3,}/.test(owner)) {
      return setErrorOwner('Must be valid and have at least 3 chars');
    }
    return setErrorOwner(null);
  };

  const validateRepo = () => {
    if (!/\w{3,}/.test(owner)) {
      return setErrorRepo('Must be valid and have at least 3 chars');
    }
    return setErrorRepo(null);
  };

  return (
    <div className='App'>
      <header className='header'>
        <section className='header-section'>
          <span>By robertmedinasb</span>
        </section>
        <section className='header-section'>
          <h1>Make it easy, make it commiteable...</h1>
        </section>
        <div className='header-logo'>
          <img className='logo-image' alt='Commiteable' src={logoImg} />
        </div>
      </header>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='field'>
          <label>Repository's name:</label>
          <input
            type='text'
            name='repo'
            placeholder='The same name on github'
            onBlur={(e) => handleBlur(e)}
            defaultValue={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
          <span className='error-message'>{errorRepo}</span>
        </div>
        <div className='field'>
          <label>Owner nickname:</label>
          <input
            type='text'
            name='owner'
            placeholder='The same name on github'
            onBlur={(e) => handleBlur(e)}
            defaultValue={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <span className='error-message'>{errorOwner}</span>
        </div>
        <button className='submit-button' type='submit' disabled={submitted}>
          Search
        </button>
      </form>
      <div className='branch-field'>
        <label>Branch:</label>
        <select>
          <option>Master</option>
        </select>
      </div>
      <div className='graph-container'>
        <div className='container-header'>
          <div className='header-item'>Graph</div>
          <div className='header-item'>Description</div>
          <div className='header-item'>Date</div>
          <div className='header-item'>Author</div>
          <div className='header-item'>Commit</div>
        </div>
        <div className='commit-row'>
          <div className='row'>
            <div className='circle'>
              <div className='check'></div>
            </div>
            <div className='commit-row-item description'>
              Initialize project using Create React App
            </div>
            <div className='commit-row-item'>27 Dec 2020 19:54</div>
            <div className='commit-row-item'>Robert Medina</div>
            <div className='commit-row-item'>fff21d41</div>
          </div>
        </div>
        <div className='commit-row active-commit'>
          <div className='row'>
            <div className='circle'>
              <div className='check'></div>
            </div>
            <div className='commit-row-item description'>
              Initialize project using Create React App
            </div>
            <div className='commit-row-item'>27 Dec 2020 19:54</div>
            <div className='commit-row-item'>Robert Medina</div>
            <div className='commit-row-item'>fff21d41</div>
          </div>

          <div className='commit-details'>
            <div className='details'>
              <span>Commit: fff21d418e0ce50dbfe23cad653ee6084b94cdee</span>
              <span>Parents: None</span>
              <span>{'Commiter: Robert Medina <robert@fitco.com.pe>'}</span>
              <span>
                {'Date: Sun Dec 27 2020 12:03:57 GMT-0500 (Peru Standard Time)'}
              </span>
            </div>
            <div className='title'>
              <span>Initialize project using Create React App</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
