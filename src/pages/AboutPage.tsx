import React from 'react';
import { Code2, Users, Target, Award, Lightbulb, Rocket, Heart, Star } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const achievements = [
    { icon: Code2, title: '50+ Projects', description: 'Successfully delivered across various domains' },
    { icon: Users, title: '100+ Clients', description: 'Satisfied customers worldwide' },
    { icon: Award, title: '5+ Years', description: 'Experience in software development' },
    { icon: Star, title: '4.9/5 Rating', description: 'Average client satisfaction score' }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions.'
    },
    {
      icon: Target,
      title: 'Quality',
      description: 'Every project is crafted with attention to detail and adherence to best practices.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in every line of code we write.'
    },
    {
      icon: Rocket,
      title: 'Growth',
      description: 'We help businesses scale and grow through technology solutions.'
    }
  ];

  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="slide-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 neon-glow">
              About <span className="gradient-text-fire">Projxty</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              We're a passionate team of developers, designers, and innovators dedicated to creating 
              exceptional digital experiences that make a difference.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded with a vision to bridge the gap between innovative ideas and practical solutions, 
                  Projxty has grown from a small startup to a trusted technology partner for businesses worldwide.
                </p>
                <p>
                  Our journey began with a simple belief: that great software should not only solve problems 
                  but also inspire and delight users. This philosophy drives everything we do, from the initial 
                  concept to the final deployment.
                </p>
                <p>
                  Today, we're proud to have delivered over 50 successful projects across various industries, 
                  helping our clients achieve their goals through the power of technology.
                </p>
              </div>
            </div>
            
            <div className="slide-in" style={{ animationDelay: '200ms' }}>
              <div className="glass rounded-2xl p-8 border border-gray-600">
                <div className="bg-black border border-gray-600 p-4 rounded-xl w-fit mx-auto mb-6">
                  <Code2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Our Mission</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  To empower businesses and individuals with innovative technology solutions that 
                  drive growth, efficiency, and success in the digital age.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-300">Numbers that speak for our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="slide-in glass rounded-2xl p-6 border border-gray-600 text-center hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-black border border-gray-600 p-4 rounded-xl w-fit mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{achievement.title}</h3>
                  <p className="text-gray-300 text-sm">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that guide our work and relationships</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="slide-in glass rounded-2xl p-8 border border-gray-600 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-black border border-gray-600 p-3 rounded-xl flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300">The talented individuals behind our success</p>
          </div>
          
          <div className="glass rounded-2xl p-8 sm:p-12 border border-gray-600 text-center">
            <div className="bg-black border border-gray-600 p-6 rounded-2xl w-fit mx-auto mb-6">
              <Users className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Growing Team of Experts</h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              Our diverse team brings together expertise in full-stack development, UI/UX design, 
              mobile app development, AI/ML, blockchain, and cybersecurity. We're always looking 
              for passionate individuals to join our mission.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm font-medium border border-gray-600">
                Full-Stack Developers
              </span>
              <span className="px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm font-medium border border-gray-600">
                UI/UX Designers
              </span>
              <span className="px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm font-medium border border-gray-600">
                AI/ML Engineers
              </span>
              <span className="px-4 py-2 bg-gray-800 text-gray-200 rounded-full text-sm font-medium border border-gray-600">
                DevOps Specialists
              </span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="glass rounded-2xl p-8 sm:p-12 border border-gray-600">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Work Together?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your ideas to life with innovative technology solutions.
            </p>
            <a
              href="https://wa.me/916361064550?text=Hi! I'd like to discuss a project with your team."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <Heart className="w-5 h-5" />
              Let's Connect
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FGE095VZMR"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FGE095VZMR');
</script>