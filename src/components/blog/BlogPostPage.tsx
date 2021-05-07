import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeGetRequest } from '../../common/api';
import { default as config } from '../../config/config.json';
import { APICallerProps, BlogPost } from '../../types/blog.types';
import { LoadingSpinner } from '../lib/LoadingSpinner';

import './BlogPostPage.css';

function BlogPostPage(): ReactElement {
  const { postId } = useParams<{ postId: string }>();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setPost(await makeGetRequest<BlogPost>(`${config.serverBaseUrl}/${postId}`, ''));
      } catch (e) {
        console.log(e);
        // render error page somehow.
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <h2 className="blog-post-title">{post?.title}</h2>
      <p className="blog-post-body">{post?.body}</p>
      <hr className="blog-post-hr" />
      <div className="blog-entry-tags">
        <span className="blog-post-tag-label">Tags:</span>
        {post?.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className="blog-post-credits">A post by - {post?.user}</p>
    </div>
  );
}

export { BlogPostPage };
