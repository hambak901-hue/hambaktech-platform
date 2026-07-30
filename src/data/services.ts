export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: 1,
    title: "NIN Services",
    description: "Professional NIN enrollment, correction, and modification services.",
    featured: true,
  },
  {
    id: 2,
    title: "JAMB Registration",
    description: "Fast and reliable JAMB registration and profile creation.",
  },
  {
    id: 3,
    title: "WAEC Registration",
    description: "WAEC registration, PIN sales, and result checking.",
  },
  {
    id: 4,
    title: "Computer Training",
    description: "Professional ICT training with certification.",
  },
  {
    id: 5,
    title: "Printing & Photocopy",
    description: "High-quality printing, scanning, and photocopy services.",
  },
  {
    id: 6,
    title: "Website Development",
    description: "Modern websites and business software development.",
  },
];