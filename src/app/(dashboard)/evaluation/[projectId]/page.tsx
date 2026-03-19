import EvaluationStepOneView from "@/features/evaluation/EvaluationStepOneView";

export default function EvaluationStepOnePage({
  params,
}: {
  params: { projectId: string };
}) {
  return <EvaluationStepOneView projectId={params.projectId} />;
}

