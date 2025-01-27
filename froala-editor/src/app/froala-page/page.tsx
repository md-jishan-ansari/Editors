"use client";
import React, { useEffect, useState } from 'react'

const FroalaPage = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const savedContent = localStorage.getItem('froalaContent');
        setContent(savedContent || '');

        import('froala-editor/css/froala_style.min.css');
        import('froala-editor/css/froala_editor.pkgd.min.css');

    }, []);

    return (
        <div className="container mx-auto p-4">
            {/* Use dangerouslySetInnerHTML to render HTML content */}
            <div
                className="prose max-w-none fr-view"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    )
}

export default FroalaPage
