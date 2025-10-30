import { useMemo, useState } from "react";
import TopNav from "./components/TopNav";
import StreakBar from "./components/StreakBar";
import Composer from "./components/Composer";
import Feed from "./components/Feed";

function App() {
  const [streak, setStreak] = useState(3);
  const [xp, setXp] = useState(40);
  const [lastLearnedDay, setLastLearnedDay] = useState("");

  const [items, setItems] = useState(() => seedItems());

  const addictiveHint = useMemo(() => {
    const learned = items.filter((i) => i.learned).length;
    const total = items.length;
    if (learned === 0) return "Tip: Mark posts as learned to earn XP and grow your streak.";
    if (learned < total / 2) return "Nice start! Keep going to hit your daily goal.";
    return "You're on fire! Share a tip to help others learn.";
  }, [items]);

  function handlePost(newPost) {
    setItems((prev) => [
      {
        ...newPost,
        liked: false,
      },
      ...prev,
    ]);
  }

  function handleToggleLike(id) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              liked: !it.liked,
              likes: it.liked ? Math.max(0, it.likes - 1) : it.likes + 1,
            }
          : it
      )
    );
  }

  function handleToggleBookmark(id) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, bookmarked: !it.bookmarked } : it)));
  }

  function handleMarkLearned(id) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, learned: true } : it)));
    setXp((x) => x + 10);
    const today = new Date().toISOString().slice(0, 10);
    if (today !== lastLearnedDay) {
      setStreak((s) => s + 1);
      setLastLearnedDay(today);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <TopNav />
      <StreakBar streak={streak} xp={xp} />
      <main className="mx-auto max-w-sm">
        <Composer onPost={handlePost} />
        <div className="px-4 py-2 text-[13px] text-neutral-500">{addictiveHint}</div>
        <Feed
          items={items}
          onToggleLike={handleToggleLike}
          onToggleBookmark={handleToggleBookmark}
          onMarkLearned={handleMarkLearned}
        />
        <div className="h-16" />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-neutral-200">
        <div className="mx-auto max-w-sm px-4 py-2 text-center text-xs text-neutral-500">
          Built for focused, mobile-first learning. Swipe, save, and keep your streak alive.
        </div>
      </footer>
    </div>
  );
}

function seedItems() {
  const now = Date.now();
  return [
    {
      id: crypto.randomUUID(),
      author: "Ada Lovelace",
      handle: "@ada",
      body: "A tight feedback loop makes learning addictive. Study → Quiz → Reflection. Keep cycles short and frequent.",
      tag: "general",
      likes: 32,
      liked: false,
      comments: 5,
      bookmarked: false,
      learned: false,
      timestamp: new Date(now - 1000 * 60 * 12).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      author: "Dan Abramov",
      handle: "@dan_abramov",
      body: "React tip: derive as little state as possible. If you can compute it from props/state, you don't need another state.",
      tag: "react",
      likes: 54,
      liked: false,
      comments: 8,
      bookmarked: true,
      learned: false,
      timestamp: new Date(now - 1000 * 60 * 55).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      author: "Guido van Rossum",
      handle: "@gvanrossum",
      body: "Pythonic code favors readability. Choose clear names and straight-line logic over clever tricks.",
      tag: "python",
      likes: 21,
      liked: false,
      comments: 2,
      bookmarked: false,
      learned: true,
      timestamp: new Date(now - 1000 * 60 * 120).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      author: "Andrej Karpathy",
      handle: "@karpathy",
      body: "Study technique: explain a concept in your own words as if teaching a friend. If you can't, you haven't learned it yet.",
      tag: "ai",
      likes: 91,
      liked: false,
      comments: 14,
      bookmarked: false,
      learned: false,
      timestamp: new Date(now - 1000 * 60 * 240).toISOString(),
    },
  ];
}

export default App;
