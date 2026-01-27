import type { FC, ReactNode, SVGProps } from 'react';

export const IconPlaceholder: FC<SVGProps<SVGSVGElement> & { label?: string | ReactNode }> = ({ label, ...props }) => {
    if (typeof label === 'object' && label !== null) {
        return <>{label}</>;
    }

    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <rect x="3" y="3" width="18" height="18" rx="4" strokeDasharray="4 2" />
            <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none">
                {/* @ts-expect-error - label is string */}
                {label?.slice(0, 2).toUpperCase()}
            </text>
        </svg>
    );
};

export default IconPlaceholder;
