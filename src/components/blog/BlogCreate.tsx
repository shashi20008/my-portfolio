import { ReactElement, useCallback } from 'react';
import _get from 'lodash/get';
import { Redirect, useHistory } from 'react-router';
import { makePostRequest } from '../../common/api';
import { default as config } from '../../config/config.json';
import { APICallerProps } from '../../types/blog.types';

import './BlogCreate.css';

function BlogCreate({ token }: APICallerProps): ReactElement {
  const history = useHistory();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { elements }: HTMLFormElement = e.target;
    const data = {
      title: _get(elements, 'title.value'),
      markdown: _get(elements, 'markdown.value'),
      headline: _get(elements, 'headline.value'),
      tags: ['default'],
    };

    try {
      const result = await makePostRequest(`${config.serverBaseUrl}/`, data, token || '');
      history.push('/blog');
    } catch (e) {
      if (e.statusCode === 401) {
        history.replace('signin', { from: 'create' });
      }
      console.log(e);
      console.log('Post creation failed.');
    }
  }, []);

  if (token === null) {
    return (
      <Redirect
        to={{
          pathname: 'signin',
          state: { from: 'create' },
        }}
      />
    );
  }

  return (
    <div className="create-post-page">
      <h2>Curate a new post</h2>
      <form className="pure-form create-post-form" onSubmit={onSubmit}>
        <input className="blogpost-title" type="text" name="title" placeholder="Title of the post" />

        <textarea
          className="blogpost-textarea"
          placeholder="Write your post here, you may use markdown."
          name="markdown"
        ></textarea>
        <input
          type="text"
          className="blogpost-headline"
          name="headline"
          placeholder="Create a one line decription (optional)"
        />
        <button className="pure-button pure-button-primary" type="submit">
          Save and publish
        </button>
      </form>
    </div>
  );
}

export { BlogCreate };
