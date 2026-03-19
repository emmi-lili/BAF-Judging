import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { QueueItem } from "@/types/dashboard";

const toneForStatus = (status: QueueItem["status"]) => {
  switch (status) {
    case "pending":
      return { progress: "bg-black/10", fill: "bg-black/20" };
    case "in_progress":
      return {
        progress: "bg-neon-cyan/35",
        fill: "bg-neon-cyan",
      };
    case "evaluated":
      return {
        progress: "bg-emerald-400/30",
        fill: "bg-emerald-400",
      };
    default:
      return { progress: "bg-black/10", fill: "bg-black/20" };
  }
};

export default function ProjectQueueCard({
  item,
  onPrimaryAction,
}: {
  item: QueueItem;
  onPrimaryAction?: () => void;
}) {
  const tone = toneForStatus(item.status);

  return (
    <div className="rounded-xl border border-black/10 bg-white px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[14px] font-oxanium tracking-wider font-semibold text-black leading-tight">
            {item.teamName}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Badge
              variant={item.status === "evaluated" ? "green" : item.status === "in_progress" ? "cyan" : "gray"}
              className="px-2 py-0.5"
            >
              {item.statusLabel}
            </Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.stackTags.map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-widest uppercase font-oxanium px-2 py-1 rounded-full border border-black/10 bg-white text-black/65"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] tracking-widest uppercase font-oxanium text-black/50">
            EVALUATION-PROGRESS
          </div>
          <div className="text-[12px] font-oxanium tracking-widest font-semibold text-black/85 mt-1">
            {item.evaluationProgressPct}%
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-[6px] rounded-full bg-black/10 overflow-hidden">
          <div
            className={cn("h-full", tone.fill)}
            style={{ width: `${item.evaluationProgressPct}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <Button
          variant="secondary"
          className={cn(
            "w-full rounded-xl",
            item.status === "pending" ? "bg-black/0" : "",
          )}
          onClick={onPrimaryAction}
        >
          {item.actionLabel}
        </Button>
      </div>
    </div>
  );
}

