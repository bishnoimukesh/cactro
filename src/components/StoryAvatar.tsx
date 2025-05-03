import { Story } from "../types";
import "../styles/StoryAvatar.css";

interface Props {
  story: Story;
  onClick: () => void;
}

const StoryAvatar = ({ story, onClick }: Props) => (
  <div className="story-avatar-container" onClick={onClick}>
    <div className="story-avatar-border">
      <img
        className="story-avatar-img"
        src={story.avatar}
        alt={story.username}
      />
    </div>
    <div className="story-avatar-username">{story.username}</div>
  </div>
);

export default StoryAvatar;
