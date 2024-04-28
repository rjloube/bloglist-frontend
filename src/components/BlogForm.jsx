import Blog from "./Blog";
import Notification from "./Notification";
import blogService from "../services/blogs";

const BlogForm = ({
  user,
  setUser,
  blogs,
  setBlogs,
  title,
  setNewTitle,
  author,
  setNewAuthor,
  url,
  setNewUrl,
  message,
  setMessage,
  messageType,
  setMessageType,
}) => {
  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setMessageType("info");
      setTimeout(() => {
        setMessage(null);
        setMessageType("");
      }, 5000);
    } catch (exception) {
      console.error(exception);
      setMessage("All fields are required");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType("");
      }, 5000);
    }


  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} messageType={messageType} />
      <p>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </p>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogForm;