"use client";
import RenderMdx from "@/src/components/RenderMdx";
import {allBlogDrafts} from "contentlayer/generated";


const Blog = ({params}) => {
    const blog = allBlogDrafts.find((blog) => blog._raw.flattenedPath === "blogDraft/"+params.blog);
    if(blog === undefined) {
        return <div>Blog not found</div>
    }
    
    const handleScroll = (event, slug) => {
        event.preventDefault();
        const element = document.getElementById(slug);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <article className="p-5">
            <details className="pb-10">
            <summary>Table of Content</summary>
            {blog.toc.map((heading, index) => (
                <details key={index}>
                <summary>
                    <a href="#" onClick={(e) => handleScroll(e, heading.slug)}>
                        {heading.text}
                    </a>
                </summary>
                {heading?.child && (
                    <ul>
                    {heading.child.map((child, index) => (
                        <li key={index}>
                            <a href="#" onClick={(e) => handleScroll(e, child.slug)}>
                                {child.text}
                            </a>
                        </li>
                    ))}
                    </ul>
                )}
                </details>
            ))}
            </details>
            <RenderMdx blog={blog} />
        </article>
    )
}

export default Blog;