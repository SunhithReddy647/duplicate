import { Project } from '../types';

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with modern UI, payment integration, and admin dashboard. Built with React, Node.js, and MongoDB.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    createdAt: '2024-01-15',
    featured: true,
    stars: 8,
    hackathonCode: 'SIH2024-001'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI'],
    createdAt: '2024-01-20',
    featured: false,
    stars: 6
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with detailed forecasts, interactive maps, and location-based weather alerts.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Web Development',
    technologies: ['Vue.js', 'OpenWeatherMap API', 'Chart.js', 'CSS3'],
    createdAt: '2024-01-25',
    featured: true,
    stars: 7,
    hackathonCode: 'SIH2024-003'
  },
  {
    id: '4',
    title: 'Smart Contract Platform',
    description: 'A decentralized platform for creating and managing smart contracts with built-in security auditing and deployment tools.',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'API',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'React', 'Hardhat'],
    githubUrl: 'https://github.com/username/api-framework',
    createdAt: '2024-02-01',
    featured: false,
    stars: 5
  },
  {
    id: '5',
    title: 'Mobile Expense Tracker',
    description: 'A React Native mobile app for tracking expenses with categories, budgets, and detailed analytics.',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Mobile App',
    technologies: ['React Native', 'Redux', 'SQLite', 'React Navigation'],
    githubUrl: 'https://github.com/username/expense-tracker',
    createdAt: '2024-02-05',
    featured: false,
    stars: 4
  },
  {
    id: '6',
    title: 'Predictive Analytics Engine',
    description: 'An AI-powered analytics engine that uses machine learning to predict trends and provide actionable business insights.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn', 'FastAPI'],
    createdAt: '2024-02-10',
    featured: true,
    stars: 8,
    hackathonCode: 'SIH2024-006'
  },
  {
    id: '7',
    title: 'Object Detection System',
    description: 'Real-time object detection and tracking system using advanced computer vision algorithms for security and surveillance.',
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Computer Vision',
    technologies: ['OpenCV', 'YOLO', 'Python', 'TensorFlow', 'NumPy'],
    createdAt: '2024-02-12',
    featured: false,
    stars: 6
  },
  {
    id: '8',
    title: 'Network Security Scanner',
    description: 'Comprehensive network security scanning tool with vulnerability assessment and automated penetration testing capabilities.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Cyber Security',
    technologies: ['Python', 'Nmap', 'Metasploit', 'Wireshark', 'Kali Linux'],
    createdAt: '2024-02-14',
    featured: true,
    stars: 7,
    hackathonCode: 'SIH2024-008'
  }
];