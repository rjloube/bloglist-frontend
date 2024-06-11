import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={blogStyle}>
      {showDetails ? (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowDetails(false)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={updateBlog}>like</button>
          <br />
          {blog.user.name}
          {currentUser.username === blog.user.username && (
            <button onClick={deleteBlog}>remove</button>
          )}
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowDetails(true)}>view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
