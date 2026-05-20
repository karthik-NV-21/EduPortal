import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, Calculator, Atom, FlaskConical, Globe, Languages, MessageCircle,
  ChevronRight, PlayCircle, User, Settings as SettingsIcon, LogOut, Lock, 
  Mail, CheckCircle, ArrowLeft, Award, BookMarked, Camera, Trophy, Star, 
  Medal, ShieldCheck, GraduationCap, Sparkles, Share2, Info
} from 'lucide-react';

// === THEME CONFIGURATION (Greenish-Orange) ===
// We use Emerald and Orange tailwind colors to create the requested theme.
const subjects = [
  { id: 'math', name: 'Mathematics', icon: Calculator, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/50', description: 'Algebra, Geometry, Calculus and more.' },
  { id: 'physics', name: 'Physics', icon: Atom, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800/50', description: 'Mechanics, Thermodynamics, Electromagnetism.' },
  { id: 'chemistry', name: 'Chemistry', icon: FlaskConical, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-200 dark:border-teal-800/50', description: 'Organic, Inorganic, Physical Chemistry.' },
  { id: 'social', name: 'Social Studies', icon: Globe, color: 'text-amber-600 dark:text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/50', description: 'History, Geography, Civics, Economics.' },
  { id: 'english', name: 'English', icon: BookOpen, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800/50', description: 'Literature, Grammar, Composition.' },
  { id: 'second-lang', name: 'Second Language', icon: Languages, color: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-lime-900/20', border: 'border-lime-200 dark:border-lime-800/50', description: 'Telugu, Hindi, or Sanskrit.' },
];

// === CURRICULUM GENERATOR ===
const subjectTopics = {
  math: ['Algebra', 'Trigonometry', 'Geometry', 'Calculus Fundamentals', 'Statistics', 'Probability', 'Linear Algebra', 'Number Theory'],
  physics: ['Kinematics', 'Dynamics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Quantum Physics Intro', 'Relativity', 'Fluid Mechanics'],
  chemistry: ['Periodic Table', 'Chemical Bonding', 'Stoichiometry', 'Organic Chemistry', 'Thermodynamics', 'Kinetics', 'Equilibrium', 'Electrochemistry'],
  social: ['World War II', 'Global Markets', 'Ancient Civilizations', 'Modern History', 'Geography', 'Microeconomics', 'Macroeconomics', 'Civics'],
  english: ['Analyzing Literature', 'Essay Writing', 'Poetry', 'Grammar and Syntax', 'Creative Writing', 'Prose', 'Drama', 'Public Speaking'],
  'second-lang': ['Basic Greetings', 'Vocabulary Practice', 'Grammar Rules', 'Reading Comprehension', 'Conversational Skills', 'Writing Letters', 'Cultural Context', 'Listening Comprehension']
};

const getDynamicReading = (topic) => `# Comprehensive Guide: ${topic}\n\nWelcome to the detailed study module for ${topic}. Mastering this section is crucial for your overall success in the subject.\n\n## 1. Introduction and Core Principles\nThe study of ${topic} involves analyzing fundamental behaviors and established rules.\n* **Primary Axiom:** Always verify your initial conditions before applying advanced formulas.\n* **Secondary Rule:** Consistency in units and terms is vital.\n\n## 2. Essential Formulas and Applications\nHere are the critical mathematical and theoretical formulas you need to memorize:\n* **Basic Formula:** X = Y + Z\n* **Advanced Formula:** E = mc² (contextual equivalent for ${topic})\n* **Rate of Change:** Δy / Δx\n\n## 3. Real-World Applications\nUnderstanding ${topic} isn't just about passing tests. It applies to:\n* Engineering and architectural design.\n* Economic forecasting and market analysis.\n* Advanced scientific research and medical developments.\n\n## 4. Common Pitfalls to Avoid\n* **Pitfall 1:** Misinterpreting the negative signs in complex equations.\n* **Pitfall 2:** Forgetting to account for edge cases in your theoretical models.\n* **Pitfall 3:** Skipping the foundational steps when attempting mastery-level problems.\n\nTake careful notes on this material, as the quiz will test your understanding of both the formulas and their practical applications.`;

const getDynamicQuestions = (topic) => [
  {q: `What is the primary focus of ${topic}?`, options: ['Core fundamentals', 'Historical context', 'Theoretical frameworks', 'All of the above'], answer: 'All of the above'},
  {q: `Which of the following is a key formula related to ${topic}?`, options: ['X = Y + Z', 'A = πr²', 'F = ma', 'V = IR'], answer: 'X = Y + Z'},
  {q: `Why is understanding ${topic} important in real-world applications?`, options: ['It predicts outcomes', 'It is a graduation requirement', 'It looks good on a resume', 'None of the above'], answer: 'It predicts outcomes'},
  {q: `What is a common pitfall when studying ${topic}?`, options: ['Skipping foundational steps', 'Reading too much', 'Taking too many notes', 'Asking too many questions'], answer: 'Skipping foundational steps'},
  {q: `In the context of ${topic}, what does the "Secondary Rule" emphasize?`, options: ['Consistency in units', 'Ignoring constraints', 'Guessing answers', 'Speed over accuracy'], answer: 'Consistency in units'},
  {q: `How does ${topic} apply to modern research?`, options: ['It guides methodology', 'It provides funding', 'It replaces scientists', 'It is outdated'], answer: 'It guides methodology'},
  {q: `Which axiom is most critical when beginning a problem in ${topic}?`, options: ['Verify initial conditions', 'Always assume positive values', 'Ignore friction', 'Round to the nearest whole number'], answer: 'Verify initial conditions'},
  {q: `What represents the "Rate of Change" in our formulas?`, options: ['Δy / Δx', 'E = mc²', 'a² + b²', 'sin(θ)'], answer: 'Δy / Δx'},
  {q: `Which field benefits heavily from ${topic}?`, options: ['Engineering', 'Astrology', 'Alchemy', 'Phrenology'], answer: 'Engineering'},
  {q: `To master ${topic}, what is recommended at the end of the reading?`, options: ['Take careful notes', 'Skip the quiz', 'Memorize without understanding', 'Read it backwards'], answer: 'Take careful notes'}
];

const subjectDetails = {};
const fallbackVideos = [
  'https://www.youtube.com/embed/vA-Meb2q7yI?rel=0',
  'https://www.youtube.com/embed/PUB0TaZ7bCQ?rel=0',
  'https://www.youtube.com/embed/kKKM8Y-u7ds?rel=0',
  'https://www.youtube.com/embed/GfqN4L2u40c?rel=0',
  'https://www.youtube.com/embed/0RRVV4Diomg?rel=0'
];

Object.keys(subjectTopics).forEach(sub => {
  subjectDetails[sub] = [];
  for (let i = 1; i <= 8; i++) {
    const topic = subjectTopics[sub][i - 1];
    const videoUrl = fallbackVideos[i % fallbackVideos.length];
    subjectDetails[sub].push(
      { id: `${sub}_m${i}_v`, title: `${topic} Concepts`, duration: '45 min', type: 'video', videoUrl: videoUrl },
      { id: `${sub}_m${i}_r`, title: `${topic} Study Guide`, duration: '35 min', type: 'reading', content: getDynamicReading(topic) },
      { id: `${sub}_m${i}_q`, title: `${topic} Mastery Quiz`, duration: '25 min', type: 'quiz', questions: getDynamicQuestions(topic) }
    );
  }
});

// === MAIN APPLICATION COMPONENT ===
export default function App() {
  // Authentication & Global State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login'); 
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Database Simulation (In-Memory)
  const [usersDb, setUsersDb] = useState({
    'student@school.edu': { name: 'Demo Student', password: 'password123', email: 'student@school.edu', pic: null }
  });
  const [currentUser, setCurrentUser] = useState(null);
  
  // Login Form States
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authError, setAuthError] = useState('');

  // App Sub-states
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '' });

  // Refs for scrolling
  const editProfileRef = useRef(null);
  const changePasswordRef = useRef(null);

  // --- ACTIONS & HANDLERS ---

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setAuthError('');
    const email = e.target.email.value.toLowerCase();
    const password = e.target.password.value;

    if (authMode === 'signup') {
      const name = e.target.fullName.value;
      if (usersDb[email]) {
        setAuthError('An account with this email already exists.');
        return;
      }
      const newUser = { name, email, password, pic: null };
      setUsersDb({ ...usersDb, [email]: newUser });
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      setCurrentView('home');
      showToast('Account created successfully!');
    } else {
      const user = usersDb[email];
      if (!user) {
        setAuthError('Account not found. Please sign up.');
        return;
      }
      if (user.password !== password) {
        setAuthError('Incorrect password. Please try again.');
        return;
      }
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentView('home');
      showToast(`Welcome back, ${user.name}!`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('login');
    setSelectedSubject(null);
    setSelectedLesson(null);
    showToast('You have been logged out.');
  };

  const handleNavClick = (view) => {
    setCurrentView(view);
    setSelectedSubject(null);
    setSelectedLesson(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedLesson(null);
    setCurrentView('subject');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const newName = e.target.fullName.value;
    const newEmail = e.target.email.value.toLowerCase();
    
    // Update memory DB
    const updatedUser = { ...currentUser, name: newName, email: newEmail };
    const newDb = { ...usersDb };
    delete newDb[currentUser.email]; // remove old key if email changed
    newDb[newEmail] = updatedUser;
    
    setUsersDb(newDb);
    setCurrentUser(updatedUser);
    setIsEditingProfile(false);
    showToast('Profile updated successfully!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      const updatedUser = { ...currentUser, pic: imgUrl };
      setUsersDb({ ...usersDb, [currentUser.email]: updatedUser });
      setCurrentUser(updatedUser);
      showToast('Profile picture updated!');
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const currentPass = e.target.currentPassword.value;
    const newPass = e.target.newPassword.value;

    if (currentPass !== currentUser.password) {
      alert("Error: Current password is incorrect.");
      return;
    }

    const updatedUser = { ...currentUser, password: newPass };
    setUsersDb({ ...usersDb, [currentUser.email]: updatedUser });
    setCurrentUser(updatedUser);
    setIsChangingPassword(false);
    showToast('Password changed successfully!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerShare = (title) => {
    // Simulating copying to clipboard
    showToast(`Link to "${title}" copied to clipboard!`);
  };

  // --- RENDERERS ---

  const renderToast = () => (
    <div className={`fixed bottom-6 right-6 z-[100] transform transition-all duration-500 ease-out ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
      <div className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold">
        <CheckCircle className="text-emerald-500" size={24} />
        {toast.message}
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen flex transition-colors duration-300 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        
        {/* Left Side: Greenish-Orange Graphic Banner */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-orange-500 justify-center items-center shadow-2xl z-10">
          <div className="absolute top-20 left-20 text-white opacity-10 transform -rotate-12"><BookOpen size={160} /></div>
          <div className="absolute bottom-20 right-20 text-white opacity-10 transform rotate-12"><Atom size={200} /></div>
          
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white opacity-20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-300 opacity-30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 text-center px-16 text-white">
            <div className="bg-white/20 p-6 rounded-full inline-block backdrop-blur-md mb-8 border border-white/30 shadow-xl">
              <GraduationCap size={64} className="text-yellow-300 drop-shadow-lg" />
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight drop-shadow-md leading-tight">Empower Your Mind. <br/> Shape Your Future.</h1>
            <p className="text-xl text-emerald-50 font-medium leading-relaxed max-w-lg mx-auto">
              Access world-class education from anywhere. Join thousands of high school students learning interactively every single day.
            </p>
          </div>
        </div>

        {/* Right Side: Login/Signup Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24 relative z-10 bg-white dark:bg-gray-900">
          <div className="mx-auto w-full max-w-md">
            
            <div className="text-center mb-10">
              <div className="lg:hidden mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-3">
                {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-lg text-gray-500 font-medium">
                {authMode === 'login' ? 'Please enter your credentials to access your dashboard.' : 'Sign up to start your educational journey.'}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 py-10 px-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              {authError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 font-bold text-sm flex items-center">
                  <Info className="mr-2 flex-shrink-0" size={18} /> {authError}
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleAuth}>
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-bold mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                      <input name="fullName" type="text" required className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="John Doe" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                    <input name="email" type="email" required defaultValue={authMode === 'login' ? 'student@school.edu' : ''} className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                    <input name="password" type="password" required defaultValue={authMode === 'login' ? 'password123' : ''} className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="••••••••" />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 px-4 rounded-xl shadow-lg font-black text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 transition-all transform hover:-translate-y-1">
                  {authMode === 'login' ? 'Sign In Securely' : 'Register Account'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderToast()}
    </div>
  );

  const renderHome = () => (
    <div className="max-w-7xl mx-auto p-6 relative z-10 animate-in fade-in duration-500">
      <header className="mb-12 relative overflow-hidden bg-gradient-to-r from-emerald-600 to-orange-500 dark:from-emerald-800 dark:to-orange-700 rounded-3xl py-14 px-6 shadow-2xl text-white transform hover:scale-[1.01] transition-transform duration-500">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <Sparkles className="absolute top-6 right-8 text-yellow-300 opacity-50 animate-pulse" size={32} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/30 shadow-lg">
              <Award size={48} className="text-yellow-300 drop-shadow-md" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-md">
            Welcome back, {currentUser?.name.split(' ')[0]}!
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Continue your learning journey. Select a subject below to dive into your interactive lessons and quizzes.
          </p>
        </div>
      </header>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black flex items-center">
          <BookMarked className="mr-3 text-emerald-500" /> Your Subjects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <div 
            key={subject.id}
            onClick={() => handleSubjectClick(subject)}
            className={`${subject.bg} border border-gray-100 dark:border-gray-800 rounded-3xl shadow-md p-8 cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden bg-white dark:bg-gray-800`}
          >
            <div className={`absolute -right-6 -bottom-6 opacity-5 group-hover:scale-125 transition-transform duration-700 ${subject.color}`}>
              <subject.icon size={180} />
            </div>
            <div className={`w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 shadow-inner flex items-center justify-center mb-6 ${subject.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10`}>
              <subject.icon size={32} />
            </div>
            <h2 className="text-2xl font-black mb-3 relative z-10">{subject.name}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 line-clamp-2 h-12 relative z-10 font-medium">{subject.description}</p>
            <div className="flex items-center text-sm font-black tracking-wide uppercase mt-auto relative z-10">
              <span className={subject.color}>Explore Subject</span>
              <ChevronRight size={18} className={`ml-1 ${subject.color} group-hover:translate-x-1 transition-transform`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubjectView = () => {
    if (!selectedSubject) return null;
    if (selectedLesson) return renderLesson(); // This crucial line was missing!
    
    const lessons = subjectDetails[selectedSubject.id] || [];
    
    return (
      <div className="max-w-5xl mx-auto p-6 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        <button onClick={() => setCurrentView('home')} className="flex items-center text-gray-500 hover:text-emerald-600 mb-6 font-bold bg-white dark:bg-gray-800 py-2.5 px-5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 w-max hover:-translate-x-1 transition-transform">
          <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
        </button>

        <div className={`relative overflow-hidden rounded-3xl shadow-lg p-10 mb-10 ${selectedSubject.bg}`}>
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 mix-blend-overlay">
            <selectedSubject.icon size={300} />
          </div>
          <div className="flex items-center relative z-10">
             <div className={`w-24 h-24 bg-white dark:bg-gray-900 rounded-3xl shadow-lg flex items-center justify-center mr-8 ${selectedSubject.color}`}>
              <selectedSubject.icon size={48} />
            </div>
            <div>
              <h1 className="text-5xl font-black mb-3 drop-shadow-sm text-gray-900 dark:text-white">{selectedSubject.name}</h1>
              <p className="text-xl font-medium text-gray-700 dark:text-gray-300">{selectedSubject.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black flex items-center">
              <BookMarked className="mr-3 text-emerald-500" /> Curriculum
            </h2>
            <span className="font-bold bg-gray-100 dark:bg-gray-900 px-4 py-1.5 rounded-full shadow-inner">
              8 Modules
            </span>
          </div>
          
          <div className="space-y-4">
            {lessons.map((lesson, idx) => (
              <div 
                key={lesson.id} 
                onClick={() => { 
                  setSelectedLesson(lesson); 
                  setQuizAnswers({}); 
                  setQuizSubmitted(false); 
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-emerald-300 hover:shadow-lg bg-gray-50/50 dark:bg-gray-800/50 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-200 dark:bg-gray-700 group-hover:bg-emerald-500 transition-colors"></div>
                <div className="flex items-center mb-4 sm:mb-0 pl-4">
                  <div className="mr-6 text-gray-400 group-hover:scale-110 transition-transform bg-white dark:bg-gray-900 p-4 rounded-full shadow-sm">
                    {lesson.type === 'video' && <PlayCircle size={28} className="text-blue-500" />}
                    {lesson.type === 'quiz' && <MessageCircle size={28} className="text-emerald-500" />}
                    {lesson.type === 'reading' && <BookOpen size={28} className="text-orange-500" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Module {Math.floor(idx / 3) + 1}</span>
                      <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-md shadow-sm ${
                        lesson.type === 'video' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40' :
                        lesson.type === 'quiz' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40' :
                        'bg-orange-100 text-orange-700 dark:bg-orange-900/40'
                      }`}>{lesson.type}</span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-emerald-600 transition-colors">{lesson.title}</h3>
                  </div>
                </div>
                <div className="flex items-center text-sm font-bold text-gray-500 bg-white dark:bg-gray-900 px-5 py-2.5 rounded-xl ml-16 sm:ml-0 shadow-sm">
                  {lesson.duration}
                  <ChevronRight size={18} className="ml-3 group-hover:text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLesson = () => {
    if (!selectedLesson) return null;

    return (
      <div className="max-w-4xl mx-auto p-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => setSelectedLesson(null)} className="flex items-center text-gray-500 hover:text-emerald-600 font-bold bg-white dark:bg-gray-800 py-2.5 px-5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:-translate-x-1 transition-transform">
            <ArrowLeft size={18} className="mr-2" /> Back to Curriculum
          </button>
          <button onClick={() => triggerShare(selectedLesson.title)} className="flex items-center text-gray-600 dark:text-gray-300 font-bold bg-gray-100 dark:bg-gray-800 py-2.5 px-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Share2 size={18} className="mr-2" /> Share Lesson
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className={`p-10 border-b border-gray-100 dark:border-gray-700 relative ${selectedSubject.bg}`}>
            <div className="mb-5 inline-flex items-center bg-white dark:bg-gray-900 px-5 py-2 rounded-full font-black shadow-md uppercase tracking-widest relative z-10">
              <span className={`mr-2.5 ${selectedSubject.color}`}>
                {selectedLesson.type === 'video' && <PlayCircle size={18} />}
                {selectedLesson.type === 'quiz' && <MessageCircle size={18} />}
                {selectedLesson.type === 'reading' && <BookOpen size={18} />}
              </span>
              {selectedLesson.type} • {selectedLesson.duration}
            </div>
            <h2 className="text-4xl font-black relative z-10">{selectedLesson.title}</h2>
          </div>

          <div className="p-6 sm:p-10">
            {selectedLesson.type === 'video' && (
              <div className="w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                {selectedLesson.videoUrl ? (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={selectedLesson.videoUrl}
                    title={selectedLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <PlayCircle size={64} className="mb-4" /> <p className="font-bold">Video unavailable</p>
                  </div>
                )}
              </div>
            )}

            {selectedLesson.type === 'reading' && (
              <div className="prose prose-lg dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800/80 p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-inner">
                {selectedLesson.content?.split('\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) return <h3 key={idx} className="text-2xl font-black mt-12 mb-5 text-emerald-600 flex items-center"><ChevronRight size={24} className="mr-2 text-emerald-400"/> {paragraph.replace('## ', '')}</h3>;
                  if (paragraph.startsWith('# ')) return <h2 key={idx} className="text-4xl font-black mb-10 border-b-2 pb-4 border-gray-200 dark:border-gray-700">{paragraph.replace('# ', '')}</h2>;
                  if (paragraph.startsWith('* ')) {
                    const content = paragraph.replace('* ', '').split(/(`.*?`|\*\*.*?\*\*)/).map((p, i) => {
                      if (p.startsWith('`')) return <code key={i} className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded-md font-mono text-sm border border-emerald-200 dark:border-emerald-800/50 shadow-sm">{p.slice(1, -1)}</code>;
                      if (p.startsWith('**')) return <strong key={i} className="font-black">{p.slice(2, -2)}</strong>;
                      return p;
                    });
                    return <li key={idx} className="ml-8 mb-4 list-disc font-medium text-lg leading-relaxed">{content}</li>;
                  }
                  if (!paragraph.trim()) return null;
                  const formatted = paragraph.split(/(`.*?`|\*\*.*?\*\*)/).map((p, i) => {
                    if (p.startsWith('`')) return <code key={i} className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded-md font-mono text-sm border border-emerald-200 dark:border-emerald-800/50 shadow-sm">{p.slice(1, -1)}</code>;
                    if (p.startsWith('**')) return <strong key={i} className="font-black">{p.slice(2, -2)}</strong>;
                    return p;
                  });
                  return <p key={idx} className="mb-6 text-lg font-medium leading-relaxed">{formatted}</p>;
                })}
              </div>
            )}

            {selectedLesson.type === 'quiz' && (
              <div className="space-y-8">
                {selectedLesson.questions?.map((q, qIndex) => (
                  <div key={qIndex} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-md">
                    <h3 className="font-black text-xl mb-6 flex items-start"><span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">{qIndex + 1}</span> <span>{q.q}</span></h3>
                    <div className="space-y-4 pl-12">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = quizAnswers[qIndex] === opt;
                        let optClass = "flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ";
                        if (quizSubmitted) {
                          if (opt === q.answer) optClass += "bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-900/20";
                          else if (isSelected && opt !== q.answer) optClass += "bg-red-50 border-red-500 text-red-900 dark:bg-red-900/20";
                          else optClass += "border-gray-100 dark:border-gray-700 opacity-40";
                        } else {
                          optClass += isSelected ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 transform scale-[1.01]" : "border-gray-200 dark:border-gray-700 hover:border-emerald-300";
                        }
                        return (
                          <div key={optIndex} className={optClass} onClick={() => !quizSubmitted && setQuizAnswers({...quizAnswers, [qIndex]: opt})}>
                            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'border-emerald-500' : 'border-gray-300'}`}>
                              {isSelected && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                            </div>
                            <span className="text-lg font-bold">{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                <div className="pt-8 mt-8 border-t-2 border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 p-6 rounded-3xl">
                  {!quizSubmitted ? (
                    <>
                      <span className="font-bold text-gray-500 mb-4 sm:mb-0">Answered: {Object.keys(quizAnswers).length} / {selectedLesson.questions?.length}</span>
                      <button onClick={() => setQuizSubmitted(true)} className="px-8 py-4 bg-emerald-600 text-white font-black text-lg rounded-2xl hover:bg-emerald-700 transition-all shadow-lg hover:-translate-y-1 disabled:opacity-50" disabled={Object.keys(quizAnswers).length !== selectedLesson.questions?.length}>
                        Submit Answers
                      </button>
                    </>
                  ) : (
                    <div className="w-full p-6 bg-emerald-50 border-2 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 font-black flex justify-between items-center">
                      <div className="flex items-center text-xl"><CheckCircle size={32} className="mr-4" /> Quiz Submitted!</div>
                      <div className="bg-white dark:bg-gray-900 px-6 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 text-2xl">
                        Score: {Object.keys(quizAnswers).filter(k => quizAnswers[k] === selectedLesson.questions[k].answer).length} / {selectedLesson.questions?.length}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto p-6 relative z-10 animate-in fade-in duration-500">
      <div className="flex justify-end mb-4">
        <button onClick={() => triggerShare('My Student Profile')} className="flex items-center text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 py-2 px-4 rounded-full hover:bg-emerald-100 transition-colors">
          <Share2 size={16} className="mr-2" /> Share Profile
        </button>
      </div>
      <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="h-48 w-full bg-gradient-to-r from-emerald-500 to-orange-500 relative">
           <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="px-8 pb-8 pt-0 flex flex-col sm:flex-row items-center sm:items-end gap-6 relative -mt-20">
          <div className="relative group">
            {currentUser?.pic ? (
              <img src={currentUser.pic} alt="Profile" className="w-40 h-40 rounded-full object-cover border-8 border-white dark:border-gray-800 shadow-xl bg-white" />
            ) : (
              <div className="w-40 h-40 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-8 border-white dark:border-gray-800 shadow-xl relative z-10">
                <User size={64} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-grow text-center sm:text-left mb-2">
            <h3 className="text-4xl font-black mb-1">{currentUser?.name}</h3>
            <p className="text-gray-500 text-lg mb-3 font-bold">{currentUser?.email}</p>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-black bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm">
              <CheckCircle size={16} className="mr-2" /> Active Student
            </span>
          </div>
        </div>
      </div>
      
      <h3 className="text-3xl font-black mb-8 flex items-center"><Award className="mr-3 text-orange-500" size={32} /> Academic Dashboard</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="flex justify-between items-end mb-8">
            <div><h4 className="font-black text-2xl">Course Progress</h4><p className="text-gray-500 font-bold">Overall Completion</p></div>
            <span className="text-4xl text-emerald-600 font-black">68%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 mb-8 shadow-inner overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-4 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <div className="space-y-6">
            {['Mathematics:85:blue', 'Physics:40:orange', 'English:90:rose'].map(item => {
              const [name, val, col] = item.split(':');
              return (
                <div key={name}>
                  <div className="flex justify-between text-sm mb-2 font-bold"><span className="text-gray-700 dark:text-gray-300">{name}</span><span className={`text-${col}-500`}>{val}%</span></div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 shadow-inner"><div className={`bg-${col}-500 h-2.5 rounded-full`} style={{ width: `${val}%` }}></div></div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg flex flex-col">
          <div className="flex justify-between items-end mb-8">
            <div><h4 className="font-black text-2xl">Assignments</h4><p className="text-gray-500 font-bold">Completed this semester</p></div>
            <span className="text-4xl text-orange-500 font-black">24<span className="text-xl text-gray-400">/35</span></span>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800/50 mb-6 flex-grow">
            <h5 className="text-sm font-black text-orange-700 dark:text-orange-400 mb-4 uppercase tracking-widest flex items-center"><Trophy size={18} className="mr-2"/> Recent Badges</h5>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center bg-white dark:bg-gray-900 px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"><Star size={20} className="text-yellow-500 mr-2" fill="currentColor" /><span className="text-sm font-bold">Math Whiz</span></div>
              <div className="flex items-center bg-white dark:bg-gray-900 px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"><Medal size={20} className="text-emerald-500 mr-2" fill="currentColor" /><span className="text-sm font-bold">Perfect Score</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-4xl mx-auto p-6 relative z-10 animate-in fade-in duration-300">
      <h2 className="text-4xl font-black mb-8 flex items-center"><SettingsIcon className="mr-4 text-emerald-500" size={36}/> Account Settings</h2>
      
      {isEditingProfile && (
        <div ref={editProfileRef} className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-10 border border-emerald-100 dark:border-emerald-900 mb-10 border-t-8 border-t-emerald-500">
          <h3 className="text-2xl font-black mb-8 border-b-2 pb-4 border-gray-100 dark:border-gray-700">Edit Profile Details</h3>
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="relative inline-block">
              {currentUser?.pic ? <img src={currentUser.pic} alt="Profile Preview" className="w-28 h-28 rounded-full object-cover border-4 border-emerald-100 shadow-md" /> : <div className="w-28 h-28 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-md"><User size={48} className="text-gray-400" /></div>}
              <label htmlFor="picUpload" className="absolute bottom-0 right-0 bg-emerald-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-emerald-700 hover:scale-110 transition-all ring-4 ring-white dark:ring-gray-800"><Camera size={18} /></label>
              <input id="picUpload" type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
            </div>
            <div><h4 className="font-bold text-xl mb-1">Profile Picture</h4><p className="text-gray-500 font-medium">Upload a new avatar (JPEG or PNG).</p></div>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div><label className="block text-sm font-bold mb-2">Full Name</label><input name="fullName" type="text" required defaultValue={currentUser?.name} className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:border-emerald-500 outline-none font-bold text-lg shadow-sm" /></div>
            <div><label className="block text-sm font-bold mb-2">Email Address</label><input name="email" type="email" required defaultValue={currentUser?.email} className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:border-emerald-500 outline-none font-bold text-lg shadow-sm" /></div>
            <div className="flex gap-4 pt-6"><button type="submit" className="px-8 py-3.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-black shadow-lg">Save Changes</button><button type="button" onClick={() => setIsEditingProfile(false)} className="px-8 py-3.5 border-2 border-gray-300 rounded-xl font-black">Cancel</button></div>
          </form>
        </div>
      )}

      {isChangingPassword && (
        <div ref={changePasswordRef} className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-10 border border-orange-100 dark:border-orange-900 mb-10 border-t-8 border-t-orange-500">
          <h3 className="text-2xl font-black mb-8 border-b-2 pb-4 border-gray-100 dark:border-gray-700">Change Password</h3>
          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            <div><label className="block text-sm font-bold mb-2">Current Password</label><input name="currentPassword" type="password" required className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:border-orange-500 outline-none font-bold text-lg shadow-sm" /></div>
            <div><label className="block text-sm font-bold mb-2">New Password</label><input name="newPassword" type="password" required className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus:border-orange-500 outline-none font-bold text-lg shadow-sm" /></div>
            <div className="flex gap-4 pt-6"><button type="submit" className="px-8 py-3.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-black shadow-lg">Update Password</button><button type="button" onClick={() => setIsChangingPassword(false)} className="px-8 py-3.5 border-2 border-gray-300 rounded-xl font-black">Cancel</button></div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-700">
        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
          <div className="flex items-center justify-between py-8 px-2">
            <div><h4 className="text-xl font-black mb-1">Dark Mode</h4><p className="text-gray-500 font-medium">Toggle dark appearance for the portal.</p></div>
            <label className="relative inline-flex items-center cursor-pointer ml-6">
              <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
              <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600 shadow-inner"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-8 px-2">
            <div><h4 className="text-xl font-black mb-1 flex items-center">Two-Factor Authentication {is2FAEnabled && <ShieldCheck size={20} className="ml-3 text-emerald-500" />}</h4><p className="text-gray-500 font-medium">Extra layer of security.</p></div>
            <button onClick={() => { setIs2FAEnabled(!is2FAEnabled); showToast(is2FAEnabled ? '2FA Disabled' : '2FA Enabled'); }} className={`px-6 py-3 border-2 font-black rounded-xl transition-all shadow-sm ${is2FAEnabled ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-700 border-gray-300'}`}>{is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}</button>
          </div>
        </div>

        <div className="mt-6 pt-8 pb-4 border-t-2 border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-center bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl">
          <button onClick={() => { setIsChangingPassword(true); setIsEditingProfile(false); setTimeout(() => changePasswordRef.current?.scrollIntoView({behavior: 'smooth'}), 100); }} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 font-black py-3 px-6 rounded-xl shadow-sm hover:shadow-md hover:border-orange-300 transition-all">Change Password</button>
          <button onClick={() => { setIsEditingProfile(true); setIsChangingPassword(false); setTimeout(() => editProfileRef.current?.scrollIntoView({behavior: 'smooth'}), 100); }} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 font-black py-3 px-6 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">Edit Profile Settings</button>
        </div>
      </div>
    </div>
  );

  // === RENDER TREE ===
  if (!isLoggedIn) return renderLogin();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen font-sans flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 selection:bg-emerald-200 selection:text-emerald-900">
        
        {/* Navigation Bar - IMPORTANT: High z-index to ensure it's always clickable */}
        <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-[100] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center relative">
            <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2.5 rounded-xl mr-3 shadow-md group-hover:shadow-lg transition-all"><BookOpen className="text-white" size={24} /></div>
              <span className="text-2xl font-black tracking-tight hidden sm:block">EduPortal</span>
            </div>
            
            {/* Nav Buttons Container */}
            <div className="flex items-center space-x-1 sm:space-x-3 text-sm font-black text-gray-600 dark:text-gray-300 relative z-[101]">
              <button onClick={() => handleNavClick('profile')} className={`flex items-center px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 transition-all cursor-pointer ${currentView === 'profile' ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30' : ''}`}>
                {currentUser?.pic ? <img src={currentUser.pic} alt="Profile" className="w-7 h-7 rounded-full sm:mr-2 object-cover border-2 border-emerald-200" /> : <User size={20} className="sm:mr-2" />}
                <span className="hidden sm:inline">Profile</span>
              </button>
              <button onClick={() => handleNavClick('settings')} className={`flex items-center px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-600 transition-all cursor-pointer ${currentView === 'settings' ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30' : ''}`}>
                <SettingsIcon size={20} className="sm:mr-2" /> <span className="hidden sm:inline">Settings</span>
              </button>
              <div className="h-8 w-[2px] bg-gray-200 dark:bg-gray-700 mx-1 sm:mx-2 rounded-full"></div>
              <button onClick={handleLogout} className="flex items-center px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-all">
                <LogOut size={20} className="sm:mr-2" /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Dynamic Content */}
        <main className="py-10 flex-grow relative z-10">
          {currentView === 'home' && renderHome()}
          {currentView === 'subject' && renderSubjectView()}
          {currentView === 'profile' && renderProfile()}
          {currentView === 'settings' && renderSettings()}
        </main>
        
        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 relative z-[90]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-gray-500 font-bold text-sm">
            <p className="flex items-center"><BookOpen size={16} className="mr-2"/> © 2026 EduPortal High School Project.</p>
            <p className="mt-4 sm:mt-0 flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full shadow-inner">
              Logged in as: <span className="text-emerald-600 ml-2">{currentUser?.name}</span>
            </p>
          </div>
        </footer>
      </div>
      {renderToast()}
    </div>
  );
}