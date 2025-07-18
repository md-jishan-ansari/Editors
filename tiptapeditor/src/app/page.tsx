import Editor from "@/components/Editor";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <Editor />
    </div>
  );
}
