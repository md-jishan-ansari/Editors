import { OrderedList } from '@tiptap/extension-ordered-list';
import { mergeAttributes } from '@tiptap/core';

export const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: 'decimal',
        parseHTML: element => element.style.listStyleType || 'decimal',
        renderHTML: attributes => {
          return {
            style: `list-style-type: ${attributes.listStyleType || 'decimal'}`,
          };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['ol', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});