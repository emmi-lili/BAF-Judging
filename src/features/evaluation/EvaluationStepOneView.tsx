"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "@/app/public/BAF1.png";

type EvalBlock = {
  phaseLabel: string;
  criterionLabel: string;
  question: string;
  questionAccent: string;
  description: string;
  maxScore: number;
};

const EVAL_BLOCKS: EvalBlock[] = [
  {
    phaseLabel: "PROBLEM & RELEVANCE",
    criterionLabel: "CRITERION 01/08",
    question: "Solution & Product: How effectively does the solution address the problem?",
    questionAccent: "How effectively does the solution address the problem?",
    description:
      "Assess the significance of the problem addressed and how effectively the proposed solution tackles its core pain points.",
    maxScore: 20,
  },
  {
    phaseLabel: "UX FLOW & CLARITY",
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
    criterionLabel: "CRITERION 04/08",
    question:
      "Technical Implementation & Execution: How well is the solution built and does it actually work?",
    questionAccent:
      "How well is the solution built and does it actually work?",
    description:
      "Evaluate technical quality, architecture solidity, execution completeness, and whether the implemented solution is functional end-to-end.",
    maxScore: 20,
  },
  {
    phaseLabel: "INNOVATION & DIFFERENTIATION",
    criterionLabel: "CRITERION 05/08",
    question:
      "Innovation & Differentiation: How original and distinctive is this solution compared to existing alternatives?",
    questionAccent:
      "How original and distinctive is this solution compared to existing alternatives?",
    description:
      "Measure novelty, uniqueness of approach, and whether the solution introduces clear differentiation in value or execution.",
    maxScore: 20,
  },
  {
    phaseLabel: "STELLAR & ECOSYSTEM",
    criterionLabel: "CRITERION 06/08",
    question:
      "Use of Stellar & Ecosystem: How well does the project leverage Stellar and its ecosystem?",
    questionAccent:
      "How well does the project leverage Stellar and its ecosystem?",
    description:
      "Evaluate depth of Stellar integration, practical ecosystem usage, and whether the implementation demonstrates real platform understanding.",
    maxScore: 25,
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
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [scores, setScores] = useState<number[]>(() => EVAL_BLOCKS.map(() => 0));
  const currentBlock = EVAL_BLOCKS[blockIndex];
  const score = scores[blockIndex] ?? 0;
  const rawTotalScore = scores.reduce((acc, n) => acc + n, 0);
  const maxTotalScore = EVAL_BLOCKS.reduce((acc, b) => acc + b.maxScore, 0);
  const totalScore = Math.round((rawTotalScore / maxTotalScore) * 100);
  const progressPct = Math.round(((blockIndex + 1) / EVAL_BLOCKS.length) * 100);

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

    setShowFinalScreen(true);
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

  if (showSuccessScreen) {
    return (
      <div className="rounded-2xl border border-black/10 bg-[linear-gradient(180deg,#f8fbff,#eef4ff)] p-4 sm:p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 md:gap-10 items-center">
          <div className="relative">
            <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_60px_rgba(2,6,23,0.08)]">
              <div className="relative h-[260px] sm:h-[320px] rounded-xl bg-[radial-gradient(circle_at_20%_20%,rgba(0,179,212,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(179,92,255,0.18),transparent_45%),linear-gradient(145deg,#f6fbff,#e9f1ff)] border border-black/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={logo}
                    alt="Project reviewed"
                    width={180}
                    height={180}
                    className="h-[130px] w-[130px] sm:h-[180px] sm:w-[180px] object-contain drop-shadow-[0_12px_30px_rgba(0,179,212,0.28)]"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -top-4 right-4 rounded-xl border border-black/10 bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(2,6,23,0.10)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-neon-cyan" />
                <div>
                  <div className="text-[9px] font-oxanium tracking-widest text-black/45">STATUS</div>
                  <div className="text-[12px] font-oxanium tracking-wider font-semibold text-black/75">
                    SYNC_COMPLETE
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-neon-purple/10 px-3 py-1 border border-neon-purple/20">
              <span className="h-2 w-2 rounded-full bg-neon-purple" />
              <span className="text-[10px] font-oxanium tracking-widest text-neon-purple">PROJECT REVIEWED</span>
            </div>

            <h2 className="mt-4 text-[42px] sm:text-[54px] leading-[0.98] font-oxanium font-semibold tracking-wide text-black">
              Evaluation
              <br />
              Completed
            </h2>

            <p className="mt-4 text-[18px] font-oxanium tracking-wide text-black/65 max-w-[620px]">
              Thank you for your valuable time and feedback. Your evaluation has been
              successfully recorded in the PulseJudge mainframe.
            </p>

            <div className="mt-8">
              <Button asChild variant="default" className="h-14 px-8 sm:min-w-[320px] justify-between">
                <Link href="/overview">
                  RETURN TO DASHBOARD
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 text-[12px] font-oxanium tracking-wider text-black/55">
              14 Judges have finalized evaluations for this pool.
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (showFinalScreen) {
    return (
      <div className="space-y-4">
        <section className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="text-[11px] font-oxanium tracking-widest text-black/55">
              FINAL REFLECTION
            </div>
            <div className="text-[18px] font-oxanium tracking-wider text-neon-cyan font-semibold">
              100%
            </div>
          </div>
          <div className="mt-3 h-[3px] bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-neon-cyan rounded-full" style={{ width: "100%" }} />
          </div>

          <div className="mt-5 sm:mt-7 rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgba(0,179,212,0.04),rgba(179,92,255,0.03))] p-4 sm:p-6 md:p-8">
            <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.06] sm:leading-[1.04] font-oxanium font-semibold tracking-wide text-black">
              Final thoughts on the{" "}
              <span className="text-neon-cyan">Pitch &amp; Presentation?</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-[15px] sm:text-[18px] font-oxanium tracking-wide text-black/60 max-w-[820px]">
              Analyze the delivery, narrative flow, and overall impact of the
              project&apos;s verbal and visual representation.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "CONFIDENT", Icon: Rocket },
                { label: "CLEAR", Icon: Eye },
                { label: "CREATIVE", Icon: Sparkles },
              ].map(({ label, Icon }) => (
                <button
                  type="button"
                  key={label}
                  className="rounded-xl border border-black/10 bg-white px-4 py-6 hover:bg-black/[0.03] transition-colors"
                >
                  <div className="flex items-center justify-center">
                    <Icon className="h-5 w-5 text-black/70" />
                  </div>
                  <div className="mt-3 text-[11px] font-oxanium tracking-widest text-black/65">
                    {label}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-7">
              <div className="text-[12px] font-oxanium tracking-widest font-semibold text-neon-cyan">
                ADDITIONAL OBSERVATIONS
              </div>
              <textarea
                rows={5}
                className="mt-3 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[13px] font-oxanium tracking-wider outline-none focus:ring-2 focus:ring-neon-cyan/30"
                placeholder="Briefly log terminal feedback here..."
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setShowFinalScreen(false)}
              className="inline-flex items-center gap-2 text-[11px] font-oxanium tracking-widest text-black/55 hover:text-black transition-colors order-1 sm:order-none"
            >
              <ArrowLeft className="h-4 w-4" />
              PREVIOUS
            </button>

            <div className="rounded-full border border-black/10 bg-white px-5 py-2 text-center order-2 sm:order-none self-center">
              <div className="text-[9px] font-oxanium tracking-widest text-black/45">
                TOTAL EVAL
              </div>
              <div className="text-[18px] font-oxanium tracking-wider font-semibold text-neon-cyan">
                {totalScore}/100
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setShowSuccessScreen(true)}
              variant="default"
              className="h-12 w-full sm:w-auto sm:min-w-[180px] order-3 sm:order-none"
            >
              Submit review
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        <section className={cn("rounded-2xl border border-black/10 bg-white p-4 sm:p-6 md:p-8", stageClass(stage >= 1))}>
          <div className="flex items-center justify-between gap-4">
            <div className="text-[11px] font-oxanium tracking-widest text-black/55 invisible" aria-hidden="true" />
            <div className="text-[18px] font-oxanium tracking-wider text-neon-cyan font-semibold">
              {progressPct}%
            </div>
          </div>
          <div className="mt-3 h-[3px] bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-neon-cyan rounded-full" style={{ width: `${progressPct}%` }} />
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
                {totalScore}/100
              </div>
            </div>

            <Button
              type="button"
              onClick={handleProceed}
              variant="default"
              className="h-12 w-full sm:w-auto sm:min-w-[180px] order-3 sm:order-none"
            >
              {progressPct === 100 ? "Send" : "PROCEED"}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

