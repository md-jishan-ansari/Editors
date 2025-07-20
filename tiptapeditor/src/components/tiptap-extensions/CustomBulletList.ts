import { BulletList } from '@tiptap/extension-bullet-list';
import { mergeAttributes } from '@tiptap/core';

export const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: 'disc',
        parseHTML: element => element.style.listStyleType || 'disc',
        renderHTML: attributes => {
          return {
            style: `list-style-type: ${attributes.listStyleType || 'disc'}`,
          };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['ul', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});