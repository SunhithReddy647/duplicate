import React from 'react';
import { Search, Plus, Code2, TrendingUp } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { SearchBar } from '../components/SearchBar';
import { Project } from '../types';

interface ProjectsPageProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  isSearching: boolean;
  searchStats: {
    totalResults: number;
    searchTime: number;
    suggestions: string[];
  };
  isAuthenticated: boolean;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onProjectClick: (project: Project) => void;
  onShareProject: (project: Project) => void;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (project: Project) => void;
  onAddProject: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  loading,
  error,
  searchTerm,
  selectedCategory,
  isSearching,
  searchStats,
  isAuthenticated,
  onSearchChange,
  onCategoryChange,
  onProjectClick,
  onShareProject,
  onEditProject,
  onDeleteProject,
  onAddProject
}) => {
  const categories = ['Web Development', 'Mobile App', 'AI/ML', 'Blockchain', 'Computer Vision', 'Cyber Security', 'Others'];
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center mb-12">
          <div className="slide-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 neon-glow">
              Our <span className="gradient-text-fire">Projects</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Explore our portfolio of innovative solutions across various domains. 
              From web applications to AI-powered systems, discover what we can build together.
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 slide-in">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Search className="w-6 h-6 text-gray-400" />
                Search & Filter
              </h3>
            </div>
            
            <div className="space-y-6">
              {/* Search Bar */}
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                isSearching={isSearching}
                searchStats={searchStats}
                placeholder="Search projects by name, technology, or category..."
              />
              
              {/* Category Filters */}
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-3 min-w-max px-1">
                  <button
                    type="button"
                    onClick={() => onCategoryChange('')}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap touch-manipulation ${
                      selectedCategory === ''
                        ? 'bg-white text-black shadow-lg'
                        : 'glass border border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => onCategoryChange(category)}
                      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap touch-manipulation ${
                        selectedCategory === category
                          ? 'bg-white text-black shadow-lg'
                          : 'glass border border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Add Project Button for Admins */}
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={onAddProject}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-black border border-gray-600 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 touch-manipulation"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Add New Project</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && !searchTerm && !selectedCategory && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white slide-in flex items-center justify-center gap-2">
                <TrendingUp className="w-8 h-8 text-gray-400" />
                Featured Projects
              </h3>
              <div className="w-24 h-1 bg-white mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
              {featuredProjects.slice(0, 3).map((project, index) => (
                <div
                  key={project.id}
                  className="slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard
                    project={project}
                    onClick={onProjectClick}
                    onShare={onShareProject}
                    onEdit={isAuthenticated ? onEditProject : undefined}
                    onDelete={isAuthenticated ? onDeleteProject : undefined}
                    isAdmin={isAuthenticated}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Projects Section */}
        <section>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white slide-in">
              {searchTerm || selectedCategory ? 'Search Results' : 'All Projects'}
            </h3>
            <div className="w-24 h-1 bg-white mx-auto mt-4 rounded-full"></div>
            
            {/* Search Results Summary */}
            {(searchTerm || selectedCategory) && (
              <div className="mt-4 text-gray-300 text-sm slide-in" style={{ animationDelay: '0.2s' }}>
                {isSearching ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Searching...
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p>
                      Showing {projects.length} of {searchStats.totalResults} projects
                      {searchTerm && ` for "${searchTerm}"`}
                      {selectedCategory && ` in ${selectedCategory}`}
                    </p>
                    {searchStats.searchTime > 0 && (
                      <p className="text-gray-400 text-xs">
                        Search completed in {searchStats.searchTime}ms
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProjectCard
                    project={project}
                    onClick={onProjectClick}
                    onShare={onShareProject}
                    onEdit={isAuthenticated ? onEditProject : undefined}
                    onDelete={isAuthenticated ? onDeleteProject : undefined}
                    isAdmin={isAuthenticated}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="glass rounded-2xl p-8 md:p-12 border border-gray-600 max-w-md mx-auto">
                <Code2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No projects found</h4>
                <p className="text-gray-300 text-base">
                  {searchTerm || selectedCategory 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'No projects available at the moment.'
                  }
                </p>
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={() => {
                      onSearchChange('');
                      onCategoryChange('');
                    }}
                    className="mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 border border-gray-600"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Project Stats */}
        {projects.length > 0 && (
          <section className="mt-16 pt-16 border-t border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="slide-in glass rounded-xl p-6 border border-gray-600">
                <h4 className="text-3xl font-bold text-white mb-2">{projects.length}</h4>
                <p className="text-gray-300">Total Projects</p>
              </div>
              <div className="slide-in glass rounded-xl p-6 border border-gray-600" style={{ animationDelay: '100ms' }}>
                <h4 className="text-3xl font-bold text-white mb-2">{featuredProjects.length}</h4>
                <p className="text-gray-300">Featured Projects</p>
              </div>
              <div className="slide-in glass rounded-xl p-6 border border-gray-600" style={{ animationDelay: '200ms' }}>
                <h4 className="text-3xl font-bold text-white mb-2">{new Set(projects.map(p => p.category)).size}</h4>
                <p className="text-gray-300">Categories</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};