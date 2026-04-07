export interface Project {
  id: string
  title: string
  subtitle: string
  categories: string[]
  thumbnail?: string
}

export const categories = [
  'All',
  'UX/UI',
  'Branding',
  'Interactive',
  'Visual Design',
]

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'VelvetY Brand System',
    subtitle: 'Branding & Visual Identity',
    categories: ['Branding', 'Visual Design'],
  },
  {
    id: 'project-2',
    title: 'BuyerFolio AI Platform',
    subtitle: 'Product UX Design',
    categories: ['UX/UI'],
  },
  {
    id: 'project-3',
    title: 'Thrive Freeze Dry',
    subtitle: 'E-commerce & Brand Design',
    categories: ['UX/UI', 'Branding'],
  },
  {
    id: 'project-4',
    title: 'Eastside Builders Group',
    subtitle: 'Web Design & Development',
    categories: ['UX/UI', 'Interactive'],
  },
  {
    id: 'project-5',
    title: 'Import National',
    subtitle: 'Visual Identity & Collateral',
    categories: ['Branding', 'Visual Design'],
  },
  {
    id: 'project-6',
    title: 'Interactive Campaign',
    subtitle: 'Motion Design & Interactive Media',
    categories: ['Interactive', 'Visual Design'],
  },
]
