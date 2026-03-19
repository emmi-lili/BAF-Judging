import projectsQueue from "@/mock-data/queue.json";
import { Button } from "@/components/ui/button";
import ProjectQueueCard from "@/components/dashboard/ProjectQueueCard";
import StatCard from "@/components/dashboard/StatCard";
import CountdownStatCard from "@/components/dashboard/CountdownStatCard";
import type { QueueItem } from "@/types/dashboard";

export default function OverviewView() {
  const queue = projectsQueue as QueueItem[];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatCard label="TOTAL PROJECTS" value="42" tone="cyan" />
        <StatCard
          label="PENDING EVALUATION"
          value="18"
          tone="purple"
        />
        <CountdownStatCard label="TIME LEFT (COUNTDOWN)" initialSeconds={4 * 3600 + 22 * 60 + 15} tone="cyan" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[18px] font-oxanium tracking-wider font-semibold text-black">
          Active Judging Queue
        </h2>
        <div className="flex items-center gap-4 text-[12px] font-oxanium tracking-widest font-semibold text-black/45">
          <span>Filter: Newest</span>
          <span className="h-5 w-px bg-black/10" />
          <span>View: Grid</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {queue.map((item) => (
          <ProjectQueueCard
            key={item.id}
            item={{
              ...item,
              actionLabel: "VIEW PROJECT",
            }}
          />
        ))}
      </div>

      <div className="pt-3">
        <Button variant="default" className="rounded-xl px-8">
          FINALIZE_SCORES
        </Button>
      </div>
    </div>
  );
}

