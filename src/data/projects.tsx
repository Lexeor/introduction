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
    stack: [
      { name: 'Next.js', icon: <></> },
      { name: 'TypeScript', icon: <></> },
      { name: 'Tailwind CSS', icon: <></> },
    ],
    url: 'https://kvarum.app',
  },
  {
    id: 'bus-tracker',
    title: 'Bus Tracker',
    subtitle: 'Platform for bus drivers to track their routes',
    thumbnail: asset('/images/bus-tracker-thumb.jpg'),
    description: 'Real-time GPS tracking solution for public transportation. Features include route optimization, delay predictions, and passenger information displays.',
    stack: [
      { name: 'Next.js', icon: <></> },
      { name: 'TypeScript', icon: <></> },
      { name: 'Tailwind CSS', icon: <></> },
    ],
    url: 'https://lexeor.github.io/bus-tracker/',
  },
  {
    id: 'craftistry',
    title: 'Craftistry',
    subtitle: 'Platform for artisans to sell their products',
    thumbnail: asset('/images/craftistry-thumb.jpg'),
    description: 'E-commerce marketplace tailored for handmade goods. Includes custom storefront builder, secure payments, and inventory management.',
    stack: [
      { name: 'Next.js', icon: <></> },
      { name: 'TypeScript', icon: <></> },
      { name: 'Tailwind CSS', icon: <></> },
    ],
  },
];