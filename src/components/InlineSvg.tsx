import React, { useEffect, useState } from 'react';
import { asset } from '@/lib/assets';

interface InlineSvgProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
}

const InlineSvg: React.FC<InlineSvgProps> = ({ name, className = '', ...props }) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(asset(`/icons/${name}.svg`));
                if (!response.ok) {
                    throw new Error(`Failed to fetch SVG: ${response.statusText}`);
                }
                let text = await response.text();

                setSvgContent(text);
                setError(false);
            } catch (err) {
                console.error('Error loading SVG:', err);
                setError(true);
            }
        };

        fetchSvg();
    }, [name]);

    if (error) {
        return <span className={`text-red-500 ${className}`}>Error</span>;
    }

    if (!svgContent) {
        return <div className={`animate-pulse bg-white/10 rounded-lg ${className}`} style={{ width: '1em', height: '1em' }} />;
    }

    return (
        <div
            className={`inline-flex items-center justify-center [&>svg]:w-full [&>svg]:h-full ${className}`}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            {...props}
        />
    );
};

export default InlineSvg;
