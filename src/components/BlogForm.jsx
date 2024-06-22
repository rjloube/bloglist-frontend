import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({
  createBlog,
  visible,
  setVisible,
}) => {
  const [title, setNewTitle] = useState("");
  const [author, setNewAuthor] = useState("");
  const [url, setNewUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    createBlog(newBlog);
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setVisible(!visible);
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            value={title}
            name="title"
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            name="author"
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={url}
            name="url"
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default BlogForm;
