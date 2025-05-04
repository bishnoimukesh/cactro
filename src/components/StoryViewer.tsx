import { useEffect, useRef, useState } from "react";
import { Story } from "../types";
import "../styles/StoryViewer.css";

interface Props {
  stories: Story[];
  index: number;
  onClose: () => void;
}

const StoryViewer = ({ stories, index, onClose }: Props) => {
  const [storyIndex, setStoryIndex] = useState(index);
  const [imageIndex, setImageIndex] = useState(0);
  const [progress, setProgress] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [imageError, setImageError] = useState(false);

  const selectedStory = stories[storyIndex];

  const userStories = [];
  for (let i = storyIndex; i < stories.length; i++) {
    if (
      stories[i].username === selectedStory.username
    ) {
      userStories.push(stories[i]);
    } else {
      break;
    }
  }

  const images = userStories.flatMap((story) =>
    Array.isArray(story.image) ? story.image : [story.image]
  );

  useEffect(() => {
    setImageIndex(0);
    setProgress(new Array(images.length).fill(0));
  }, [storyIndex]);

  useEffect(() => {
    setImageError(false);
    const interval = 100;
    const duration = 5000;
    let elapsed = 0;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      elapsed += interval;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[imageIndex] = percent;
        return newProgress;
      });

      if (percent >= 100) {
        clearInterval(timerRef.current!);
        goToNext();
      }
    }, interval);

    return () => clearInterval(timerRef.current!);
  }, [imageIndex]);

  const goToNext = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      let nextUserIndex = storyIndex + 1;
      while (nextUserIndex < stories.length && stories[nextUserIndex].username === selectedStory.username) {
        nextUserIndex++;
      }
      if (nextUserIndex < stories.length) {
        setStoryIndex(nextUserIndex);
        setImageIndex(0);
      } else {
        onClose();
      }
    }
  };

  const goToPrev = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const x = e.nativeEvent.offsetX;
    const width = (e.target as HTMLElement).clientWidth;
    if (x < width / 2) {
      goToPrev();
    } else {
      goToNext();
    }
  };

  return (
    <div className="story-viewer" onClick={handleClick}>
      {/* Progress Bar */}
      <div className="story-progress-bar">
        {progress.map((percent, idx) => (
          <div key={idx} className="progress-container">
            <div
              className="progress-filled"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        ))}
      </div>

      {/* Top Info */}
      <div className="story-viewer-top">
        <img
          src={selectedStory.avatar}
          alt="avatar"
          className="story-viewer-avatar"
        />
        <span className="story-viewer-username">{selectedStory.username}</span>
        <span className="story-viewer-time">{selectedStory.time}</span>
        <button
          className="story-viewer-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ✕
        </button>
      </div>

      {/* Image */}
      {images[imageIndex] && !imageError ? (
        <img
          src={images[imageIndex]}
          alt="story"
          className="story-viewer-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="story-viewer-placeholder" />
      )}
    </div>
  );
};

export default StoryViewer;