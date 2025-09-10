import React, { useState } from 'react';
import { X, Upload, Plus, Star } from 'lucide-react';
import { Project } from '../types';

interface ProjectUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  editingProject?: Project;
}

export const ProjectUpload: React.FC<ProjectUploadProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingProject
}) => {
  const [formData, setFormData] = useState({
    title: editingProject?.title || '',
    description: editingProject?.description || '',
    image: editingProject?.image || '',
    videoUrl: editingProject?.videoUrl || '',
    category: editingProject?.category || '',
    technologies: editingProject?.technologies.join(', ') || '',
    featured: editingProject?.featured || false,
    stars: editingProject?.stars || 1,
    hackathonCode: editingProject?.hackathonCode || ''
  });

  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      stars: formData.stars,
      hackathonCode: formData.hackathonCode || undefined
    };
    
    onSubmit(projectData);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      image: '',
      videoUrl: '',
      category: '',
      technologies: '',
      featured: false,
      stars: 1,
      hackathonCode: ''
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-600">
        {/* Mobile-Optimized Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 touch-manipulation"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
          </button>
        </div>

        {/* Mobile-First Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 sm:py-4 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white placeholder-gray-400 text-base touch-manipulation"
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 resize-none text-white placeholder-gray-400 text-base touch-manipulation"
              placeholder="Describe your project"
              required
            />
          </div>

          {/* Image Upload - Mobile-friendly */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Project Image
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-gray-400 bg-gray-500/20'
                  : 'border-gray-500 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-sm text-gray-300 mb-2">Enter image URL</p>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent text-white placeholder-gray-400 text-base touch-manipulation"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Video URL
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-3 sm:py-4 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white placeholder-gray-400 text-base touch-manipulation"
              placeholder="https://youtube.com/watch?v=..."
              required
            />
            <p className="text-gray-400 text-sm mt-2">
              Supports YouTube, Vimeo, or direct video URLs
            </p>
          </div>

          {/* Mobile-Stacked Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 sm:py-4 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white text-base touch-manipulation"
                required
              >
                <option value="">Select category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Technologies
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-3 sm:py-4 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white placeholder-gray-400 text-base touch-manipulation"
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                SIH Code (Optional)
              </label>
              <input
                type="text"
                value={formData.hackathonCode}
                onChange={(e) => setFormData({ ...formData, hackathonCode: e.target.value })}
                className="w-full px-4 py-3 sm:py-4 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white placeholder-gray-400 text-base touch-manipulation"
                placeholder="SIH2024-001"
              />
            </div>
          </div>

          {/* Mobile-Friendly Controls */}
          <div className="space-y-4">
            {/* Featured Checkbox */}
            <div className="flex items-center justify-between p-4 glass rounded-lg border border-gray-600">
              <label htmlFor="featured" className="text-sm text-gray-300 font-medium">
                Mark as featured project
              </label>
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-gray-400 border-gray-600 rounded focus:ring-gray-400 glass touch-manipulation"
              />
            </div>
            
            {/* Star Rating - Mobile-friendly */}
            <div className="p-4 glass rounded-lg border border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300 font-medium">Importance Rating</span>
                <span className="text-sm text-gray-400">
                  {formData.stars}/8 stars
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, stars: star })}
                    className={`p-1 sm:p-2 rounded transition-colors duration-200 touch-manipulation ${
                      star <= formData.stars
                        ? 'text-yellow-400 hover:text-yellow-300'
                        : 'text-gray-600 hover:text-gray-500'
                    }`}
                  >
                    <Star 
                      className="w-4 h-4 sm:w-5 sm:h-5" 
                      fill={star <= formData.stars ? 'currentColor' : 'none'}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button - Touch-friendly */}
          <button
            type="submit"
            className="w-full bg-black border border-gray-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 touch-manipulation"
          >
            <Plus className="w-5 h-5" />
            {editingProject ? 'Update Project' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
};