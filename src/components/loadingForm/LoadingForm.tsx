import './LoadingForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { setIssues, setUrls } from '../taskList/TaskListSlice.slice';

export const LoadingForm: React.FC = () => {
  const [searchUrl, setSearchUrl] = useState('');

  const dispatch = useDispatch();

  const loadingIssues = async () => {
    const [owner, repo] = searchUrl.replace('https://github.com/', '').split('/');
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?state=all`,
    );
    const data = await response.json();
    const key = `${owner + repo}`;
    const urlRepo = searchUrl;
    const urlOwner = `https://github.com/${owner}/`;

    dispatch(setIssues({ data, key }));
    dispatch(setUrls({ urlRepo, urlOwner, owner, repo }));
    setSearchUrl('');
  };

  return (
    <div className="searchBox">
      <div className="LoadingForm">
        <FormControl
          placeholder="Enter repo Url"
          style={{ width: '700px', marginRight: '10px' }}
          value={searchUrl}
          onChange={(event) => setSearchUrl(event.target.value.trim())}
        />
        <Button variant="primary" onClick={() => loadingIssues()}>
          Load Issues
        </Button>
      </div>

      <p> Please, enter example: https://github.com/facebook/react</p>
    </div>
  );
};
