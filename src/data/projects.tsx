import type { ReactNode } from 'react';
import { asset } from '../lib/assets.ts';

interface StackItem {
  name: string;
  icon: ReactNode;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  description?: string | ReactNode;
  goal?: string | ReactNode;
  solution?: string | ReactNode;
  keyPoints: string[];
  stack: StackItem[];
  url?: string;
}

export const projects: Project[] = [
  {
    id: 'kvarum',
    title: 'Kvarum',
    subtitle: 'Scheduling application for lectors and listeners to stay in touch',
    thumbnail: asset('/images/kvarum-thumb.jpg'),
    description: 'A comprehensive scheduling platform that connects educators with their audience. Built with real-time synchronization, calendar integration, and notification systems.',
    goal: 'Create a seamless scheduling experience that bridges the gap between expert lecturers and students, ensuring real-time availability and easy communication.',
    solution: 'Developed a robust frontend with WebSockets for real-time updates, different calendar visualizations and implemented a custom notification engine to keep all parties informed.',
    keyPoints: [
      'Real-time synchronization',
      'Complex time zone handling',
      'Optimized calendar rendering',
      'Desktop and mobile versions',
      'Scalable notification system',
    ],
    stack: [
      { name: 'Next.js', icon: <></> },
      { name: 'TypeScript', icon: <></> },
      { name: 'CSS-in-JS (Styled Components)', icon: <></> },
      { name: 'AntDesign', icon: <></> },
      { name: 'WebSockets', icon: <></> },
      { name: 'Figma', icon: <></> },
    ],
    url: 'https://kvarum.app',
  },
  {
    id: 'bus-tracker',
    title: 'Bus Tracker',
    subtitle: 'Platform to track current bus locations according schedule',
    thumbnail: asset('/images/bus-tracker-thumb.jpg'),
    description: `Buses in my city doesn't have GPS tracking, so I created this platform to track current bus locations according schedule`,
    goal: 'Provide commuters with reliable, real-time bus location estimates in a city lacking GPS-equipped public transit.',
    solution: 'Engineered a predictive algorithm using GTFS static data and historical transit patterns to interpolate bus positions, visualized through a high-performance Leaflet map interface.',
    keyPoints: [
      'Schedule-based position interpolation',
      'GTFS static data processing',
      'Real-time delay compensation logic',
      'Optimized map rendering for transit routes',
      'Flexible UI',
    ],
    stack: [
      { name: 'React', icon: <></> },
      { name: 'TypeScript', icon: <></> },
      { name: 'Tailwind CSS', icon: <></> },
      { name: 'OpenStreetMap', icon: <></> },
      { name: 'Leaflet', icon: <></> },
    ],
    url: 'https://lexeor.github.io/bus-tracker/',
  },
  {
    id: 'craftistry',
    title: 'Craftistry',
    subtitle: 'Platform for artisans to sell their products',
    thumbnail: asset('/images/craftistry-thumb.jpg'),
    description: 'E-commerce marketplace tailored for handmade goods. Includes custom storefront builder, secure payments, and inventory management.',
    goal: 'Empower independent artisans by providing a specialized platform that combines ease of use with powerful marketing and sales tools.',
    solution: 'Built a drag-and-drop storefront builder, integrated Stripe for multi-party payments, and designed an intuitive dashboard for artisans to manage their digital and physical inventory.',
    keyPoints: [
      'Dynamic storefront builder',
      'Responsive artisan dashboard with drag-and-drop functionality',
      'Telegram API integration',
      'Telegram Mini App integration',
    ],
    stack: [
      { name: 'Remix', icon: <></> },
      { name: 'TypeScript', icon: <></> },
      { name: 'Tailwind CSS', icon: <></> },
      { name: 'Figma', icon: <></> },
    ],
  },
];