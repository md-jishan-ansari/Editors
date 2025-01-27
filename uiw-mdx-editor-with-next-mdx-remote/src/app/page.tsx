
import { getPostSlugs } from "@/lib/mdx/posts";
import Link from "next/link";

export default async function Home() {
  const blogSlugs = await getPostSlugs("content/blog");
  console.log({blogSlugs});
  return (
    <div className="container mx-auto p-4 flex gap-4 flex-col">
      <Link href="/uiw-mdx-editor" >uiw-mdx-editor</Link>

      <div>
        <h2>Blogs</h2>
        <div className="flex flex-col gap-3">


          {blogSlugs.map(slug => {
            const url = "/blogs/" + slug.replace('.mdx', '');
            return <Link className="text-blue-600" href={url}>{slug.replace('.mdx', '')}</Link>
          })}
        </div>
      </div>
    </div>
  );
}
