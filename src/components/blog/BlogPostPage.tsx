import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import MarkDownIt from 'markdown-it';
import hljs from 'highlight.js';
import { makeGetRequest } from '../../common/api';
import { default as config } from '../../config/config.json';
import { BlogPost } from '../../types/blog.types';
import { CenteredLoadingSpinner } from '../lib/LoadingSpinner';
import { getContent } from '../../common/content';

import './BlogPostPage.css';
import 'highlight.js/styles/a11y-dark.css';

function BlogPostPage(): ReactElement {
  const { postId } = useParams<{ postId: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setPost(await makeGetRequest<BlogPost>(`${config.serverBaseUrl}/${postId}`, ''));
      } catch (e) {
        setError(e.errorCode || 'SERVER_ERROR');
      }
      setLoading(false);
    })();
  }, []);

  const postBody = useMemo(() => {
    if (!post || !post.body) {
      return;
    }
    return MarkDownIt({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (_) {}
        }
        return '';
      },
    }).render(post.body);
  }, [post]);

  if (loading) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <div className="blog-post-page">
      {error && <p className="page-level-error">{getContent(`errors-${error}`)}</p>}
      {post && (
        <>
          <h1 className="blog-post-title">{post?.title}</h1>
          <div
            className="blog-post-body"
            dangerouslySetInnerHTML={{
              __html: postBody || '',
            }}
          />
          <hr className="blog-post-hr" />
          <div className="blog-entry-tags">
            <span className="blog-post-tag-label">{getContent('post-tags-label')}</span>
            {post?.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="blog-post-credits">{getContent('post-author-label') + post?.userId}</p>
        </>
      )}
    </div>
  );
}

export { BlogPostPage };
