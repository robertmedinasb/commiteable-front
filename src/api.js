const BASEPATH = 'http://localhost:4000';

export const getCommits = async ({ owner, repo }) => {
  const resp = await fetch(`${BASEPATH}/commits?repo=${repo}&owner=${owner}`);
  const data = await resp.json();
  return data;
};
