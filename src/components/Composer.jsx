import { useState } from "react";
import { PlusCircle, Hash } from "lucide-react";

export default function Composer({ onPost }) {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("general");
  const max = 240;
  const remaining = max - text.length;

  const canPost = text.trim().length >= 5;

  function submit(e) {
    e.preventDefault();
    if (!canPost) return;
    onPost?.({
      id: crypto.randomUUID(),
      author: "You",
      handle: "@you",
      body: text.trim(),
      tag,
      likes: 0,
      comments: 0,
      bookmarked: false,
      learned: false,
      timestamp: new Date().toISOString(),
    });
    setText("");
  }

  return (
    <form onSubmit={submit} className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-sm px-4 py-3">
        <div className="flex gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, max))}
              placeholder="Share a quick insight or question..."
              className="w-full resize-none outline-none placeholder:text-neutral-400 text-sm min-h-[56px]"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-600">
                <Hash size={16} />
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="bg-neutral-100 rounded px-2 py-1 text-xs"
                >
                  <option value="general">general</option>
                  <option value="js">javascript</option>
                  <option value="react">react</option>
                  <option value="python">python</option>
                  <option value="ai">ai</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs ${remaining < 20 ? "text-orange-600" : "text-neutral-400"}`}>
                  {remaining}
                </span>
                <button
                  type="submit"
                  disabled={!canPost}
                  className={`inline-flex items-center gap-1 text-sm font-medium rounded-full px-3 py-1.5 shadow-sm ${
                    canPost
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                  }`}
                >
                  <PlusCircle size={18} /> Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
