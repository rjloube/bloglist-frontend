import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  test("form calls event handler it received as props with the right details when a new blog is created", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByLabelText(/title:\s*/i);
    const authorInput = screen.getByLabelText(/author:\s*/i);
    const urlInput = screen.getByLabelText(/url:\s*/i);
    const createButton = screen.getByText("create");

    await user.type(
      titleInput,
      "Component testing is done with react-testing-library"
    );
    await user.type(authorInput, "Test Author");
    await user.type(urlInput, "http://www.example.com");
    await user.click(createButton);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(
      "Component testing is done with react-testing-library"
    );
    expect(createBlog.mock.calls[0][0].author).toBe("Test Author");
    expect(createBlog.mock.calls[0][0].url).toBe("http://www.example.com");
  });
});
