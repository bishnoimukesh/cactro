import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryList from './StoryList';
import { Story } from '../types';

describe('StoryList Component', () => {
  const mockStories: Story[] = [
    {
      username: 'user1',
      time: '2023-01-01T00:00:00Z',
      id: 1,
      image: [],
      avatar: '',
    },
    {
      username: 'user2',
      time: '2023-01-02T00:00:00Z',
      id: 2,
      image: [],
      avatar: '',
    },
  ];
  const mockOnSelect = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the correct number of StoryAvatar components', () => {
    render(<StoryList stories={mockStories} onSelect={mockOnSelect} />);
    const avatars = screen.getAllByRole('button');
    expect(avatars).toHaveLength(mockStories.length);
  });

  test('calls onSelect with the correct index when a StoryAvatar is clicked', () => {
    render(<StoryList stories={mockStories} onSelect={mockOnSelect} />);
    const avatars = screen.getAllByRole('button');
    fireEvent.click(avatars[0]);
    expect(mockOnSelect).toHaveBeenCalledWith(0);
    fireEvent.click(avatars[1]);
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });
});