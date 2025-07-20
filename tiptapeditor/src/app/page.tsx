import SmallTiptapEditor from "@/components/SmallTiptapEditor";
import Editor from "@/components/TiptapEditor";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <Editor />
      <SmallTiptapEditor />
    </div>
  );
}
