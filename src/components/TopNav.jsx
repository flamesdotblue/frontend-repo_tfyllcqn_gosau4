import { Home, Search, Bell, User } from "lucide-react";

export default function TopNav({ active = "home" }) {
  const tabs = [
    { key: "home", icon: Home, label: "Home" },
    { key: "search", icon: Search, label: "Explore" },
    { key: "bell", icon: Bell, label: "Alerts" },
    { key: "user", icon: User, label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-sm px-4 h-12 flex items-center justify-between">
        <div className="font-bold text-xl tracking-tight">LearnFlow</div>
        <nav className="flex gap-5 text-neutral-500">
          {tabs.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              aria-label={label}
              className={`relative p-1 ${
                active === key ? "text-black" : "hover:text-neutral-700"
              }`}
            >
              <Icon size={22} />
              {active === key && (
                <span className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 h-0.5 w-5 bg-black rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
