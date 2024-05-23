import { useState } from "react";
import Notification from "./Notification";

const BlogForm = ({
  createBlog,
  message,
  messageType,
}) => {
  const [title, setNewTitle] = useState("");
  const [author, setNewAuthor] = useState("");
  const [url, setNewUrl] = useState("");

  const addBlog = (event) => {
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

  }
  return (
    <div>
      <Notification message={message} messageType={messageType} />
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

export default BlogForm;
