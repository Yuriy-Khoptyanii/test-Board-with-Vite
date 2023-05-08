import './LoadingForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { memo, useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { loadingIssues } from '../../api/index';
import { setIssues, setUrls } from '../taskList/TaskListSlice.slice';

export const LoadingForm: React.FC = memo(() => {
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
          data-testid="button"
        >
          Load Issues
        </Button>
      </div>

      {searchUrl.length === 0 && (
        <p> Please, enter example: https://github.com/facebook/react</p>
      )}
    </div>
  );
});

LoadingForm.displayName = 'LoadingForm';
