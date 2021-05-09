import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import MarkDownIt from 'markdown-it';
import { makeGetRequest } from '../../common/api';
import { default as config } from '../../config/config.json';
import { BlogPost } from '../../types/blog.types';
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

  const postBody = useMemo(() => {
    if (!post || !post.body) {
      return;
    }
    return MarkDownIt().render(post.body);
  }, [post]);

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
      <h1 className="blog-post-title">{post?.title}</h1>
      <div
        className="blog-post-body"
        dangerouslySetInnerHTML={{
          __html: postBody || '',
        }}
      />
      <hr className="blog-post-hr" />
      <div className="blog-entry-tags">
        <span className="blog-post-tag-label">Tags:</span>
        {post?.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className="blog-post-credits">A post by - {post?.userId}</p>
    </div>
  );
}

export { BlogPostPage };
