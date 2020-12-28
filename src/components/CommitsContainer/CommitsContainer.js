import { useState } from 'react';
import moment from 'moment';
import './CommitsContainer.scss';

const CommitsContainer = ({ commits }) => {
  const [commitSelected, setCommitSelected] = useState(null);

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
                    Commiter: {commit.author.name} {`<${commit.author.email}>`}
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
  );
};
export default CommitsContainer;
