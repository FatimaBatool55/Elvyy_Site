import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import TaskSplitter from "@/components/tools/TaskSplitter";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Group Project Task Splitter — 100% Free, No Login",
  description:
    "Free group project task splitter, 100% free with no login and no usage limit. Balance tasks fairly across group members and catch uneven workloads before they cause arguments.",
};

export default function Page() {
  const tool = getTool("task-splitter")!;
  return (
    <ToolShell tool={tool}>
      <TaskSplitter />
    </ToolShell>
  );
}
