import { ReactElement, useCallback } from 'react';
import { useHistory } from 'react-router';
import { BlogPost } from '../../types/blog.types';

import './BlogPostEntry.css';

function BlogPostEntry(props: BlogPost): ReactElement {
  const history = useHistory();
  const openPost = useCallback(() => {
    history.push(`/blog/${props.id}`);
  }, [props.id]);
  return (
    <div className="blog-entry">
      <h4 className="blog-entry-title" onClick={openPost}>
        {props.title}
      </h4>
      <p className="blog-entry-body">{props.body}</p>
      <div className="blog-entry-tags">
        {props.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export { BlogPostEntry };
