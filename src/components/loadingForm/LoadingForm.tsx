import './LoadingForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { loadingIssues } from '../../api/Index';
import { setIssues, setUrls } from '../taskList/TaskListSlice.slice';

export const LoadingForm: React.FC = () => {
  const [searchUrl, setSearchUrl] = useState('');

  const dispatch = useDispatch();

  const handleLoad = async () => {
    const { data, key, urlRepo, urlOwner, owner, repo } = await loadingIssues(searchUrl);

    dispatch(setIssues({ data, key }));
    dispatch(setUrls({ urlRepo, urlOwner, owner, repo }));
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
        <Button
          disabled={searchUrl.length === 0}
          variant="primary"
          onClick={() => handleLoad()}
        >
          Load Issues
        </Button>
      </div>

      {searchUrl.length === 0 && (
        <p> Please, enter example: https://github.com/facebook/react</p>
      )}
    </div>
  );
};
