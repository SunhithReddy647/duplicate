import React from 'react';
import { Code2, Smartphone, Brain, Shield, Palette, Cloud, Database, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Full-stack web applications using modern frameworks like React, Vue, Angular, and Node.js.',
      features: ['Responsive Design', 'Progressive Web Apps', 'E-commerce Solutions', 'API Development'],
      color: 'from-blue-600 to-purple-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android platforms.',
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment'],
      color: 'from-green-600 to-teal-600'
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions using cutting-edge AI and ML technologies.',
      features: ['Predictive Analytics', 'Computer Vision', 'Natural Language Processing', 'Deep Learning'],
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.',
      features: ['Security Audits', 'Penetration Testing', 'Vulnerability Assessment', 'Security Training'],
      color: 'from-red-600 to-orange-600'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      color: 'from-pink-600 to-rose-600'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions.',
      features: ['AWS/Azure/GCP', 'DevOps', 'Microservices', 'Container Orchestration'],
      color: 'from-cyan-600 to-blue-600'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We understand your requirements, goals, and challenges through detailed consultation.'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'We create a comprehensive project plan with timelines, milestones, and deliverables.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Our team builds your solution using agile methodologies and best practices.'
    },
    {
      step: '04',
      title: 'Testing',
      description: 'Rigorous testing ensures quality, performance, and security of your solution.'
    },
    {
      step: '05',
      title: 'Deployment',
      description: 'We deploy your solution and provide ongoing support and maintenance.'
    }
  ];

  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="slide-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 neon-glow">
              Our <span className="gradient-text-fire">Services</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Comprehensive technology solutions tailored to your business needs. 
              From concept to deployment, we've got you covered.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="slide-in group glass rounded-2xl p-8 border border-gray-600 hover:shadow-2xl hover:shadow-gray-500/20 transition-all duration-500 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-200 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-xl text-gray-300">How we deliver exceptional results, every time</p>
          </div>
          
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            
            <div className="space-y-12 lg:space-y-16">
              {process.map((step, index) => (
                <div
                  key={index}
                  className={`slide-in flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Content */}
                  <div className="flex-1 lg:max-w-md">
                    <div className="glass rounded-2xl p-8 border border-gray-600 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300">
                      <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Step Number */}
                  <div className="relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-2xl lg:text-3xl font-bold text-white">{step.step}</span>
                    </div>
                    {/* Connector for mobile */}
                    {index < process.length - 1 && (
                      <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2 top-full w-1 h-12 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Spacer for desktop */}
                  <div className="hidden lg:block flex-1 lg:max-w-md"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-300">Cutting-edge tools and frameworks for modern solutions</p>
          </div>
          
          <div className="glass rounded-2xl p-6 sm:p-8 border border-gray-600">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                'React', 'Vue.js', 'Angular', 'Next.js', 'TypeScript', 'JavaScript',
                'Node.js', 'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot',
                'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase',
                'AWS', 'Azure', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch',
                'React Native', 'Flutter', 'Swift', 'Kotlin', 'Figma', 'Tailwind CSS',
                'Git', 'GitHub', 'Jest', 'Cypress', 'Webpack', 'Vite'
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-lg px-3 py-2 text-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <span className="text-gray-200 font-medium text-sm">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mb-20">
          <div className="glass rounded-2xl p-8 sm:p-12 border border-gray-600">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl w-fit mx-auto mb-6">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/916361064550?text=Hi! I'd like to discuss a project with your team."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <Database className="w-5 h-5" />
                Start Your Project
              </a>
              <button className="inline-flex items-center gap-3 glass border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <ArrowRight className="w-5 h-5" />
                View Our Work
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};