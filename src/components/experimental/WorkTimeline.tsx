import { asset } from '@/lib/assets';
import { motion } from 'motion/react';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface WorkExperience {
  id: string;
  logo: string;
  accent: string;
  name: string;
  position: string;
  description: string;
  years: string;
  months: number;
}

interface WorkEntry {
  id: string;
  logoPath: string;
  accent: string;
  start: { year: number; month: number };
  end: { year: number; month: number };
}

function durationMonths(entry: WorkEntry): number {
  return (entry.end.year - entry.start.year) * 12 + (entry.end.month - entry.start.month);
}

const WORK_ENTRIES: WorkEntry[] = [
  {
    id: 'treenity',
    logoPath: 'images/logos/treenity.svg',
    accent: '#7CF072',
    start: { year: 2023, month: 2 },
    end: { year: 2026, month: 1 },
  },
  {
    id: 'kvarum',
    logoPath: 'images/logos/kvarum.svg',
    accent: '#a5c341',
    start: { year: 2021, month: 6 },
    end: { year: 2023, month: 1 },
  },
  {
    id: 'sandvik',
    logoPath: 'images/logos/sandvik.svg',
    accent: '#ffffff',
    start: { year: 2009, month: 7 },
    end: { year: 2021, month: 5 },
  },
];

const BASE_HEIGHT = 140;
const PX_PER_MONTH = 2.4;

function rowHeight(months: number): number {
  return BASE_HEIGHT + months * PX_PER_MONTH;
}

const WorkTimeline: FC = () => {
  const { t } = useTranslation();

  const items: WorkExperience[] = WORK_ENTRIES.map((entry) => ({
    id: entry.id,
    logo: asset(entry.logoPath),
    accent: entry.accent,
    name: t(`work.${entry.id}.name`),
    position: t(`work.${entry.id}.position`),
    description: t(`work.${entry.id}.description`),
    years: t(`work.${entry.id}.years`),
    months: durationMonths(entry),
  }));

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block relative w-full max-w-3xl lg:max-w-4xl mx-auto pt-10 pb-0 select-none">
        {/* Central spine */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] z-0"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        <div className="flex flex-col">
          {items.map((item, index) => {
            const iconLeft = index % 2 === 0;

            const iconNode = (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.12 }}
                className="w-[96px] h-[96px] lg:w-[128px] lg:h-[128px] xl:w-[144px] xl:h-[144px] rounded-full flex items-center justify-center overflow-hidden shrink-0"
                style={{
                  background: `radial-gradient(circle, ${item.accent}18 0%, transparent 70%)`,
                }}
              >
                <LogoOrFallback logo={item.logo} name={item.name} accent={item.accent}
                                className="w-16 h-16 lg:w-16 lg:h-16 xl:w-18 xl:h-18" />
              </motion.div>
            );

            const textNode = (
              <motion.div
                initial={{ opacity: 0, x: iconLeft ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.12 + 0.1 }}
                className={`flex flex-col gap-1 ${iconLeft ? 'text-left items-start' : 'text-right items-end'}`}
              >
                <TextContent item={item} />
              </motion.div>
            );

            return (
              <div
                key={item.id}
                className="grid items-center"
                style={{
                  gridTemplateColumns: '1fr 2px 1fr',
                  minHeight: rowHeight(item.months),
                }}
              >
                {/* Left column */}
                <div className="flex justify-end pr-6 lg:pr-10">
                  {iconLeft
                    ? <div className="sticky top-8">{iconNode}</div>
                    : textNode}
                </div>

                {/* Spine line */}
                <div className="relative z-10 self-stretch flex items-center justify-center py-3">
                  <SpinePill item={item} />
                </div>

                {/* Right column */}
                <div className="flex justify-start pl-6 lg:pl-10">
                  {iconLeft
                    ? textNode
                    : <div className="sticky top-8">{iconNode}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col w-full px-4 pt-8 pb-0">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            {/* Circle + vertical connector */}
            <div className="flex flex-col items-center shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.12 }}
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 overflow-hidden"
                style={{
                  background: `radial-gradient(circle, ${item.accent}18 0%, transparent 70%)`,
                }}
              >
                <LogoOrFallback logo={item.logo} name={item.name} accent={item.accent} className="w-10 h-10" />
              </motion.div>

              {index < items.length - 1 && (
                <div
                  className="w-[2px] flex-1 mt-1"
                  style={{ background: 'rgba(255,255,255,0.08)', minHeight: Math.max(28, item.months * 3) }}
                />
              )}
            </div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.12 + 0.1 }}
              className="flex flex-col gap-0.5 pb-4 pt-1 flex-1"
            >
              <TextContent item={item} />
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );
};

const SpinePill: FC<{ item: WorkExperience }> = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const yrs = Math.floor(item.months / 12);
  const mos = item.months % 12;
  const label = mos > 0 ? `${yrs}y ${mos}m` : `${yrs}y`;

  return (
    <motion.div
      className="relative rounded-full border-2 overflow-hidden cursor-default self-stretch"
      style={{ borderColor: item.accent, boxShadow: `0 0 8px ${item.accent}40` }}
      animate={{
        width: hovered ? 40 : 14,
        background: hovered ? `${item.accent}cc` : `${item.accent}30`,
      }}
      transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-[9px] font-bold tracking-widest whitespace-nowrap"
        style={{ writingMode: 'vertical-lr', color: '#181818' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.15, delay: hovered ? 0.18 : 0 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

const TextContent: FC<{ item: WorkExperience }> = ({ item }) => (
  <>
    <span className="text-xs lg:text-sm font-mono tracking-[0.15em] uppercase text-primary-500">
      {item.years}
    </span>
    <p className="font-semibold text-base lg:text-lg xl:text-xl text-white leading-snug mt-0.5">{item.name}</p>
    <p className="text-sm lg:text-base text-white/45 mb-0.5">{item.position}</p>
    <p className="text-sm lg:text-base text-white/65 leading-relaxed">{item.description}</p>
  </>
);

interface LogoOrFallbackProps {
  logo: string;
  name: string;
  accent: string;
  className?: string;
}

const LogoOrFallback: FC<LogoOrFallbackProps> = ({ logo, name, accent, className = 'w-9 h-9' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="font-bold select-none text-[1.2em]"
        style={{
          lineHeight: 1,
          color: accent,
          textShadow: `0 0 12px ${accent}40`,
        }}
      >
        {name[0].toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
};

export default WorkTimeline;
