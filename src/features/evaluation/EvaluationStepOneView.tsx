"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Code2,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import projects from "@/mock-data/projects.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/dashboard";

type EvalBlock = {
  phaseLabel: string;
  progressPct: number;
  criterionLabel: string;
  question: string;
  questionAccent: string;
  description: string;
  navActive: "PROBLEM" | "UX_FLOW" | "CODEBASE" | "STABILITY";
};

const EVAL_BLOCKS: EvalBlock[] = [
  {
    phaseLabel: "PROBLEM & RELEVANCE",
    progressPct: 12.5,
    criterionLabel: "CRITERION 01/08",
    question: "Solution & Product: How effectively does the solution address the problem?",
    questionAccent: "How effectively does the solution address the problem?",
    description:
      "Assess the significance of the problem addressed and how effectively the proposed solution tackles its core pain points.",
    navActive: "PROBLEM",
  },
  {
    phaseLabel: "UX FLOW & CLARITY",
    progressPct: 25,
    criterionLabel: "CRITERION 02/08",
    question: "Is the user flow intuitive and easy to understand?",
    questionAccent: "intuitive and easy to understand?",
    description:
      "Evaluate navigation clarity, interaction consistency, and whether users can complete key actions without friction.",
    navActive: "UX_FLOW",
  },
];

function stageClass(isVisible: boolean) {
  return cn(
    "transition-all duration-500 ease-out",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
  );
}

