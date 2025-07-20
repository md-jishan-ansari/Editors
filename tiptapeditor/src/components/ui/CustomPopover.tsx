// File: src/components/ui/CustomPopover.tsx
import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './CustomPopover.module.css';

interface CustomPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  className?: string;
}

const CustomPopover: React.FC<CustomPopoverProps> = ({ open, onOpenChange, anchorEl, children, className }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (open && anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [open, anchorEl]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && anchorEl && !anchorEl.contains(event.target as Node)) {
        onOpenChange(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onOpenChange, anchorEl]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div
      ref={popoverRef}
      className={`${styles.popover} ${className || ''}`}
      style={{ top: position.top, left: position.left, position: 'absolute', zIndex: 1000 }}
      tabIndex={-1}
      role="dialog"
    >
      {children}
    </div>,
    document.body
  );
};

export default CustomPopover;