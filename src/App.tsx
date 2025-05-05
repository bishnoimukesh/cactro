import { useEffect, useState } from "react";
import { Story } from "./types";
import Header from "./components/Header";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import "./App.css";

const App = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/stories.json")
      .then((res) => res.json())
      .then(setStories);
  }, []);

  return (
    <div className="app-container">
      <Header />
      <StoryList stories={stories} onSelect={setViewingIndex} />
      {viewingIndex !== null && (
        <StoryViewer
          stories={stories}
          index={viewingIndex}
          onClose={() => setViewingIndex(null)}
        />
      )}
    </div>
  );
};

export default App;
