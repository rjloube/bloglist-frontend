import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log("user", user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginInfo) => {
    try {
      const user = await loginService.login(loginInfo);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      console.error(exception);
      setMessage("Wrong username or password");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType("");
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const createBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog);
      console.log("returnedBlog", returnedBlog);
      setBlogs(blogs.concat(returnedBlog));
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

  const updateBlog = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      console.log("updatedBlog", returnedBlog);
      setBlogs(
        blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog))
      );
    } catch (exception) {
      console.error(exception);
    }
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (exception) {
        console.error(exception);
      }
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? (
        <Togglable
          buttonLabel="login"
          visible={visible}
          setVisible={setVisible}
        >
          <LoginForm
            handleLogin={handleLogin}
            message={message}
            messageType={messageType}
            visible={visible}
            setVisible={setVisible}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </p>
          <Notification message={message} messageType={messageType} />
          <Togglable
            buttonLabel="new blog"
            visible={visible}
            setVisible={setVisible}
          >
            <BlogForm
              createBlog={createBlog}
              message={message}
              messageType={messageType}
              visible={visible}
              setVisible={setVisible}
            />
          </Togglable>
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={() => updateBlog(blog)}
                  deleteBlog={() => deleteBlog(blog)}
                  currentUser={user}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
