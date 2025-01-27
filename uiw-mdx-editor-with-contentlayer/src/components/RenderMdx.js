"use client"
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import {Pre} from './Pre'
import ComponentCard from "@/src/components/ComponentCard";
import Accordion from '@/src/components//AccordionGroup';
  
const mdxComponents = {
    pre: Pre,
    Image,
    ComponentCard,
    Accordion: Accordion,
    Style: ({children}) => <div><style>{children}</style></div>,
}

const RenderMdx = ({blog}) => {

  const MDXContent = useMDXComponent(blog.body.code)

  return (
    <div data-theme="dark" className='col-span-12  lg:col-span-8 font-in prose max-w-max
    prose-lg //to make font large
    prose-blockquote:bg-accent/20
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:border-accent
    prose-blockquote:not-italic
    prose-blockquote:rounded-r-lg

    prose-li:marker:text-accent


    '> 
        <MDXContent components={mdxComponents}/>
    </div>
  )
}

export default RenderMdx