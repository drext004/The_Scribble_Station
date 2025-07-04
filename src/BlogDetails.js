import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from './useFetch';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/api/posts/' + id);
  const history = useHistory();

  const handleClick = () => {
    fetch('http://localhost:8000/api/posts/' + id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          {/* Optional: use content or author if it exists */}
          <p>Written by {blog.author || "Unknown Author"}</p>
          <div>{blog.content}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
