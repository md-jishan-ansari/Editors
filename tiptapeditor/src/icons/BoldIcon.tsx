// File: src/icons/BoldIcon.tsx
// Icon color is controlled by parent (inherits 'currentColor'). For dark mode, ensure parent sets color to white or near-white.
import React from "react";
interface IconProps {
    size?: number;
    color?: string;
    className?: string;
}
const BoldIcon: React.FC<IconProps> = ({ size = 18, color = "currentColor", className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>
);
export default BoldIcon;
