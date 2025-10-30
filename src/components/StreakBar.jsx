import { Flame, Trophy } from "lucide-react";

export default function StreakBar({ streak, xp, goal = 100 }) {
  const pct = Math.min(100, Math.round((xp / goal) * 100));
  const progressColor = pct >= 100 ? "bg-emerald-500" : "bg-blue-500";

  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="text-orange-500" size={20} />
            <span className="text-sm font-semibold">{streak} day streak</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Trophy size={16} />
            <span>{xp}/{goal} XP</span>
          </div>
        </div>
        <div className="mt-2 h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressColor} transition-all duration-300`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1 text-[11px] text-neutral-500">Daily goal: earn {goal} XP</p>
      </div>
    </div>
  );
}
