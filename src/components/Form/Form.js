import './Form.scss';
import { getCommits } from '../../api';
import { useState } from 'react';

const Form = ({ setCommits }) => {
  const [submitted, setSubmitted] = useState(false);
  const [errorRepo, setErrorRepo] = useState(null);
  const [errorOwner, setErrorOwner] = useState(null);
  const [repo, setRepo] = useState('');
  const [owner, setOwner] = useState('');

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
  return (
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
  );
};
export default Form;
