import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Bloglist = ({blogs, title, handleDelete}) => {
  
  return ( 
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog._id} >
          <Link to={`/blogs/${blog._id}`}>
            <h2>{ blog.title }</h2>
            <p>Written by { blog.author }</p>
          </Link>
          
    </div>
      ))}
    </div>
   );
}
 
export default Bloglist;