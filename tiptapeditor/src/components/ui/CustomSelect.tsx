// File: src/components/ui/CustomSelect.tsx
import React, { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (open && listRef.current && highlighted >= 0) {
      const el = listRef.current.children[highlighted] as HTMLElement;
      if (el) el.scrollIntoView({ block: 'nearest' });
    }
  }, [open, highlighted]);

  useEffect(() => {
    if (!open) setHighlighted(-1);
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
    <div className={`selectWrapper className`}
      tabIndex={0}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
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
      {open && (
        <ul
          className="options"
          ref={listRef}
          role="listbox"
          tabIndex={-1}
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
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;