import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Project } from '../types';

interface ShareModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ project, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !project) return null;

  const projectUrl = `${window.location.origin}?project=${encodeURIComponent(project.id)}`;
  const shareText = `Check out this amazing project: "${project.title}" - ${project.description.slice(0, 100)}...`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = projectUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${projectUrl}`)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(projectUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(projectUrl)}`
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl shadow-2xl w-full max-w-md border border-gray-600">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-black border border-gray-600 p-2 rounded-lg">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Share Project</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
          >
            <X className="w-5 h-5 text-white/60 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Preview */}
          <div className="glass rounded-lg p-4 border border-gray-600">
            <div className="flex gap-3">
              <img
                src={project.image}
                alt={project.title}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                loading="eager"
                decoding="async"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm truncate">{project.title}</h3>
                <p className="text-gray-300 text-xs mt-1 line-clamp-2">{project.description}</p>
                <div className="flex gap-1 mt-2">
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="px-2 py-0.5 bg-gray-700 text-gray-400 rounded text-xs">
                      +{project.technologies.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Project Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={projectUrl}
                readOnly
                className="flex-1 px-3 py-2 glass border border-gray-600 rounded-lg text-white text-sm bg-gray-800/50"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-black border border-gray-600 text-white hover:bg-gray-900'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Options */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">Share on Social Media</label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${option.color} text-white p-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  <option.icon className="w-5 h-5" />
                  {option.name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-gray-700">
            <p className="text-gray-400 text-xs text-center mb-3">
              Share this project to showcase amazing work!
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 border border-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};