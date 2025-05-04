import { Story } from "../types";
import StoryAvatar from "./StoryAvatar";
import "../styles/StoryList.css";

interface Props {
  stories: Story[];
  onSelect: (index: number) => void;
}

const StoryList = ({ stories, onSelect }: Props) => (
  <div className="story-list">
    {stories.map((story, i) => (
      <StoryAvatar key={`${story.username}-${story.time}`} story={story} onClick={() => onSelect(i)} />
    ))}
  </div>
);

export default StoryList;
