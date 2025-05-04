import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryViewer from "./StoryViewer";

describe("StoryViewer Component", () => {
  const mockStories = [
    {
      id: 1,
      username: "user1",
      avatar: "avatar1.png",
      time: "2h",
      image: ["image1.png"],
    },
    {
      id: 2,
      username: "user1",
      avatar: "avatar1.png",
      time: "2h",
      image: ["image2.png"],
    },
    {
      id: 3,
      username: "user2",
      avatar: "avatar2.png",
      time: "1h",
      image: ["image3.png"],
    },
  ];

  const mockOnClose = jest.fn();

  test("renders the image when no error occurs", () => {
    render(
      <StoryViewer stories={mockStories} index={0} onClose={mockOnClose} />
    );
    const image = screen.getByRole("img", { name: /story/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("story-viewer-image");
  });

  test("calls onClose when all stories are viewed", () => {
    render(
      <StoryViewer stories={mockStories} index={2} onClose={mockOnClose} />
    );
    const image = screen.getByRole("img", { name: /story/i });
    fireEvent.click(image);
    fireEvent.click(image); // Need two clicks to exit last story
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("navigates to the next image on click", () => {
    render(
      <StoryViewer stories={mockStories} index={0} onClose={mockOnClose} />
    );
    const image = screen.getByRole("img", { name: /story/i });
    fireEvent.click(image); // Simulate clicking to move to the next image
    expect(screen.getByRole("img", { name: /story/i })).toHaveAttribute(
      "src",
      "image2.png"
    );
  });

  test("renders the correct user information", () => {
    render(
      <StoryViewer stories={mockStories} index={0} onClose={mockOnClose} />
    );
    const username = screen.getByText("user1");
    const avatar = screen.getByRole("img", { name: /avatar/i });
    expect(username).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "avatar1.png");
  });
});
