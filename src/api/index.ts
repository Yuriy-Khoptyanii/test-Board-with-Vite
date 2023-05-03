export const loadingIssues = async (searchUrl: string) => {
  const [owner, repo] = searchUrl.replace('https://github.com/', '').split('/');
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
  );
  const data = await response.json();
  const key = `${owner + repo}`;
  const urlRepo = searchUrl;
  const urlOwner = `https://github.com/${owner}/`;

  return { data, key, urlRepo, urlOwner, owner, repo };
};
