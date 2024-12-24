import React from 'react';
import { ChevronLeft, Github, Linkedin, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 relative">
      {/* Stylish Circular Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 w-10 h-10 flex items-center justify-center rounded-full 
                 bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 
                 hover:bg-white/90 hover:scale-110 
                 active:scale-95
                 transition-all duration-200 ease-in-out 
                 group z-50"
      >
        <ChevronLeft 
          className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" 
          strokeWidth={2.5}
        />
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
            About Me and the Idea
          </h1>
          
          <div className="prose prose-lg prose-gray">
            <p className="text-gray-700 leading-relaxed mb-6">
              Hi, I'm <span className="font-semibold text-gray-900">Karan Bairwa</span>, a passionate full-stack developer with 1.5 years of experience in the MERN stack.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Last week, I found myself stuck in a frustrating cycle. I was actively applying for jobs, but the process was draining. Each application felt like a repetitive chore—finding an email address, opening Gmail, pasting it, crafting a message, attaching my resume, and sending it. Over and over again.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              It was exhausting. The worst part? It was eating into my precious sleep time—and I refuse to compromise on sleep! That's when a thought struck me: <span className="font-semibold text-gray-900">Why not simplify this process?</span>
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Being a developer, I turned my frustration into motivation. I decided to build something to fix this. That's how <span className="font-semibold text-gray-900">"Kaleshnashaya"</span> was born—a tool designed to eliminate the repetitive grind of job applications.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Here's how it works: Once you sign up, update your profile, and create your email content template, you're ready to go. From there, applying becomes effortless. All you need to do is enter the recipient's email address and hit send. No need to rewrite the same content or repeat steps—it's that simple!
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              With <span className="font-semibold text-gray-900">Kaleshnashaya</span>, I transformed my application process. Earlier, I could only apply to 10 companies in a day. Now, I can apply to 30 in the same amount of time. This isn't just a time-saver—it's a life-saver!
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              The best part? It gave me my time back. I now have more hours to learn new skills and focus on things that matter.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-12">
              If you're tired of the repetitive grind of job applications, give <span className="font-semibold text-gray-900">Kaleshnashaya</span> a try. It might just simplify your life the way it did mine. And if you have suggestions or feedback, feel free to email me—I'd love to hear from you!
            </p>

            {/* Contact Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Let's Connect</h2>
              <div className="flex flex-col gap-2">
                <a 
                  href="mailto:karanbairwa111@gmail.com"
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg">karanbairwa111@gmail.com</span>
                </a>
                
                <a 
                  href="https://github.com/kratos7777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-purple-50 transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <span className="text-lg">github.com/kratos7777</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/karan-bairwa-509513197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="text-lg">linkedin.com/in/karan-bairwa</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;