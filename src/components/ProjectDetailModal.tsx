import React from 'react';
import { X, MessageCircle, Tag, Sparkles, Star, Play, Share2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onShare?: (project: Project) => void;
  isAdmin?: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  onShare,
  isAdmin = false
}) => {
  const [showVideo, setShowVideo] = React.useState(false);
  const [isVideoLoading, setIsVideoLoading] = React.useState(false);

  if (!isOpen || !project) return null;

  const handleContactClick = () => {
    const message = `Hi! I'm interested in your project "${project.title}". I'd like to know more about it.`;
    const whatsappUrl = `https://wa.me/916361064550?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getEmbedUrl = (url: string) => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    
    // Direct video file
    return url;
  };

  const handleVideoToggle = () => {
    if (!showVideo) {
      setIsVideoLoading(true);
      setShowVideo(true);
      // Simulate loading time for better UX
      setTimeout(() => setIsVideoLoading(false), 1000);
    } else {
      setShowVideo(false);
      setIsVideoLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-600">
        {/* Mobile-Optimized Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-black border border-gray-600 p-2 rounded-lg">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Project Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300 touch-manipulation"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 hover:text-white" />
          </button>
        </div>

        {/* Mobile-First Content Layout */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Project Title and Badges */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {project.featured && (
                  <div className="inline-flex items-center gap-2 bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-600">
                    <Sparkles className="w-4 h-4" />
                    Featured
                  </div>
                )}
                
                {isAdmin && (
                  <div className="inline-flex items-center gap-2 bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    <span>{project.stars}/8</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile-First Media Section */}
            <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-video group">
              {showVideo ? (
                <div className="relative w-full h-full">
                  {isVideoLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        <p className="text-white text-sm">Loading video...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') || project.videoUrl.includes('vimeo.com') ? (
                        <iframe
                          src={getEmbedUrl(project.videoUrl)}
                          className="w-full h-full rounded-xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={project.title}
                        />
                      ) : (
                        <video
                          src={project.videoUrl}
                          className="w-full h-full object-cover rounded-xl"
                          controls
                          autoPlay
                          title={project.title}
                        />
                      )}
                    </>
                  )}
                  
                  {/* Close Video Button - Touch-friendly */}
                  <button
                    onClick={handleVideoToggle}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 sm:p-3 bg-black/80 hover:bg-black text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-600 touch-manipulation"
                    title="Close video"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Play Button - Touch-friendly */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVideoToggle();
                      }}
                      className="bg-black/80 hover:bg-black text-white p-4 sm:p-6 rounded-full transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-gray-600 shadow-2xl touch-manipulation"
                      title="Play project video"
                    >
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" fill="currentColor" />
                    </button>
                  </div>
                  
                  {/* Video Available Indicator */}
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/80 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg backdrop-blur-sm border border-gray-600">
                    <Play className="w-3 h-3" />
                    Video
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            {/* Technologies - Mobile-friendly layout */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {/* SIH Code Badge - Prominent display */}
                {project.hackathonCode && (
                  <span className="px-3 sm:px-4 py-2 bg-orange-600 text-orange-100 rounded-lg text-sm font-semibold border border-orange-500 flex items-center gap-2">
                    🏆 SIH: {project.hackathonCode}
                  </span>
                )}
                
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gray-800 text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-700 hover:text-white transition-all duration-300 border border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Info - Mobile-stacked layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Tag className="w-4 h-4" />
                  Category
                </div>
                <p className="text-white font-medium">{project.category}</p>
              </div>
              
              <div className="glass rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                  <Tag className="w-4 h-4" />
                  Created
                </div>
                <p className="text-white font-medium">{project.createdAt}</p>
              </div>
            </div>

            {/* Mobile-Optimized Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleContactClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Developer
              </button>
              
              {onShare && (
                <button
                  onClick={() => onShare(project)}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 border border-gray-600 transform hover:scale-105 touch-manipulation"
                >
                  <Share2 className="w-5 h-5" />
                  Share Project
                </button>
              )}
            </div>

            {/* Project Highlights - Mobile-friendly */}
            <div className="glass rounded-xl p-4 border border-gray-600">
              <h4 className="text-white font-semibold mb-3">Project Highlights</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></span>
                  Built with modern technologies
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></span>
                  Production-ready implementation
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></span>
                  Responsive and user-friendly design
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></span>
                  Video demonstration available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};