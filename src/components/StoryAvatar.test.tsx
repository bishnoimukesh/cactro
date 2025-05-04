import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import StoryAvatar from "./StoryAvatar";
import { Story } from "../types";

describe("StoryAvatar Component", () => {
  const mockStory: Story = {
      avatar: "https://example.com/avatar.jpg",
      username: "testuser",
      id: 0,
      image: [],
      time: ""
  };

  const mockOnClick = jest.fn();

  it("renders the StoryAvatar component correctly", () => {
    render(<StoryAvatar story={mockStory} onClick={mockOnClick} />);

    // Check if the avatar image is rendered
    const avatarImg = screen.getByAltText(mockStory.username);
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute("src", mockStory.avatar);

    // Check if the username is rendered
    const username = screen.getByText(mockStory.username);
    expect(username).toBeInTheDocument();
  });

  it("calls onClick when the container is clicked", () => {
    render(<StoryAvatar story={mockStory} onClick={mockOnClick} />);

    const container = screen.getByTestId("story-avatar-container");

    fireEvent.click(container);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});