export default function EvaluationStepOneView({ projectId }: { projectId: string }) {
  const [stage, setStage] = useState(0);
  const [blockIndex, setBlockIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([15, 12]);
  const data = projects as Project[];
  const project = useMemo(() => data.find((p) => p.id === projectId), [data, projectId]);
  const currentBlock = EVAL_BLOCKS[blockIndex];
  const score = scores[blockIndex] ?? 0;
  const totalScore = scores.reduce((acc, n) => acc + n, 0);

  const updateScore = (newScore: number) => {
    setScores((prev) => {
      const next = [...prev];
      next[blockIndex] = newScore;
      return next;
    });
  };

  const handleProceed = () => {
    if (blockIndex < EVAL_BLOCKS.length - 1) {
      setBlockIndex((i) => i + 1);
      return;
    }
  };

  const handleBack = () => {
    if (blockIndex > 0) {
      setBlockIndex((i) => i - 1);
      return;
    }
  };

  useEffect(() => {
    const timeline = [120, 340, 600, 860, 1120];
    const timers = timeline.map((delay, idx) =>
      window.setTimeout(() => setStage(idx + 1), delay),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-3 md:gap-4">
        <aside className={cn("rounded-2xl border border-black/10 bg-white p-4", stageClass(stage >= 1))}>
          <div className="rounded-xl border border-black/10 bg-[linear-gradient(180deg,rgba(0,179,212,0.06),rgba(179,92,255,0.06))] px-3 py-3">
            <div className="text-[11px] font-oxanium tracking-widest text-neon-cyan font-semibold">
              CYBER_JUDGE_01
            </div>
            <div className="text-[10px] font-oxanium tracking-wider text-black/55 mt-1">
              {project?.team ?? "VORTEX_HACKATHON"}
            </div>
          </div>

          <div className="mt-4 space-y-1">
            {[
              { label: "PROBLEM", icon: Lightbulb, active: true },
              { label: "UX_FLOW", icon: Sparkles, active: false },
              { label: "CODEBASE", icon: Code2, active: false },
              { label: "STABILITY", icon: ShieldCheck, active: false },
            ].map(({ label, icon: Icon }) => {
              const active = currentBlock.navActive === label;

              return (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 border",
                  active
                    ? "border-neon-cyan/40 bg-neon-cyan/10"
                    : "border-transparent text-black/65",
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "text-neon-cyan" : "text-black/45")} />
                <span className="text-[12px] font-oxanium tracking-widest">{label}</span>
              </div>
              );
            })}
          </div>
        </aside>

        <section className={cn("rounded-2xl border border-black/10 bg-white p-4 sm:p-6 md:p-8", stageClass(stage >= 2))}>
          <div className="flex items-center justify-between gap-4">
            <div className="text-[11px] font-oxanium tracking-widest text-black/55">
              PHASE: {currentBlock.phaseLabel}
            </div>
            <div className="text-[18px] font-oxanium tracking-wider text-neon-cyan font-semibold">
              {currentBlock.progressPct}%
            </div>
          </div>
          <div className="mt-3 h-[3px] bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-neon-cyan rounded-full" style={{ width: `${currentBlock.progressPct}%` }} />
          </div>

          <div className={cn("mt-5 sm:mt-7 rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgba(0,179,212,0.04),rgba(179,92,255,0.03))] p-4 sm:p-6 md:p-8", stageClass(stage >= 3))}>
            <div className="text-[11px] font-oxanium tracking-widest text-black/55">
              {currentBlock.criterionLabel}
            </div>
            <h2 className="mt-3 sm:mt-4 text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.06] sm:leading-[1.04] font-oxanium font-semibold tracking-wide text-black">
              {currentBlock.question.split(currentBlock.questionAccent)[0]}
              <span className="text-neon-cyan">{currentBlock.questionAccent}</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-[15px] sm:text-[18px] font-oxanium tracking-wide text-black/60 max-w-[820px]">
              {currentBlock.description}
            </p>

            <div className="mt-7 sm:mt-10">
              <input
                type="range"
                min={0}
                max={20}
                value={score}
                onChange={(e) => updateScore(Number(e.target.value))}
                className="w-full accent-[#00B3D4]"
              />
              <div className="mt-2 flex items-center justify-between text-[10px] font-oxanium tracking-widest text-black/35">
                <span>IRRELEVANT</span>
                <span>GAME_CHANGER</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="text-[52px] sm:text-[64px] leading-none font-oxanium font-semibold text-neon-cyan">
                {score}
                <span className="text-[24px] sm:text-[30px] text-black/40">/20</span>
              </div>
              <div className="text-[10px] font-oxanium tracking-widest text-black/45 mt-2">
                IMPACT SCORE
              </div>
            </div>

            <div className="mt-7">
              <div className="text-[12px] font-oxanium tracking-widest font-semibold text-neon-cyan">
                JUDGE&apos;S COMMENTS &amp; OBSERVATIONS
              </div>
              <textarea
                rows={5}
                className="mt-3 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[13px] font-oxanium tracking-wider outline-none focus:ring-2 focus:ring-neon-cyan/30"
                placeholder="Enter detailed feedback here..."
              />
            </div>
          </div>

          <div className={cn("mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4", stageClass(stage >= 4))}>
            {blockIndex === 0 ? (
              <Link
                href={`/projects/${projectId}`}
                className="inline-flex items-center gap-2 text-[11px] font-oxanium tracking-widest text-black/55 hover:text-black transition-colors order-1 sm:order-none"
              >
                <ArrowLeft className="h-4 w-4" />
                BACK
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-[11px] font-oxanium tracking-widest text-black/55 hover:text-black transition-colors order-1 sm:order-none"
              >
                <ArrowLeft className="h-4 w-4" />
                BACK
              </button>
            )}

            <div className="rounded-full border border-black/10 bg-white px-5 py-2 text-center order-2 sm:order-none self-center">
              <div className="text-[9px] font-oxanium tracking-widest text-black/45">TOTAL EVAL</div>
              <div className="text-[18px] font-oxanium tracking-wider font-semibold text-neon-cyan">
                {totalScore}/160
              </div>
            </div>

            <Button
              type="button"
              onClick={handleProceed}
              variant="default"
              className="h-12 w-full sm:w-auto sm:min-w-[180px] order-3 sm:order-none"
            >
              PROCEED
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

