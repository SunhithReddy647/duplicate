export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  category: string;
  technologies: string[];
  createdAt: string;
  featured: boolean;
  stars: number;
  hackathonCode?: string;
}