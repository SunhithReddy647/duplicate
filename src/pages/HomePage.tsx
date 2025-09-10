import React from 'react';
import { TrendingUp, Star, Sparkles, Play, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface HomePageProps {
  projects: Project[];
  onNavigateToProjects: () => void;
  onProjectClick: (project: Project) => void;
  onShareProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  onNavigateToProjects,
  onProjectClick,
  onShareProject
}) => {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  
  const stats = {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    categories: new Set(projects.map(p => p.category)).size
  };

  return (
    <div className="relative">
      {/* Hero Section */}
    <section className="relative py-11 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Half - Hero Content */}
            <div className="text-center lg:text-left slide-in">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 neon-glow leading-tight">
                Code That Actually <span className="gradient-text-fire">Slaps</span> 🔥
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
                No cap - these projects are straight fire! 🚀 From AI that hits different to web apps that go hard. 
                Perfect inspo for your next assignment or side hustle 💯
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onNavigateToProjects}
                  className="group bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl"
                >
                  Explore Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button
                  onClick={onNavigateToProjects}
                  className="group glass border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <TrendingUp className="w-5 h-5" />
                  View All {stats.total} Projects
                </button>
              </div>
            </div>
            
            {/* Right Half - Featured Projects Preview */}
            <div className="hidden lg:block slide-in" style={{ animationDelay: '200ms' }}>
              {featuredProjects.length > 0 && (
                <FeaturedSlideshow 
                  projects={featuredProjects}
                  onProjectClick={onProjectClick}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Project Statistics
            </h2>
            <p className="text-xl text-gray-300">
              Showcasing innovation across multiple domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 border border-gray-600 text-center hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300 transform hover:scale-105">
              <div className="bg-black border border-gray-600 p-4 rounded-xl w-fit mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">{stats.total}</h3>
              <p className="text-gray-300">Total Projects</p>
            </div>
            
            <div className="glass rounded-2xl p-8 border border-gray-600 text-center hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300 transform hover:scale-105">
              <div className="bg-black border border-gray-600 p-4 rounded-xl w-fit mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">{stats.featured}</h3>
              <p className="text-gray-300">Featured Projects</p>
            </div>
            
            <div className="glass rounded-2xl p-8 border border-gray-600 text-center hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300 transform hover:scale-105">
              <div className="bg-black border border-gray-600 p-4 rounded-xl w-fit mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">{stats.categories}</h3>
              <p className="text-gray-300">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="relative py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-300">
                Handpicked projects that showcase exceptional innovation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <FeaturedProjectCard
                    project={project}
                    onClick={onProjectClick}
                    onShare={onShareProject}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button
                onClick={onNavigateToProjects}
                className="group bg-black border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// Featured Project Card Component
const FeaturedProjectCard: React.FC<{
  project: Project;
  onClick: (project: Project) => void;
  onShare: (project: Project) => void;
}> = ({ project, onClick, onShare }) => {
  return (
    <div 
      className="group glass rounded-xl overflow-hidden border border-gray-600 hover:border-gray-400 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-500/20"
      onClick={() => onClick(project)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        <div className="absolute top-3 right-3 bg-black border border-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
          <Sparkles className="w-3 h-3" />
          Featured
        </div>
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-black/80 hover:bg-black text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-gray-600 shadow-2xl">
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm font-medium border border-gray-600 hover:border-gray-500 hover:bg-gray-700 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium border border-gray-500">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Featured Slideshow Component
const FeaturedSlideshow: React.FC<{
  projects: Project[];
  onProjectClick: (project: Project) => void;
}> = ({ projects, onProjectClick }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (projects.length === 0) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        setIsTransitioning(false);
      }, 150);
    }, 4000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const handleIndicatorClick = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Star className="w-6 h-6 text-gray-400" />
        <h3 className="text-2xl font-bold text-white">Featured Projects</h3>
      </div>
      
      <div className="glass rounded-xl border border-gray-600 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-500/20">
        <div 
          className={`relative h-64 cursor-pointer overflow-hidden transition-all duration-300 ${isTransitioning ? 'opacity-90 scale-95' : 'opacity-100 scale-100'}`}
          onClick={() => onProjectClick(currentProject)}
        >
          <img
            src={currentProject.image}
            alt={currentProject.title} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-gray-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-white" />
            Featured
          </div>
        </div>
        
        <div className={`p-6 bg-gray-900/20 backdrop-blur-sm transition-all duration-300 ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}>
          <h4 className="text-xl font-bold text-white mb-3 hover:text-gray-200 transition-colors duration-300">
            {currentProject.title}
          </h4>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
            {currentProject.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {currentProject.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-xs font-medium border border-gray-600 hover:border-gray-500 hover:bg-gray-700 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {currentProject.technologies.length > 3 && (
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium border border-gray-500">
                +{currentProject.technologies.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex justify-center space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleIndicatorClick(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-500 hover:scale-125 ${
                  index === currentIndex 
                    ? 'bg-white w-6 shadow-lg shadow-white/50' 
                    : 'bg-gray-500 hover:bg-gray-400 hover:w-4'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};