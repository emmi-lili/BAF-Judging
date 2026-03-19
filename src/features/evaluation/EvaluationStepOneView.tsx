"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EvalBlock = {
  phaseLabel: string;
  progressPct: number;
  criterionLabel: string;
  question: string;
  questionAccent: string;
  description: string;
  maxScore: number;
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
    maxScore: 20,
  },
  {
    phaseLabel: "UX FLOW & CLARITY",
    progressPct: 25,
    criterionLabel: "CRITERION 02/08",
    question:
      "User Experience (UX/UI): Is the product intuitive and easy to use for its target users?",
    questionAccent: "Is the product intuitive and easy to use for its target users?",
    description:
      "Evaluate navigation clarity, interaction consistency, and whether users can complete key actions without friction.",
    maxScore: 10,
  },
  {
    phaseLabel: "STELLAR & ECOSYSTEM",
    progressPct: 37.5,
    criterionLabel: "CRITERION 03/08",
    question:
      "Use of Stellar & Ecosystem: How well does the project leverage Stellar and its ecosystem?",
    questionAccent:
      "How well does the project leverage Stellar and its ecosystem?",
    description:
      "Assess whether Stellar capabilities and ecosystem tools are used meaningfully, beyond superficial integrations.",
    maxScore: 20,
  },
  {
    phaseLabel: "TECHNICAL IMPLEMENTATION",
    progressPct: 50,
    criterionLabel: "CRITERION 04/08",
    question:
      "Technical Implementation & Execution: How well is the solution built and does it actually work?",
    questionAccent:
      "How well is the solution built and does it actually work?",
    description:
      "Evaluate technical quality, architecture solidity, execution completeness, and whether the implemented solution is functional end-to-end.",
    maxScore: 20,
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
  const [scores, setScores] = useState<number[]>([15, 8, 14, 16]);
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
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        <section className={cn("rounded-2xl border border-black/10 bg-white p-4 sm:p-6 md:p-8", stageClass(stage >= 1))}>
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
            <div className="text-[11px] font-oxanium tracking-widest text-black/55 invisible" aria-hidden="true" />
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
                max={currentBlock.maxScore}
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
                <span className="text-[24px] sm:text-[30px] text-black/40">
                  /{currentBlock.maxScore}
                </span>
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

