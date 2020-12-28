import { useState } from 'react';
import './App.scss';
import logoImg from './commiteable.png';
import { getCommits } from './api';
import moment from 'moment';

function App() {
  const [repo, setRepo] = useState('');
  const [owner, setOwner] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorRepo, setErrorRepo] = useState(null);
  const [errorOwner, setErrorOwner] = useState(null);
  const [commits, setCommits] = useState(null);
  const [commitSelected, setCommitSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateOwner();
    validateRepo();
    setSubmitted(true);
    if (!errorOwner & !errorRepo) {
      try {
        const { commits } = await getCommits({ owner, repo });
        setSubmitted(false);
        setCommits(commits);
        if (!commits) setErrorRepo('Something went wrong, please try again :(');
      } catch (error) {
        setErrorRepo('Something went wrong, please try again :(');
      }
    }
  };

  const handleBlur = (e) => {
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
    if (!/\w{3,}/.test(repo)) {
      return setErrorRepo('Must be valid and have at least 3 chars');
    }
    return setErrorRepo(null);
  };

  const getFirstEight = (sha) => {
    return sha.substr(0, 8);
  };

  const getParents = (parents) => {
    const newArr = parents.map(({ sha }) => {
      return getFirstEight(sha);
    });
    if (newArr.length > 0) return newArr.join(', ');
    return 'None';
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
      <div className='graph-container'>
        <div className='container-header'>
          <div className='header-item'>Graph</div>
          <div className='header-item'>Description</div>
          <div className='header-item'>Date</div>
          <div className='header-item'>Author</div>
          <div className='header-item'>Commit</div>
        </div>
        {commits &&
          commits.map(({ commit, sha, html_url, parents }, index) => (
            <div
              className={`commit-row row-${index} ${
                commitSelected === commit && 'active-commit'
              }`}
              key={index}
              onClick={() => setCommitSelected(commit)}
            >
              <div className='row'>
                <div className='circle'>
                  <div className='check'></div>
                </div>
                <div
                  className='commit-row-item description'
                  title={commit.message}
                >
                  {commit.message}
                </div>
                <div className='commit-row-item'>
                  {moment(commit.author.date).format('lll')}
                </div>
                <div className='commit-row-item'>{commit.author.name}</div>
                <div className='commit-row-item'>{getFirstEight(sha)}</div>
              </div>
              {commitSelected === commit && (
                <div className='commit-details'>
                  <div className='details'>
                    <span>Commit: {sha}</span>
                    <span>Parents: {getParents(parents)}</span>
                    <span>
                      Commiter: {commit.author.name}{' '}
                      {`<${commit.author.email}>`}
                    </span>
                    <span>
                      Date:{' '}
                      {moment(commit.author.date).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </span>
                    <span>
                      Github URL: <a href={html_url}> {html_url}</a>
                    </span>
                  </div>
                  <div className='title'>
                    <span>{commit.message}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
