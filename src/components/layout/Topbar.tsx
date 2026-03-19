"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";

const topNav = [
  { label: "Dashboard", href: "/overview" },
  { label: "Projects", href: "/projects" },
  { label: "Leaderboard", href: "/leaderboard" },
];

export default function Topbar() {
  const pathname = usePathname();

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-black/10 bg-[linear-gradient(180deg,rgba(247,249,255,0.95),rgba(241,245,255,0.85))]">
      <div className="flex items-center gap-10">
        <div className="font-oxanium text-black tracking-widest text-sm font-semibold">
          HEARTBEAT_OS
        </div>
        <div className="hidden md:flex items-center gap-6">
          {topNav.map((item) => {
            const isActive = item.href === "/overview"
              ? pathname === "/" || pathname.startsWith("/overview")
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-[12px] tracking-widest font-oxanium text-black/70 hover:text-black transition-colors relative pb-2",
                  isActive ? "text-black" : "",
                ].join(" ")}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute left-0 right-0 -bottom-[6px] h-[2px] bg-neon-cyan/80 shadow-[0_0_20px_rgba(0,179,212,0.28)]" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-black/10 shadow-[0_0_30px_rgba(0,179,212,0.08)] flex items-center justify-center">
          <UserRound className="h-4 w-4 text-black/75" />
        </div>
      </div>
    </header>
  );
}

