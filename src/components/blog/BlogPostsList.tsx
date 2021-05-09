import { ReactElement, useEffect, useState } from 'react';
import { BlogPostEntry } from './BlogPostEntry';
import { makeGetRequest } from '../../common/api';
import { default as config } from '../../config/config.json';
import { BlogPosts } from '../../types/blog.types';

import './BlogPostsList.css';
import { getContent } from '../../common/content';
import { CenteredLoadingSpinner } from '../lib/LoadingSpinner';

function BlogPostsList(): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<BlogPosts>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const posts = await makeGetRequest<BlogPosts>(`${config.serverBaseUrl}/`, '');
        setPosts(posts);
      } catch (e) {
        setError(e.errorCode || 'SERVER_ERROR');
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <div className="pure-g">
      <div className="posts-container pure-u-1-1 pure-u-md-3-4">
        {error && <p className="page-level-error">{getContent(`errors-${error}`)}</p>}
        {posts.length ? (
          <>
            <p>{getContent('posts-list-intro')}</p>
            {posts.map((post) => (
              <BlogPostEntry key={post.id} {...post} />
            ))}
          </>
        ) : null}
      </div>
      <div className="links-container pure-u-1-1 pure-u-md-1-4"></div>
    </div>
  );
}

export { BlogPostsList };
