import { useMemo } from "react";
import { Heart, Bookmark, MessageCircle, CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Feed({ items, onToggleLike, onToggleBookmark, onMarkLearned }) {
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [items]);

  return (
    <ul className="divide-y divide-neutral-200">
      {sorted.map((item) => (
        <li key={item.id} className="bg-white">
          <article className="mx-auto max-w-sm px-4 py-3">
            <div className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-neutral-200" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold truncate">{item.author}</span>
                  <span className="text-neutral-500 truncate">{item.handle}</span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-500 text-xs">{formatTime(item.timestamp)}</span>
                  <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">#{item.tag}</span>
                </div>
                <p className="mt-1 text-[15px] leading-relaxed whitespace-pre-wrap">
                  {item.body}
                </p>
                <div className="mt-2 flex items-center gap-3 text-neutral-600">
                  <button
                    onClick={() => onToggleLike(item.id)}
                    className={`inline-flex items-center gap-1.5 text-sm ${item.liked ? "text-rose-600" : "hover:text-rose-600"}`}
                  >
                    <motion.span
                      initial={false}
                      animate={{ scale: item.liked ? 1.2 : 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 12 }}
                      className="inline-flex"
                    >
                      <Heart size={18} fill={item.liked ? "currentColor" : "none"} />
                    </motion.span>
                    <span>{item.likes}</span>
                  </button>

                  <button className="inline-flex items-center gap-1.5 text-sm hover:text-blue-600">
                    <MessageCircle size={18} />
                    <span>{item.comments}</span>
                  </button>

                  <button
                    onClick={() => onToggleBookmark(item.id)}
                    className={`inline-flex items-center gap-1.5 text-sm ml-auto ${
                      item.bookmarked ? "text-amber-600" : "hover:text-amber-600"
                    }`}
                  >
                    <Bookmark
                      size={18}
                      fill={item.bookmarked ? "currentColor" : "none"}
                    />
                    <span>{item.bookmarked ? "Saved" : "Save"}</span>
                  </button>
                </div>

                {!item.learned && (
                  <button
                    onClick={() => onMarkLearned(item.id)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium bg-emerald-600 text-white px-3 py-1.5 rounded-full hover:bg-emerald-700"
                  >
                    <CheckCircle size={18} /> Mark as learned
                  </button>
                )}

                {item.learned && (
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                    <Star size={16} className="text-emerald-700" />
                    Earned 10 XP
                  </div>
                )}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

function formatTime(ts) {
  const diff = (Date.now() - new Date(ts).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}
