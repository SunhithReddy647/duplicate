import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Globe, Award, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate structured WhatsApp message
    const whatsappMessage = `
*New Contact Form Submission - Projxty*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Project Type:* ${formData.projectType || 'Not specified'}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

---
Sent from Projxty Contact Form
    `.trim();
    
    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/916361064550?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        projectType: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 6361064550',
      description: 'Available 24/7 for urgent inquiries',
      action: 'tel:+916361064550'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+91 6361064550',
      description: 'Quick responses via WhatsApp',
      action: 'https://wa.me/916361064550?text=Hi! I\'d like to discuss a project.'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'projxty@gmail.com',
      description: 'For detailed project discussions',
      action: 'mailto:projxty@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bangalore, India',
      description: 'Serving clients globally',
      action: null
    }
  ];

  const projectTypes = [
    'Web Development',
    'Mobile App Development',
    'AI/ML Solutions',
    'Blockchain Development',
    'UI/UX Design',
    'Cybersecurity',
    'Cloud Solutions',
    'Other'
  ];

  const features = [
    { icon: Clock, title: 'Quick Response', description: 'We respond within 2 hours' },
    { icon: Globe, title: 'Global Reach', description: 'Serving clients worldwide' },
    { icon: Award, title: 'Expert Team', description: '5+ years of experience' },
    { icon: CheckCircle, title: 'Quality Assured', description: '100% satisfaction guarantee' }
  ];

  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="slide-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 neon-glow">
              Contact <span className="gradient-text-fire">Projxty</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="slide-in glass rounded-2xl p-6 border border-gray-600 text-center hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-black border border-gray-600 p-4 rounded-xl w-fit mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                  <p className="text-white font-medium mb-2">{info.value}</p>
                  <p className="text-gray-300 text-sm mb-4">{info.description}</p>
                  {info.action && (
                    <a
                      href={info.action}
                      target={info.action.startsWith('http') ? '_blank' : undefined}
                      rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
                    >
                      Contact Now
                      <Send className="w-3 h-3" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section className="slide-in">
            <div className="glass rounded-2xl p-8 border border-gray-600">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-600 p-4 rounded-full w-fit mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent to WhatsApp!</h3>
                  <p className="text-gray-300">Your message has been formatted and sent to our WhatsApp. We'll respond shortly!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white placeholder-gray-400"
                        placeholder="Your full name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white placeholder-gray-400"
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white"
                        disabled={isSubmitting}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="bg-gray-800">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 text-white placeholder-gray-400"
                        placeholder="Project subject"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 glass border border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 resize-none text-white placeholder-gray-400"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black border border-gray-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Preparing WhatsApp Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send via WhatsApp
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Additional Info */}
          <section className="slide-in space-y-8" style={{ animationDelay: '200ms' }}>
            {/* Why Choose Us */}
            <div className="glass rounded-2xl p-8 border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-black border border-gray-600 p-2 rounded-lg flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="glass rounded-2xl p-8 border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-6">Need Immediate Help?</h3>
              <p className="text-gray-300 mb-6">
                For urgent inquiries or quick questions, reach out to us directly via WhatsApp or phone.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/916361064550?text=Hi! I need immediate help with my project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Now
                </a>
                <a
                  href="tel:+916361064550"
                  className="w-full glass border border-gray-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="glass rounded-2xl p-8 border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-6">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-white font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Saturday</span>
                  <span className="text-white font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-white font-medium">Emergency Only</span>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <p className="text-gray-300 text-sm">
                    <Clock className="w-4 h-4 inline mr-2" />
                    All times are in Indian Standard Time (IST)
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};