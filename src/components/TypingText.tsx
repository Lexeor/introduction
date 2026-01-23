import { motion } from 'motion/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface TypingTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
}

const TypingText: FC<TypingTextProps> = ({
    text,
    speed = 0.05,
    delay = 0,
    className = "",
    onComplete
}) => {
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (isDone && onComplete) {
            onComplete();
        }
    }, [isDone, onComplete]);

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: speed,
                delayChildren: delay
            },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 0,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "inline-flex", flexWrap: "wrap", justifyContent: "center" }}
            variants={container}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setIsDone(true)}
            className={className}
        >
            {text.split(" ").map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: "0.25em" }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TypingText;
