import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const mockHandler = vi.fn();

  beforeEach(() => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "Test Author",
      url: "http://www.example.com",
      likes: 100,
      user: {
        username: "test-user-id",
        name: "Test User Name",
        id: "660177d1a3ecdcdb027ecf3b",
      },
    };

    const currentUser = {
      username: "test-user-id",
      name: "Test User Name",
      id: "660177d1a3ecdcdb027ecf3b",
    };

    container = render(
      <Blog blog={blog} currentUser={currentUser} updateBlog={mockHandler} />
    ).container;
  });

  test("checks that blog renders title and author, but does not render URL or number of likes by default", async () => {
    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );

    expect(div).toHaveTextContent("Test Author");

    expect(div).not.toHaveTextContent("http://www.example.com");

    expect(div).not.toHaveTextContent("likes");
  });

  test("checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const div = container.querySelector(".blog");
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    screen.debug();
    expect(div).toHaveTextContent("http://www.example.com");
    expect(div).toHaveTextContent("likes");
  });

  test("checks that if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
