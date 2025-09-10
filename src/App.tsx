import React, { useState, useEffect } from 'react';
import { Search, Plus, Code2, Users, Star, TrendingUp, LogOut, Lock, User, Phone, X, Shield, MessageCircle, Sparkles, Menu, Home, Info, Briefcase, FolderOpen, Mail } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectUpload } from './components/ProjectUpload';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ShareModal } from './components/ShareModal';
import { SearchBar } from './components/SearchBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { Project } from './types';
import { useProjects } from './hooks/useProjects';
import { useSearch } from './hooks/useSearch';
import { useDebounce } from './hooks/useDebounce';
import { signInWithOTP, verifyOTP, signOut } from './lib/supabase';

type Page = 'home' | 'about' | 'services' | 'projects' | 'contact';

function App() {
  const { projects, loading, error, addProject, updateProject, deleteProject } = useProjects();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Use intelligent search hook
  const { searchResults, isSearching, searchStats } = useSearch({
    projects,
    searchTerm: debouncedSearchTerm,
    selectedCategory
  });
  
  const [showUpload, setShowUpload] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [sharingProject, setSharingProject] = useState<Project | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState<'phone' | 'otp'>('phone');
  const [authForm, setAuthForm] = useState({ 
    phone: '', 
    otp: '', 
    error: '', 
    isLoading: false,
    otpSent: false 
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Header scroll state
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Host credentials
  const HOST_PHONE = '6361064550';
  const GENERATED_OTP = '664477';

  // Navigation items
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsHeaderVisible(true);
      }
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setIsHeaderVisible(false);
        setShowMobileMenu(false); // Close mobile menu when hiding header
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY]);
  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('devcode_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }

    // Check for shared project in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedProjectId = urlParams.get('project');
    if (sharedProjectId && projects.length > 0) {
      const sharedProject = projects.find(p => p.id === sharedProjectId);
      if (sharedProject) {
        setSelectedProject(sharedProject);
        setShowProjectDetail(true);
        setCurrentPage('projects');
      }
    }
  }, [projects]);

  const handleAddProject = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const result = await addProject(projectData);
    if (result.success) {
      setShowUpload(false);
    } else {
      alert(result.error || 'Failed to add project. Please ensure Supabase is connected.');
    }
  };

  const handleEditProject = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    if (editingProject) {
      const result = await updateProject(editingProject.id, projectData);
      if (result.success) {
        setEditingProject(null);
        setShowUpload(false);
      } else {
        alert(result.error || 'Failed to update project. Please ensure Supabase is connected.');
      }
    }
  };

  const handleDeleteProject = async (project: Project) => {
    const result = await deleteProject(project.id);
    if (!result.success) {
      alert(result.error || 'Failed to delete project. Please ensure Supabase is connected.');
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  const handleShareProject = (project: Project) => {
    setSharingProject(project);
    setShowShare(true);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthForm(prev => ({ ...prev, isLoading: true, error: '' }));

    const result = await signInWithOTP(authForm.phone);
    
    if (result.success) {
      setAuthForm(prev => ({ 
        ...prev, 
        isLoading: false, 
        otpSent: true 
      }));
      setAuthStep('otp');
    } else {
      setAuthForm(prev => ({ 
        ...prev, 
        error: 'This phone number is not authorized for admin access.',
        isLoading: false 
      }));
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthForm(prev => ({ ...prev, isLoading: true, error: '' }));

    const result = await verifyOTP(authForm.phone, authForm.otp);
    
    if (result.success) {
      setIsAuthenticated(true);
      localStorage.setItem('devcode_auth', 'authenticated');
      setShowAuth(false);
      setAuthForm({ phone: '', otp: '', error: '', isLoading: false, otpSent: false });
      setAuthStep('phone');
    } else {
      setAuthForm(prev => ({ 
        ...prev, 
        error: 'Invalid OTP. Please check and try again.',
        isLoading: false 
      }));
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsAuthenticated(false);
    localStorage.removeItem('devcode_auth');
    setShowMobileMenu(false);
  };

  const handleAuthClose = () => {
    setShowAuth(false);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setShowMobileMenu(false);
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update URL without page reload
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-element absolute top-20 left-4 w-20 h-20 bg-white/5 rounded-full blur-xl sm:w-32 sm:h-32 sm:left-10"></div>
          <div className="floating-element absolute top-40 right-4 w-32 h-32 bg-gray-500/10 rounded-full blur-xl sm:w-48 sm:h-48 sm:right-20" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="text-center z-10 px-4">
          <div className="premium-loader mb-6">
            <div className="loader-ring"></div>
            <div className="loader-ring loader-ring-2"></div>
            <div className="loader-center">
              <Code2 className="w-6 h-6 text-white sm:w-8 sm:h-8" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white neon-glow fade-in-up">
              projxty
            </h2>
            <p className="text-base sm:text-lg text-white/80 fade-in-up" style={{ animationDelay: '0.3s' }}>
              Loading amazing projects...
            </p>
            <div className="flex justify-center space-x-2 fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="loading-dot"></div>
              <div className="loading-dot" style={{ animationDelay: '0.2s' }}></div>
              <div className="loading-dot" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-red-200 max-w-md w-full">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mx-auto mb-4">
            <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Database Connection Required</h2>
          <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
          <p className="text-gray-600 text-xs sm:text-sm mb-6">Click the "Connect to Supabase" button in the top-right corner to enable database functionality.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">What you'll get with Supabase:</h3>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
              <li>• Projects persist after page refresh</li>
              <li>• Real-time updates across devices</li>
              <li>• Secure admin authentication</li>
              <li>• Scalable to 100+ projects</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-4 w-20 h-20 bg-white/5 rounded-full blur-xl sm:w-32 sm:h-32 sm:left-10"></div>
        <div className="floating-element absolute top-40 right-4 w-32 h-32 bg-gray-500/10 rounded-full blur-xl sm:w-48 sm:h-48 sm:right-20" style={{ animationDelay: '2s' }}></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl sm:w-40 sm:h-40" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation Header */}
      <header className={`glass border-b border-gray-700 fixed top-0 left-0 right-0 z-40 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-black border border-gray-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg">
                <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Projxty
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id as Page)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-white text-black font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            
            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {/* Admin Status */}
              {isAuthenticated && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium glass text-gray-300 border border-gray-600">
                  <Shield className="w-3 h-3" />
                  Admin
                </div>
              )}
              
              {/* Desktop Auth */}
              <div className="hidden sm:flex items-center space-x-3">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 glass rounded-lg hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="p-3 bg-black border border-gray-600 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
                    title="Login"
                  >
                    <Code2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 bg-black border border-gray-600 text-white rounded-lg hover:bg-gray-900 transition-all duration-300"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {showMobileMenu && isHeaderVisible && (
            <div className="lg:hidden border-t border-gray-700 py-4 space-y-2">
              {/* Navigation Items */}
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id as Page)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-white text-black font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-700">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 mb-2">
                      <Shield className="w-4 h-4" />
                      Admin Mode Active
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white transition-all duration-300 glass rounded-lg hover:bg-white/10"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuth(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-3 bg-black border border-gray-600 text-white rounded-lg hover:bg-gray-900 transition-all duration-300"
                  >
                    <Code2 className="w-5 h-5" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="relative pt-16 sm:pt-20">
        {currentPage === 'home' && (
          <HomePage 
            projects={projects}
            onNavigateToProjects={() => handleNavigate('projects')}
            onProjectClick={handleProjectClick}
            onShareProject={handleShareProject}
          />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'projects' && (
          <ProjectsPage
            projects={searchResults}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            isSearching={isSearching}
            searchStats={searchStats}
            isAuthenticated={isAuthenticated}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onProjectClick={handleProjectClick}
            onShareProject={handleShareProject}
            onEditProject={(project) => {
              setEditingProject(project);
              setShowUpload(true);
            }}
            onDeleteProject={handleDeleteProject}
            onAddProject={() => {
              setEditingProject(null);
              setShowUpload(true);
            }}
          />
        )}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* WhatsApp Contact Button */}
<div className="fixed bottom-4 right-4 z-50 flex flex-col items-center space-y-2">
  {/* Animated Text */}
  <div className="relative h-6 overflow-hidden">
    <span className="absolute animate-pingText text-white text-sm font-medium">Ping me</span>
    <span className="absolute animate-pingText text-white text-sm font-medium" style={{ animationDelay: '2s' }}>DM me</span>
    <span className="absolute animate-pingText text-white text-sm font-medium" style={{ animationDelay: '4s' }}>Message me</span>
  </div>

  {/* WhatsApp Button */}
  <a
    href="https://wa.me/916361064550?text=Hi! I'm interested in your projects and would like to connect."
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 touch-manipulation"
    title="Contact on WhatsApp"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
</div>


      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl shadow-2xl w-full max-w-sm border border-gray-600">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-black border border-gray-600 p-2 rounded-lg">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Login</h2>
              </div>
              <button
                onClick={handleAuthClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 touch-manipulation"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {authStep === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="p-4 sm:p-6">
                <div className="mb-6">
                  <p className="text-gray-300 text-sm mb-6 text-center">
                    Enter your registered phone number to receive OTP
                  </p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={authForm.phone}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, phone: e.target.value, error: '' }))}
                        className="w-full pl-10 pr-4 py-4 glass border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 text-base"
                        placeholder="Enter phone number"
                        required
                        disabled={authForm.isLoading}
                      />
                    </div>
                  </div>
                  
                  {authForm.error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                      <p className="text-red-200 text-sm flex items-center gap-2">
                        <X className="w-4 h-4" />
                        {authForm.error}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={authForm.isLoading}
                  className="w-full bg-black border border-gray-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 touch-manipulation"
                >
                  {authForm.isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Phone className="w-5 h-5" />
                      Send OTP
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="p-4 sm:p-6">
                <div className="mb-6">
                  <p className="text-gray-300 text-sm mb-6 text-center">
                    Enter the 6-digit OTP sent to {authForm.phone}
                  </p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-2">OTP Code</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={authForm.otp}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, otp: e.target.value, error: '' }))}
                        className="w-full pl-10 pr-4 py-4 glass border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 text-center text-lg tracking-widest text-white placeholder-gray-400"
                        placeholder="000000"
                        maxLength={6}
                        required
                        disabled={authForm.isLoading}
                      />
                    </div>
                  </div>
                  
                  {authForm.error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                      <p className="text-red-200 text-sm flex items-center gap-2">
                        <X className="w-4 h-4" />
                        {authForm.error}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={authForm.isLoading}
                    className="w-full bg-black border border-gray-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 touch-manipulation"
                  >
                    {authForm.isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <User className="w-5 h-5" />
                        Verify OTP
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setAuthStep('phone')}
                    className="w-full text-gray-400 hover:text-white py-3 transition-colors touch-manipulation"
                  >
                    ← Back to phone number
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Project Upload Modal */}
      {showUpload && (
        <ProjectUpload
          isOpen={showUpload}
          onClose={() => {
            setShowUpload(false);
            setEditingProject(null);
          }}
          onSubmit={editingProject ? handleEditProject : handleAddProject}
          editingProject={editingProject}
        />
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={showProjectDetail}
        onClose={() => {
          setShowProjectDetail(false);
          setSelectedProject(null);
        }}
        onShare={handleShareProject}
        isAdmin={isAuthenticated}
      />

      {/* Share Modal */}
      <ShareModal
        project={sharingProject}
        isOpen={showShare}
        onClose={() => {
          setShowShare(false);
          setSharingProject(null);
        }}
      />
    </div>
  );
}

export default App;