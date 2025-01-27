import { makeSource, defineDocumentType } from "@contentlayer/source-files";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from 'rehype-react';
import remarkGfm from "remark-gfm";

import GithubSlugger, { slug } from "github-slugger";
import { visit } from 'unist-util-visit';

const blogField = {
  title: {
    type: "string", 
    required: true,
  },
  publishedAt: {
    type: "date",
    required: true,
  },
  updatedAt: {
    type: "date",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  image: { type: "image" },
  isPublished: {
    type: "boolean",
    default: true,
  },
  author: {
    type: "string",
    required: true,
  },
  tags: {
    type: "list",
    of: { type: "string" },
  },
}

const calculateTOC = async (doc) => {
    const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
    const slugger = new GithubSlugger();
    const headings = Array.from(doc.body.raw.matchAll(regulrExp));
    let finalHeading = [];
    headings.forEach(({ groups }) => {
      const flag = groups?.flag;
      const content = groups?.content;
      if (flag?.length === 1 || flag?.length === 2) {
        finalHeading.push({
          text: content,
          slug: slugger.slug(content),
          child: [],
        });
      } else {
        const lastIndex = finalHeading.length - 1;
        if (finalHeading[lastIndex] && finalHeading[lastIndex].child) {
          finalHeading[lastIndex].child.push({
            text: content,
            slug: slugger.slug(content),
          });
        }
      }
    });
    return finalHeading;
}



const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/blog/**/*.mdx",
  contentType: "mdx",
  fields: blogField,
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`,
    }, 
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    toc: {
      type: "json",
      resolve: calculateTOC,
    },
  },
}));

const BlogDraft = defineDocumentType(() => ({
  name: "BlogDraft",
  filePathPattern: "**/blogDraft/**/*.mdx",
  contentType: "mdx",
  fields: blogField,
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    toc: {
      type: "json",
      resolve: calculateTOC,
    },
  },
}));

const codeOptions = {
  theme: 'github-dark',
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, BlogDraft],
  mdx: {
    remarkPlugins: [remarkGfm, {}],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;
   
            if (codeEl.tagName !== "code") return;
   
            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [rehypePrettyCode, codeOptions],
      rehypeReact,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }
            
            for (const child of node.children) {    
              if (child.tagName === "pre") {
                child.properties["raw"] = node.raw;
              }
            }
          }
        });
      },
    ],
  }, 
});


// markdown comments syntax
// [//]: # (This is a Markdown comment fjsak f
// f djsafdsk
// fjdksajfdska
// fjdksa)