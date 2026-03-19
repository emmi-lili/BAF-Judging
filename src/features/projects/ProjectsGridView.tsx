import projects from "@/mock-data/projects.json";
import ProjectSummaryCard from "@/components/dashboard/ProjectSummaryCard";
import type { Project } from "@/types/dashboard";

export default function ProjectsGridView() {
  const data = projects as Project[];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[12px] font-oxanium tracking-widest text-neon-cyan/90 font-semibold">
          ALL_PROJECTS
        </div>
        <h1 className="mt-2 text-[26px] font-oxanium tracking-wider font-semibold text-black">
          All projects
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((p, idx) => (
            <ProjectSummaryCard
              key={p.id}
              project={p}
              href={`/projects/${p.id}`}
              tone={idx % 2 === 0 ? "cyan" : "purple"}
            />
          ))}
      </div>
    </div>
  );
}

