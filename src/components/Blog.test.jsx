import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog post", () => {
  render(<Blog />);
  expect(screen.getByText(/blog post/i)).toBeInTheDocument();
});
