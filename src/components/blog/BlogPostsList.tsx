import { ReactElement, useEffect, useState } from 'react';
import { BlogPostEntry } from './BlogPostEntry';
import { makeGetRequest } from '../../common/api';
import { default as config } from '../../config/config.json';
import { BlogPosts } from '../../types/blog.types';

import './BlogPostsList.css';

function BlogPostsList(): ReactElement {
  const [posts, setPosts] = useState<BlogPosts>([]);

  useEffect(() => {
    (async () => {
      const posts = await makeGetRequest<BlogPosts>(`${config.serverBaseUrl}/`, '');
      setPosts(posts);
    })();
  }, []);

  return (
    <div className="pure-g">
      <div className="posts-container pure-u-1-1 pure-u-md-3-4">
        <p>
          Welcome to my blog. Here you&apos;ll find my two cents on tech, projects, and life, recorded as I navigate
          through it.
        </p>
        {posts.map((post) => (
          <BlogPostEntry key={post.id} {...post} />
        ))}
      </div>
      <div className="links-container pure-u-1-1 pure-u-md-1-4"></div>
    </div>
  );
}

export { BlogPostsList };
