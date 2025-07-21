// File: src/components/ui/CustomSelect.tsx
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './CustomSelect.css';

interface Option {
  value: string;
  label: React.ReactNode;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string; // e.g. 'Font Size', 'Font Family', etc.
  label?: string; // for accessibility and visual clarity
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, options, onChange, className, placeholder, label }) => {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number, width: number}>({top: 0, left: 0, width: 0});

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [open]);

  useEffect(() => {
    if (open && listRef.current && highlighted >= 0) {
      const el = listRef.current.children[highlighted] as HTMLElement;
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [open, highlighted]);

  useEffect(() => {
    if (!open) setHighlighted(-1);
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        setOpen(true);
        setHighlighted(0);
        e.preventDefault();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      setHighlighted(h => Math.min(h + 1, options.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHighlighted(h => Math.max(h - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (highlighted >= 0) {
        onChange(options[highlighted].value);
        setOpen(false);
      }
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setOpen(false);
      e.preventDefault();
    }
  }

  function handleOptionClick(idx: number) {
    onChange(options[idx].value);
    setOpen(false);
  }

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`selectWrapper ${className || ''}`}
      tabIndex={0}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      style={{display: 'inline-block'}}
    >
      {label && <div className="label">{label}</div>}
      <button
        ref={triggerRef}
        className="trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span className={selectedOption ? undefined : "placeholder"}>
          {selectedOption ? selectedOption.label : placeholder || 'Select...'}
        </span>
        <span className="chevron" aria-hidden>▼</span>
      </button>
      {open && ReactDOM.createPortal(
        <ul
          className="options"
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          style={{
            position: 'absolute',
            top: dropdownPos.top,
            left: dropdownPos.left,
            minWidth: dropdownPos.width,
            maxWidth: 200,
            zIndex: 2000
          }}
        >
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              className={
                `option ${value === opt.value ? "selected" : ''} ${highlighted === idx ? "highlighted" : ''}`
              }
              role="option"
              aria-selected={value === opt.value}
              onMouseDown={e => { e.preventDefault(); handleOptionClick(idx); }}
              onMouseEnter={() => setHighlighted(idx)}
            >
              {opt.label}
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
};

export default CustomSelect;