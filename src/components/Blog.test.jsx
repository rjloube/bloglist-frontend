import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  // let container;

  // beforeEach(() => {
  //   const blog = {
  //     title: "Component testing is done with react-testing-library",
  //     author: "Test Author",
  //     url: "http://www.example.com",
  //   };

  //   container = render(<Blog blog={blog} />).container;
  // });

  test("checks that blog renders title and author, but does not render URL or number of likes by default", async () => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "Test Author",
      url: "http://www.example.com",
      likes: 100,
    };

    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );

    expect(div).toHaveTextContent("Test Author");

    expect(div).not.toHaveTextContent("http://www.example.com");

    expect(div).not.toHaveTextContent("likes");
  });
});
