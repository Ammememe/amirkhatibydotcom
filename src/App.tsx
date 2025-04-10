import React, { useState, Suspense, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import ChatBox from './components/ChatBox';
import DemoComputer from './components/DemoComputer';
import CanvasLoader from './components/CanvasLoader';
import ThemeToggle from './components/ThemeToggle';
import { education, experience, projects } from './constants';
import { Linkedin, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTheme } from './context/ThemeContext';

type SectionKey = 'about' | 'experience' | 'projects' | 'education' | 'contact';

interface Section {
  title: string;
  content: React.ReactNode;
}

type SectionType = Record<SectionKey, Section>;

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<SectionKey>('about');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = projects[currentProjectIndex];

  // Add effect to scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  // Add form state and handlers for EmailJS
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  
  // Add notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: ''
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('QWGnqFF4WUiFaFh8q');
  }, []);

  // Handle input changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        'service_y97v6pb',
        'template_ddp5pmk',
        formRef.current as HTMLFormElement,
        'QWGnqFF4WUiFaFh8q'
      );
      
      setLoading(false);
      console.log('SUCCESS!', result.status, result.text);
      
      // Show success notification
      setNotification({
        show: true,
        type: 'success',
        message: 'Message sent successfully!'
      });
      
      // Reset form
      setForm({
        name: '',
        email: '',
        message: ''
      });
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
      
    } catch (error) {
      setLoading(false);
      console.log('FAILED...', error);
      
      // Show error notification
      setNotification({
        show: true,
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const sections: SectionType = {
    about: {
      title: theme === 'light' ? "Amir Khatiby" : "Amir Khatiby",
      content: (
        <div className="space-y-4 max-w-2xl mx-auto text-center">
          <div className={`relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 ${theme === 'light' ? 'border-orange-500' : 'border-blue-500'} shadow-xl`}>
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className={`absolute inset-0 border-4 ${theme === 'light' ? 'border-orange-500' : 'border-blue-500'} rounded-full`}
            ></motion.div>
            <img
              src="/images/Amir.png"
              alt="Amir Khatiby"
              className="absolute w-full h-full object-cover object-top"
              style={{ transform: 'translateX(10px) translateY(5%) scale(1.17)' }}
            />
          </div>
          {theme === 'light' ? (
            <p className="text-lg text-black">
              Jag är en Cloud/DevOps utvecklare med ett stort intresse för att bygga stabila och effektiva system i molnet. För mig handlar molnteknologi om mer än bara verktyg – det är ett sätt att skapa lösningar som är enkla att hantera, anpassa och utveckla. Jag har erfarenhet av att bygga och distribuera applikationer samt API:er och strävar alltid efter att optimera systemen för hög tillgänglighet, skalbarhet och kostnadseffektivitet.
            </p>
          ) : (
            <p className="text-lg text-white">
              I am a Cloud/DevOps Developer with an interest in building efficient and reliable systems in the cloud. For me, cloud technology is more than just a set of tools – it's a way to create solutions that are easy to manage, adapt, and scale. I have experience in developing and deploying applications and APIs, and I always strive to optimize systems for high availability, scalability, and cost-efficiency.
            </p>
          )}
          {theme === 'light' ? (
            <p className="text-lg text-black">
              Som problemlösare är jag uthållig och noggrann. Jag vill förstå utmaningar på djupet och hitta lösningar som inte bara fungerar för stunden, utan som är hållbara och framtidssäkra. Om jag inte har svaret direkt, ser jag till att ta reda på det genom att analysera, testa och lära mig.
            </p>
          ) : (
            <p className="text-lg text-white">
              As a problem solver, I am resilient and thorough. I aim to understand challenges at their core and find solutions that are not just quick fixes but sustainable and future-proof. If I don't have the answer right away, I'll find it – by analyzing, testing, and learning.
            </p>
          )}
          {theme === 'light' ? (
            <p className="text-lg text-black">
              Jag har aldrig väntat på att framgång ska komma till mig. Som ung var jag en introvert och hade svårt att uttrycka mig, så jag började arbetade inom försäljning och blev bättre på att kommunicera. Jag ville spela gitarr, så jag övade – nu kan jag spela spanska melodier. Jag ville rita porträtt, så jag lärde mig – nu kan jag fånga ansikten och uttryck med en penna.
            </p>
          ) : (
            <p className="text-lg text-white">
              I've never waited for success to come to me. When I was younger, I was introverted and found it hard to express myself, so I started working in sales and learned how to communicate effectively. I wanted to play the guitar, so I practiced – now I can play Spanish melodies. I wanted to draw portraits, so I learned – now I can capture faces and expressions with a pencil.
            </p>
          )}
          {theme === 'light' ? (
            <p className="text-lg text-black">
              
            </p>
          ) : (
            <p className="text-lg text-white">
              I value continuous development and always strive to improve. My greatest strength is not just my creativity, but my ability to reflect, adapt, and persist. I see my mistakes, I learn from them, and I never give up until I've found the right solution.
            </p>
          )}
        </div>
      )
    },
    experience: {
      title: theme === 'light' ? "Erfarenhet" : "Experience",
      content: (
        <div className={`w-full ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          <div className="max-w-4xl mx-auto sm:py-10 py-5 sm:px-5 px-2.5">
            {experience.map((item, index) => (
              <div key={index} className={`bg-transparent hover:bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 group transition-all duration-300 border border-transparent hover:border-white/10`}>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full overflow-hidden mb-4 border-2 ${theme === 'light' ? 'border-orange-500/50 group-hover:border-orange-500' : 'border-blue-500/50 group-hover:border-blue-500'} transition-all duration-300`}>
                      <img className="w-full h-full object-cover" src={item.icon} alt={item.name} />
                    </div>
                    <div className={`w-0.5 h-16 ${theme === 'light' ? 'bg-orange-500/50 group-hover:bg-orange-500' : 'bg-blue-500/50 group-hover:bg-blue-500'} transition-all duration-300`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-bold text-xl ${theme === 'light' ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'} transition-all duration-300`}>{item.name}</p>
                    <p className={`text-sm mb-3 ${theme === 'light' ? 'text-gray-600 group-hover:text-gray-800' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                      {item.pos} -- <span>{item.duration}</span>
                    </p>
                    
                    <p className={`${theme === 'light' ? 'text-gray-700 group-hover:text-black' : 'text-gray-500 group-hover:text-white'} transition-all duration-300 mb-3`}>{item.title}</p>
                    
                    {/* Display bullet points if they exist */}
                    {item.bulletPoints && (
                      <ul className="mt-2 space-y-2">
                        {(() => {
                          // Use type assertion to handle the theme comparison
                          const isLightTheme = theme as string === 'light';
                          const pointsToDisplay = isLightTheme && item.bulletPointsSv 
                            ? item.bulletPointsSv 
                            : item.bulletPoints;
                          
                          return pointsToDisplay.map((point, idx) => (
                            <li key={idx} className={`flex items-start ${isLightTheme ? 'text-gray-700 group-hover:text-black' : 'text-gray-500 group-hover:text-white'} transition-all duration-300`}>
                              <span className={`inline-block w-2 h-2 rounded-full ${isLightTheme ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                              <span>{point}</span>
                            </li>
                          ));
                        })()}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    projects: {
      title: theme === 'light' ? "Projekt" : "Projects",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className={`bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-xl relative overflow-hidden ${theme === 'light' ? 'bg-spotlight1' : 'bg-spotlight2'}`}>
            <div className="flex flex-col gap-5 relative z-10">
              <div className={`flex flex-col gap-5 ${theme === 'light' ? 'text-black' : 'text-white'} my-5`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold mb-2">{currentProject.title}</h3>
                  {/* Live/Besök button for projects with live links */}
                  {currentProject.liveLink && (
                    <a
                      href={currentProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-2 py-1 rounded-lg transition-colors text-sm ${
                        theme === 'light'
                          ? 'bg-green-500/20 text-green-800 hover:bg-green-500/30'
                          : 'bg-green-500/20 text-green-100 hover:bg-green-500/30'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                      {theme === 'light' ? 'Besök' : 'Live'}
                    </a>
                  )}
                </div>
                
                {/* Display bullet points */}
                <ul className="space-y-2 mb-4">
                  {theme === 'light' ? (
                    // Swedish bullet points for light mode
                    <>
                      {currentProject.title === "Workout API" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Eftersom jag inte kunde hitta ett befintligt API som uppfyllde kraven för ett kommande projekt, utvecklade jag mitt eget.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>API:et, byggt med Golang och MySQL, inkluderar över 1 000 övningar kategoriserade efter användarens erfarenhetsnivå, utrustning, muskelgrupp och mer.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Varje övning innehåller två bilder hämtade från en URL inom en S3-bucket.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>API:et och databasen är hostade på Kubernetes via Ingress, enligt en mikrotjänstarkitektur.</span>
                          </li>
                        </>
                      )}
                      {currentProject.title === "Portfolio Website" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Utvecklade en responsiv webbplats med React, TypeScript och Tailwind CSS för att visa mina projekt och erfarenheter.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Implementerade en interaktiv 3D-scen med Three.js och React Three Fiber för att skapa en unik användarupplevelse.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Skapade en dynamisk chattfunktion med EmailJS för att möjliggöra direktkommunikation med besökare.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Implementerade ett tema-växlingssystem för att stödja både ljust och mörkt läge.</span>
                          </li>
                        </>
                      )}
                      {currentProject.title === "Cloud Infrastructure" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Designade och implementerade en skalbar molninfrastruktur med AWS-tjänster som EC2, S3, RDS och Lambda.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Konfigurerade CI/CD-pipelines med GitHub Actions för automatiserad driftsättning och testning.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Implementerade övervakning och loggning med CloudWatch för att säkerställa systemets hälsa och prestanda.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Använde Infrastructure as Code (Terraform) för att hantera och versionera molnresurser.</span>
                          </li>
                        </>
                      )}
                      {currentProject.title === "Database Migration" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Planerade och genomförde en sömlös migrering av en produktionsdatabas från en lokal server till AWS RDS.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Implementerade replikering och backup-strategier för att säkerställa dataintegritet och affärskontinuitet.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Optimerade databasprestanda genom att analysera och förbättra frågor och indexering.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Utvecklade dokumentation och utbildningsmaterial för teamet om den nya databasinfrastrukturen.</span>
                          </li>
                        </>
                      )}
                      {currentProject.title === "Security Implementation" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Utvecklade och implementerade en omfattande säkerhetsstrategi för att skydda känslig kunddata.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Konfigurerade AWS WAF och Shield för att skydda webbapplikationer från vanliga säkerhetshot.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Implementerade kryptering i vila och under överföring för att säkerställa datasäkerhet.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Utförde säkerhetsgranskningar och sårbarhetsbedömningar för att identifiera och åtgärda potentiella risker.</span>
                          </li>
                        </>
                      )}
                      {currentProject.title === "Microservices Architecture" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Designade och implementerade en mikrotjänstarkitektur för att förbättra skalbarhet och underhållbarhet.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Containeriserade tjänster med Docker och orkestrerade dem med Kubernetes för effektiv hantering.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Implementerade API Gateway-mönster för att hantera autentisering, auktorisering och routning.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Utvecklade en service discovery-lösning för att underlätta kommunikation mellan tjänster.</span>
                          </li>
                        </>
                      )}
                      {currentProject.title === "Card Counting ML" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Högpresterande objektidentifieringsmodell för spelkort.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Uppnådde precision och återkallning med en mAP@0.5 på 0.946 med YOLOv11 för realtidsidentifiering av kort.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Ger en 2-3% fördel i Blackjack genom exakt kortspårning.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Framtida arbete inkluderar integration av modellen med Raspberry Pi och AWS SNS & Lambda för realtidskorträkning.</span>
                          </li>
                        </>
                      )}
                      {currentProject.title === "BrainyGainyAI.com" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Utvecklade ett API för att integrera Groks bild- och textfunktioner i min AI-wrapper.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Byggt på AWS Lambda och API Gateway för att möjliggöra förfrågningar till Groks tjänster.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Implementerade säker autentisering och datalagring med AWS Cognito och DynamoDB.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Skapade ett användarvänligt gränssnitt för sömlös interaktion med AI-tjänster.</span>
                          </li>
                        </>
                      )}
                      {currentProject.title === "SwipeToFit.com" && (
                        <>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Utvecklade en JavaScript-webbapp med Tailwind CSS som integrerade mitt tränings-API.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Inspirerad av Tinder, användare väljer sin erfarenhet och föredragen muskelgrupp, sveper genom träningspass.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Implementerade säkra användarsessioner via JWT-tokens med AWS Cognito för autentisering.</span>
                          </li>
                          <li className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                            <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                            <span>Driftsatt på Kubernetes för hög tillgänglighet och enkel underhåll.</span>
                          </li>
                        </>
                      )}
                    </>
                  ) : (
                    // Original English bullet points for dark mode
                    currentProject.bulletPoints.map((point, idx) => (
                      <li key={idx} className={`flex items-start ${theme === 'light' ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                        <span className={`inline-block w-2 h-2 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                        <span>{point}</span>
                      </li>
                    ))
                  )}
                </ul>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 ${theme === 'light' ? 'bg-orange-500/30 text-orange-800' : 'bg-blue-500/30 text-blue-100'} rounded-full text-sm`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-7 z-10">
                <button 
                  onClick={handlePrevProject}
                  className={`px-4 py-2 ${theme === 'light' ? 'bg-orange-500/30 hover:bg-orange-500/50' : 'bg-blue-500/30 hover:bg-blue-500/50'} rounded-lg transition-colors`}
                >
                  {theme === 'light' ? 'Föregående' : 'Previous'}
                </button>
                <button 
                  onClick={handleNextProject}
                  className={`px-4 py-2 ${theme === 'light' ? 'bg-orange-500/30 hover:bg-orange-500/50' : 'bg-blue-500/30 hover:bg-blue-500/50'} rounded-lg transition-colors`}
                >
                  {theme === 'light' ? 'Nästa' : 'Next'}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-[650px] lg:h-[750px]">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 8, 27]} fov={70} />
              <ambientLight intensity={1.0} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <pointLight position={[-5, -5, -5]} intensity={0.8} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group scale={6} position={[0, -3.5, 2]} rotation={[0, -0.1, 0]}>
                    <DemoComputer 
                      texture={currentProject.spotlightImage} 
                    />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
            </Canvas>
          </div>
        </div>
      )
    },
    education: {
      title: theme === 'light' ? "Utbildning" : "Education",
      content: (
        <div className={`w-full ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          <div className="max-w-4xl mx-auto sm:py-10 py-5 sm:px-5 px-2.5">
            {education.map((item, index) => (
              <div key={index} className={`bg-transparent hover:bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 group transition-all duration-300 border border-transparent hover:border-white/10`}>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full overflow-hidden mb-4 border-2 ${theme === 'light' ? 'border-orange-500/50 group-hover:border-orange-500' : 'border-blue-500/50 group-hover:border-blue-500'} transition-all duration-300`}>
                      <img className="w-full h-full object-cover" src={item.icon} alt={item.name} />
                    </div>
                    <div className={`w-0.5 h-16 ${theme === 'light' ? 'bg-orange-500/50 group-hover:bg-orange-500' : 'bg-blue-500/50 group-hover:bg-blue-500'} transition-all duration-300`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-bold text-xl ${theme === 'light' ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'} transition-all duration-300`}>
                      {theme === 'light' ? item.nameSv : item.name}
                    </p>
                    <p className={`text-sm mb-3 ${theme === 'light' ? 'text-gray-600 group-hover:text-gray-800' : 'text-gray-400 group-hover:text-gray-300'} transition-all duration-300`}>
                      {theme === 'light' ? item.posSv : item.pos} -- <span>{item.duration}</span>
                    </p>
                    <p className={`${theme === 'light' ? 'text-gray-700 group-hover:text-black' : 'text-gray-500 group-hover:text-white'} transition-all duration-300 mb-3`}>
                      {theme === 'light' ? item.titleSv : item.title}
                    </p>
                    
                    {/* Display bullet points if they exist */}
                    {item.bulletPoints && (
                      <ul className="mt-2 space-y-2">
                        {(() => {
                          // Use type assertion to handle the theme comparison
                          const isLightTheme = theme as string === 'light';
                          const pointsToDisplay = isLightTheme && item.bulletPointsSv 
                            ? item.bulletPointsSv 
                            : item.bulletPoints;
                          
                          return pointsToDisplay.map((point, idx) => (
                            <li key={idx} className={`flex items-start ${isLightTheme ? 'text-gray-700 group-hover:text-black' : 'text-gray-500 group-hover:text-white'} transition-all duration-300`}>
                              <span className={`inline-block w-2 h-2 rounded-full ${isLightTheme ? 'bg-orange-500' : 'bg-white'} mr-2 mt-2 flex-shrink-0`}></span>
                              <span>{point}</span>
                            </li>
                          ));
                        })()}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    contact: {
      title: theme === 'light' ? "Kontakt" : "Contact",
      content: (
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
              <div>
                <label htmlFor="name" className={`block text-lg font-medium mb-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{theme === 'light' ? 'Namn' : 'Name'}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 ${theme === 'light' ? 'focus:ring-orange-400 text-black' : 'focus:ring-blue-400 text-white'} text-lg`}
                  placeholder={theme === 'light' ? 'Ditt namn' : 'Your name'}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-lg font-medium mb-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{theme === 'light' ? 'E-post' : 'Email'}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 ${theme === 'light' ? 'focus:ring-orange-400 text-black' : 'focus:ring-blue-400 text-white'} text-lg`}
                  placeholder={theme === 'light' ? 'Din.email@exempel.com' : 'your.email@example.com'}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className={`block text-lg font-medium mb-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{theme === 'light' ? 'Meddelande' : 'Message'}</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 ${theme === 'light' ? 'focus:ring-orange-400 text-black' : 'focus:ring-blue-400 text-white'} text-lg`}
                  placeholder={theme === 'light' ? 'Ditt meddelande...' : 'Your message...'}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${theme === 'light' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'} text-white py-3 rounded-lg transition-colors text-lg font-medium`}
              >
                {loading ? (theme === 'light' ? 'Skickar...' : 'Sending...') : (theme === 'light' ? 'Skicka Meddelande' : 'Send Message')}
              </button>
            </form>
          </div>
          <div className="mt-8 text-center">
            <p className={`text-xl ${theme === 'light' ? 'text-black' : 'text-white'}`}>{theme === 'light' ? 'Eller kontakta mig direkt:' : 'Or reach out directly:'}</p>
            <p className="mt-3">
              <a href="mailto:Amir_khatiby@hotmail.com" className={`${theme === 'light' ? 'text-orange-500 hover:text-orange-600' : 'text-blue-400 hover:text-blue-300'} hover:underline text-lg`}>Amir_khatiby@hotmail.com</a>
            </p>
            <p className="mt-3">
              <a href="https://www.linkedin.com/in/amir-khatiby-49163a155/" target="_blank" rel="noopener noreferrer" className={`${theme === 'light' ? 'text-orange-500 hover:text-orange-600' : 'text-blue-400 hover:text-blue-300'} hover:underline text-lg flex items-center justify-center`}>
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn Profile
              </a>
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className={`min-h-screen font-['Rubik'] ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <Scene />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <ThemeToggle />
      
      {/* Notification Component */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-6 h-6 mr-2" />
            ) : (
              <XCircle className="w-6 h-6 mr-2" />
            )}
            <span className="font-['Rubik']">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="min-h-[60vh] flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl"
            >
              <h1 className={`text-4xl font-bold mb-12 text-center font-['Rubik'] ${theme === 'light' ? 'text-orange-500' : 'text-white'}`}>
                {sections[activeSection].title}
              </h1>
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 0.5 }}
                  className={`h-1 rounded-full ${theme === 'light' ? 'bg-orange-500' : 'bg-blue-500'}`}
                ></motion.div>
              </div>
              {sections[activeSection].content}
            </motion.div>
          </AnimatePresence>
        </div>

        <ChatBox />
      </div>
    </div>
  );
}

export default App;