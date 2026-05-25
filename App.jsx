import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { 
  BookOpen, User, Settings, LogOut, PlayCircle, 
  FileText, CheckCircle, Award, AlertCircle, 
  ChevronLeft, ChevronRight, Lock, Image as ImageIcon,
  Moon, Sun
} from 'lucide-react';

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Social Studies', 'English'];
const MODULES_PER_SUBJECT = 10;
const QUESTIONS_PER_QUIZ = 10;

const generateQuiz = (subject, moduleIndex) => {
  const questions = [];
  const banks = {
    'Mathematics': [
      { text: "What is the value of Pi to two decimal places?", options: ["3.14", "3.41", "3.12", "3.24"], ans: 0 },
      { text: `Solve for x: 2x = ${moduleIndex * 4}`, options: [`${moduleIndex * 1}`, `${moduleIndex * 2}`, `${moduleIndex * 3}`, `${moduleIndex * 4}`], ans: 1 },
      { text: "What is the square root of 144?", options: ["10", "11", "12", "14"], ans: 2 },
      { text: "Which of these is a prime number?", options: ["4", "9", "15", "17"], ans: 3 },
      { text: `What is ${moduleIndex * 5} * 3?`, options: [`${moduleIndex * 15}`, `${moduleIndex * 5 + 3}`, `${moduleIndex * 8}`, "None"], ans: 0 },
      { text: "What is the formula for the area of a rectangle?", options: ["Base × Height", "Length × Width", "π × r²", "1/2 × Base × Height"], ans: 1 },
      { text: "What is 15% of 200?", options: ["15", "20", "30", "45"], ans: 2 },
      { text: "If a triangle has an angle of 90 degrees, it is a:", options: ["Obtuse Triangle", "Acute Triangle", "Isosceles Triangle", "Right Triangle"], ans: 3 },
      { text: "What is the next number in the sequence: 2, 4, 8, 16, ...?", options: ["32", "24", "64", "20"], ans: 0 },
      { text: "How many degrees are in a full circle?", options: ["180", "360", "270", "90"], ans: 1 }
    ],
    'Physics': [
      { text: "What is the standard unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], ans: 0 },
      { text: "What does 'E' stand for in E=mc²?", options: ["Electricity", "Energy", "Electron", "Empty"], ans: 1 },
      { text: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "150,000 km/s", "299,792 km/s", "1,000,000 km/s"], ans: 2 },
      { text: "Which law states: for every action, there is an equal and opposite reaction?", options: ["First Law", "Second Law", "Law of Gravity", "Third Law"], ans: 3 },
      { text: "What is the unit of electrical resistance?", options: ["Ohm", "Ampere", "Volt", "Coulomb"], ans: 0 },
      { text: "Gravity on Earth accelerates an object at approximately:", options: ["8.9 m/s²", "9.8 m/s²", "10.5 m/s²", "11.2 m/s²"], ans: 1 },
      { text: "What type of energy is stored in a stretched spring?", options: ["Kinetic", "Thermal", "Potential", "Chemical"], ans: 2 },
      { text: "What is the primary source of Earth's energy?", options: ["Geothermal", "Wind", "Nuclear", "The Sun"], ans: 3 },
      { text: "Which particle carries a negative charge?", options: ["Electron", "Proton", "Neutron", "Positron"], ans: 0 },
      { text: "Sound travels fastest through which medium?", options: ["Vacuum", "Solid", "Liquid", "Gas"], ans: 1 }
    ],
    'Chemistry': [
      { text: "What is the chemical symbol for Gold?", options: ["Au", "Ag", "Fe", "Cu"], ans: 0 },
      { text: "What is the pH of pure water?", options: ["5", "7", "9", "12"], ans: 1 },
      { text: "Which gas is most abundant in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], ans: 2 },
      { text: "What is the atomic number of Carbon?", options: ["4", "5", "8", "6"], ans: 3 },
      { text: "What state of matter has a definite volume but no definite shape?", options: ["Liquid", "Solid", "Gas", "Plasma"], ans: 0 },
      { text: "What is the chemical formula for table salt?", options: ["KCl", "NaCl", "NaOH", "HCl"], ans: 1 },
      { text: "Which subatomic particle has no charge?", options: ["Proton", "Electron", "Neutron", "Ion"], ans: 2 },
      { text: "What type of bond involves the sharing of electron pairs?", options: ["Ionic", "Metallic", "Hydrogen", "Covalent"], ans: 3 },
      { text: "What is the lightest element?", options: ["Hydrogen", "Helium", "Lithium", "Oxygen"], ans: 0 },
      { text: "A solution with a pH less than 7 is considered:", options: ["Basic", "Acidic", "Neutral", "Alkaline"], ans: 1 }
    ],
    'Social Studies': [
      { text: "In what year did World War II end?", options: ["1945", "1918", "1939", "1950"], ans: 0 },
      { text: "Who was the first President of the United States?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], ans: 1 },
      { text: "What is the longest river in the world?", options: ["Amazon", "Yangtze", "Nile", "Mississippi"], ans: 2 },
      { text: "Which ancient civilization built the pyramids?", options: ["Romans", "Greeks", "Mayans", "Egyptians"], ans: 3 },
      { text: "What is the capital of Japan?", options: ["Tokyo", "Kyoto", "Osaka", "Seoul"], ans: 0 },
      { text: "Who wrote the Declaration of Independence?", options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Hancock"], ans: 1 },
      { text: "The Great Wall of China was primarily built to protect against:", options: ["Floods", "Trade disruption", "Mongol invasions", "Earthquakes"], ans: 2 },
      { text: "What is the main economic system of the United States?", options: ["Socialism", "Communism", "Feudalism", "Capitalism"], ans: 3 },
      { text: "Which continent is the Sahara Desert located on?", options: ["Africa", "Asia", "South America", "Australia"], ans: 0 },
      { text: "Who was the civil rights leader famous for his 'I Have a Dream' speech?", options: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks", "W.E.B. Du Bois"], ans: 1 }
    ],
    'English': [
      { text: "What is the past participle of 'go'?", options: ["Gone", "Went", "Going", "Goes"], ans: 0 },
      { text: "Which is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], ans: 1 },
      { text: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], ans: 2 },
      { text: "What figure of speech compares two things using 'like' or 'as'?", options: ["Metaphor", "Personification", "Hyperbole", "Simile"], ans: 3 },
      { text: "Identify the noun in this sentence: 'The quick brown fox.'", options: ["Fox", "Quick", "Brown", "The"], ans: 0 },
      { text: "Which is the correct spelling?", options: ["Recieve", "Receive", "Receeve", "Receve"], ans: 1 },
      { text: "What punctuation mark is used to show excitement?", options: ["Question mark", "Comma", "Exclamation point", "Period"], ans: 2 },
      { text: "What is the main idea of a story?", options: ["The setting", "The characters", "The plot", "The central theme"], ans: 3 },
      { text: "Which word is an adjective?", options: ["Beautiful", "Run", "Quickly", "He"], ans: 0 },
      { text: "What is the opposite of 'expand'?", options: ["Grow", "Contract", "Increase", "Enlarge"], ans: 1 }
    ]
  };

  const subjectBank = banks[subject] || banks['Mathematics'];

  for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
    const questionData = subjectBank[(i + moduleIndex) % subjectBank.length];
    questions.push({
      id: `q_${subject}_${moduleIndex}_${i}`,
      text: `Q${i + 1}: ${questionData.text}`,
      options: questionData.options,
      correctAnswerIndex: questionData.ans
    });
  }
  return questions;
};

// Create the Context for Global State
const AppContext = createContext(null);

export default function App() {
  // In-Memory Database State
  const [usersDb, setUsersDb] = useState([    {      id: '1', name: 'Demo Student', email: 'demo@school.edu', password: 'password123',      avatar: '', progress: {}    },    {      id: '2', name: 'Karthik', email: 'karthik@gmail.com1', password: 'password123',      avatar: '', progress: {}    }  ]);
  
  // App State
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('auth'); 
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [authMode, setAuthMode] = useState('login'); 
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // --- Actions ---
  const handleLogin = (email, password) => {
    const user = usersDb.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const handleSignup = (name, email, password) => {
    if (usersDb.some(u => u.email === email)) {
      return { success: false, message: 'Email already exists.' };
    }
    const newUser = {
      id: Date.now().toString(), name, email, password, avatar: '', progress: {}
    };
    setUsersDb([...usersDb, newUser]);
    setCurrentUser(newUser);
    setCurrentView('dashboard');
    return { success: true };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('auth');
    setAuthMode('login');
  };

  const updateUserProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setUsersDb(usersDb.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const saveQuizResult = (subject, moduleIndex, score) => {
    const newProgress = { ...currentUser.progress };
    if (!newProgress[subject]) newProgress[subject] = {};
    
    // Only update if score is better or it's the first time
    if (!newProgress[subject][moduleIndex] || score > newProgress[subject][moduleIndex].score) {
      newProgress[subject][moduleIndex] = {
        completed: true,
        score: score
      };
      updateUserProfile({ progress: newProgress });
    }
  };

  // --- Context Value ---
  const contextValue = {
    currentUser, handleLogin, handleSignup, handleLogout, updateUserProfile,
    currentView, setCurrentView,
    activeSubject, setActiveSubject,
    activeModule, setActiveModule,
    saveQuizResult,
    theme, setTheme
  };

  // --- Routing Logic ---
  let ViewComponent = AuthView;
  if (currentUser) {
    switch (currentView) {
      case 'dashboard': ViewComponent = DashboardView; break;
      case 'subject': ViewComponent = SubjectView; break;
      case 'module': ViewComponent = ModuleView; break;
      case 'quiz': ViewComponent = QuizView; break;
      case 'profile': ViewComponent = ProfileView; break;
      case 'settings': ViewComponent = SettingsView; break;
      default: ViewComponent = DashboardView;
    }
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`app-container ${theme}`}>
        {currentUser && <Navbar />}
        <ViewComponent authMode={authMode} setAuthMode={setAuthMode} />
      </div>
    </AppContext.Provider>
  );
}

function AuthView({ authMode, setAuthMode }) {
  const { handleLogin, handleSignup } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (authMode === 'login') {
      const res = handleLogin(formData.email, formData.password);
      if (!res.success) setError(res.message);
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('All fields are required.');
        return;
      }
      const res = handleSignup(formData.name, formData.email, formData.password);
      if (!res.success) setError(res.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <BookOpen size={48} color="var(--primary)" />
        </div>
        <h2 className="auth-header">Emerald Learning</h2>
        
        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {authMode === 'signup' && (
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="student@school.edu"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {authMode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}

function Navbar() {
  const { setCurrentView, handleLogout, currentUser } = useContext(AppContext);

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setCurrentView('dashboard')}>
        <BookOpen size={24} />
        <span>Emerald Portal</span>
      </div>
      <div className="nav-links">
        <button className="nav-btn" onClick={() => setCurrentView('dashboard')}>
          <BookOpen size={18} /> Subjects
        </button>
        <button className="nav-btn" onClick={() => setCurrentView('profile')}>
          <User size={18} /> {currentUser.name.split(' ')[0]}
        </button>
        <button className="nav-btn" onClick={() => setCurrentView('settings')}>
          <Settings size={18} /> Settings
        </button>
        <button className="nav-btn" onClick={handleLogout} style={{ color: 'var(--error)' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
}

function DashboardView() {
  const { setCurrentView, setActiveSubject, currentUser } = useContext(AppContext);

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject);
    setCurrentView('subject');
  };

  const getSubjectProgress = (subject) => {
    const subjectData = currentUser.progress[subject] || {};
    const completedModules = Object.keys(subjectData).length;
    return Math.round((completedModules / MODULES_PER_SUBJECT) * 100);
  };

  return (
    <div className="main-content">
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Welcome back, {currentUser.name}!</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Select a subject to continue your learning journey.</p>
      
      <div className="grid-3">
        {SUBJECTS.map((subject, index) => {
          const progress = getSubjectProgress(subject);
          return (
            <div key={subject} className="card interactive" onClick={() => handleSubjectClick(subject)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--primary-light)', borderRadius: '12px', color: 'var(--primary-dark)' }}>
                  <BookOpen size={24} />
                </div>
                <h3>{subject}</h3>
              </div>
              
              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubjectView() {
  const { activeSubject, setCurrentView, setActiveModule, currentUser } = useContext(AppContext);

  const handleModuleClick = (index) => {
    setActiveModule(index);
    setCurrentView('module');
  };

  return (
    <div className="main-content">
      <button className="btn nav-btn" style={{ marginBottom: '1rem' }} onClick={() => setCurrentView('dashboard')}>
        <ChevronLeft size={20} /> Back to Dashboard
      </button>
      
      <h1 style={{ color: 'var(--primary-dark)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{activeSubject}</h1>
      <p style={{ marginBottom: '2rem' }}>Complete all 10 modules to master this subject.</p>

      <div className="module-list">
        {Array.from({ length: MODULES_PER_SUBJECT }).map((_, i) => {
          const index = i + 1;
          const isCompleted = currentUser.progress[activeSubject]?.[index]?.completed;
          const score = currentUser.progress[activeSubject]?.[index]?.score;

          return (
            <div key={index} className="module-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isCompleted ? '#dcfce7' : 'var(--bg-main)',
                  color: isCompleted ? 'var(--success)' : 'var(--text-muted)',
                  fontWeight: 'bold'
                }}>
                  {isCompleted ? <CheckCircle size={20} /> : index}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Module {index}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Video Lesson, Reading Material & Quiz
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {isCompleted && (
                  <span style={{ fontSize: '0.9rem', color: 'var(--success)', fontWeight: '600' }}>
                    Score: {score}/10
                  </span>
                )}
                <button className="btn btn-outline" onClick={() => handleModuleClick(index)}>
                  {isCompleted ? 'Review' : 'Start Module'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModuleView() {
  const { activeSubject, activeModule, setCurrentView } = useContext(AppContext);

  // BULLETPROOF VIDEO URL LOGIC
  let videoId = '8mve0UoSxTo'; // Default ID (Math)
  if (activeSubject === 'Physics') {
    videoId = 'ZM8ECpBuQYE';
  } else if (activeSubject === 'Chemistry') {
    videoId = 'FSyAehMdcmI';
  } else if (activeSubject === 'Social Studies') {
    videoId = 'rYhNDb_A0hc';
  } else if (activeSubject === 'English') {
    videoId = '_OBlgSz8sSM';
  }

  // Constructing the final safe URL
  const videoUrl = "https://www.youtube.com/embed/" + videoId + "?rel=0";

  const renderLearningMaterial = () => {
    const contents = {
      'Mathematics': {
        title: `Advanced Mathematical Concepts (Module ${activeModule})`,
        intro: "Mathematics is the abstract science of number, quantity, and space. In this comprehensive module, we will explore core foundational principles that govern mathematical reasoning and complex problem-solving.",
        sections: [
          { subtitle: "1. Core Principles & Axioms", text: "Mathematical logic is built on axioms. An axiom is a premise or starting point for reasoning. Understanding the associative, commutative, and distributive properties is crucial for algebraic manipulation. For example, the distributive property a(b + c) = ab + ac allows us to expand expressions and solve complex equations efficiently." },
          { subtitle: "2. Algebraic Manipulation & Equations", text: "Algebra involves using variables to represent unknown quantities. Solving an equation means finding the value of these variables that makes the statement true. We use balancing techniques—performing the same operation on both sides of the equals sign. Quadratic equations can be solved using factoring, completing the square, or the quadratic formula: x = [-b ± √(b² - 4ac)] / 2a." },
          { subtitle: "3. Geometric Spatial Reasoning", text: "Geometry extends algebra into the physical world. It deals with shapes, sizes, relative positions of figures, and the properties of space. The Pythagorean theorem (a² + b² = c²) is a fundamental relation in Euclidean geometry among the three sides of a right triangle. Calculating the area and perimeter of complex polygons requires breaking them down into simpler geometric shapes." },
          { subtitle: "4. Practical Application & Functions", text: "Mathematics isn't just theoretical; it models the real world. Functions describe relationships between variables, such as predicting population growth, calculating compound interest, or optimizing area. By establishing a function f(x), we can input various scenarios to predict outcomes mathematically." },
          { subtitle: "5. Module Summary & Key Takeaways", text: "To master this module, ensure you are comfortable manipulating variables across both sides of an equation, identifying geometric properties of basic shapes, and translating complex word problems into solvable mathematical formulas." }
        ]
      },
      'Physics': {
        title: `Mechanics, Energy, & Matter (Module ${activeModule})`,
        intro: "Physics is the fundamental science of matter, motion, and energy. This module delves deeply into the laws that govern the physical universe, from macroscopic forces to microscopic particles.",
        sections: [
          { subtitle: "1. Kinematics and Dynamics", text: "Kinematics describes motion without considering its causes, focusing on velocity, acceleration, and displacement. Dynamics introduces forces. Isaac Newton's three laws of motion form the bedrock of classical mechanics, defining inertia, the relationship between force and acceleration (F=ma), and action-reaction pairs." },
          { subtitle: "2. Conservation of Energy and Momentum", text: "The Law of Conservation of Energy states that energy cannot be created or destroyed, only transformed from one form to another. In closed systems, the sum of kinetic and potential energy remains constant. Similarly, linear momentum (mass times velocity) is conserved in collisions, allowing us to predict post-collision velocities." },
          { subtitle: "3. Thermodynamics Fundamentals", text: "Thermodynamics is the study of heat, work, and temperature. The laws of thermodynamics govern the direction of heat transfer and the efficiency of engines. Entropy, a measure of disorder, always increases in an isolated system, explaining why time flows in one direction and why perpetual motion machines are impossible." },
          { subtitle: "4. Waves and Electromagnetism", text: "Waves transfer energy without transferring matter. Sound and light are common wave phenomena characterized by their frequency and wavelength. Electromagnetism unifies electricity and magnetism, explaining how changing electric fields create magnetic fields, leading to the generation of electromagnetic waves like visible light and radio waves." },
          { subtitle: "5. Module Summary & Key Takeaways", text: "Mastery of physics requires understanding how to draw and apply free-body force diagrams, calculate energy transformations within a system, and understand the basic principles of wave-particle duality." }
        ]
      },
      'Chemistry': {
        title: `Atomic Theory & Chemical Reactions (Module ${activeModule})`,
        intro: "Chemistry explores the composition, properties, and behavior of matter. We will investigate the atomic and molecular levels to understand how different substances interact, bond, and transform.",
        sections: [
          { subtitle: "1. Advanced Atomic Structure", text: "Atoms consist of a dense nucleus of protons and neutrons surrounded by electron clouds. Quantum mechanics dictates that electrons occupy probabilistic orbitals rather than fixed paths. The arrangement of these valence electrons dictates an element's chemical properties and its designated position on the Periodic Table." },
          { subtitle: "2. Chemical Bonding & Molecular Geometry", text: "Elements bond to achieve stable electron configurations. Ionic bonds involve the complete transfer of electrons, while covalent bonds involve sharing them. The Valence Shell Electron Pair Repulsion (VSEPR) theory helps us predict the 3D geometry of molecules, which in turn determines physical properties like polarity and boiling point." },
          { subtitle: "3. Stoichiometry and The Mole Concept", text: "Stoichiometry is the quantitative relationship between reactants and products in a chemical reaction. The 'mole' is the bridge between the microscopic atomic world and the macroscopic world we measure in the lab. Using balanced equations, we can calculate expected yields and determine limiting reactants." },
          { subtitle: "4. Thermodynamics and Kinetics of Reactions", text: "Chemical thermodynamics answers *if* a reaction will happen (spontaneity based on Gibbs Free Energy), while kinetics answers *how fast* it will happen. Activation energy is the hurdle molecules must overcome to react, and catalysts speed up reactions by lowering this crucial barrier." },
          { subtitle: "5. Module Summary & Key Takeaways", text: "To succeed in this module, practice balancing complex redox equations, calculating molar masses efficiently, and visualizing the 3D structures of complex covalent compounds." }
        ]
      },
      'Social Studies': {
        title: `Historical Eras & Civic Governance (Module ${activeModule})`,
        intro: "Understanding our past is essential to navigating our future. This highly detailed module explores significant historical shifts, governance models, and their lasting global societal impacts.",
        sections: [
          { subtitle: "1. The Rise and Fall of Ancient Civilizations", text: "Early human societies evolved from hunter-gatherers to complex civilizations settled near river valleys (e.g., Mesopotamia, Egypt, Indus Valley). These societies developed writing, agriculture, and stratified social classes. The collapse of these empires often stemmed from a combination of environmental degradation, economic inflation, and external invasions." },
          { subtitle: "2. The Evolution of Governance & Democracy", text: "Political systems have evolved drastically over millennia. We trace the lineage from absolute monarchies and feudalism to the birth of democracy in ancient Athens, the republican system of Rome, and eventually the enlightenment era which birthed modern constitutional democracies focusing on human rights and separation of powers." },
          { subtitle: "3. Global Conflicts and The World Wars", text: "The 20th century was defined by two massive global conflicts. WWI introduced mechanized warfare and ended with treaties that inadvertently set the stage for WWII. The aftermath of WWII completely restructured global power dynamics, leading to the ideological proxy wars of the Cold War and the creation of international bodies like the United Nations." },
          { subtitle: "4. Economic Systems and Globalization", text: "Societies must decide how to allocate scarce resources. We examine the spectrum of economic systems from pure command economies (communism) to free-market capitalism. Globalization, driven by rapid technological advancements, has interconnected these economies, creating both massive wealth and new challenges in inequality and environmental sustainability." },
          { subtitle: "5. Module Summary & Key Takeaways", text: "Reflect on how historical events are intrinsically interconnected. Understanding the economic and social pressures of the past allows us to critically analyze current geopolitical events and understand our civic responsibilities." }
        ]
      },
      'English': {
        title: `Literary Analysis, Composition, & Rhetoric (Module ${activeModule})`,
        intro: "Language is the ultimate medium of complex thought. This extensive module refines your ability to comprehend difficult texts, analyze rhetoric, and articulate nuanced ideas clearly and persuasively.",
        sections: [
          { subtitle: "1. Deep Literary Analysis & Thematic Exploration", text: "Reading goes beyond mere plot summary. True literary analysis dissects themes, motifs, and symbolism. We will explore how authors use setting and character development to reflect broader societal issues. Analyzing tone, mood, and narrative perspective reveals the underlying message and bias of the text." },
          { subtitle: "2. Rhetorical Strategies and Persuasion", text: "Effective communication relies on rhetoric. Aristotle's triad—Ethos (credibility), Pathos (emotion), and Logos (logic)—forms the foundation of persuasive writing. We will analyze historical speeches, essays, and modern media to identify how these techniques are employed to sway audiences and manipulate public opinion." },
          { subtitle: "3. Advanced Grammar, Syntax, and Style", text: "Grammar is the architecture of language. Mastering complex sentence structures, varying syntax, and utilizing precise, elevated vocabulary transforms writing from functional to eloquent. We will review common pitfalls like dangling modifiers, subject-verb agreement in complex clauses, and the strategic use of passive versus active voice." },
          { subtitle: "4. The Writing Process: From Draft to Polish", text: "Strong writing is a process, not a sudden event. It begins with rigorous brainstorming and outlining, followed by drafting where the focus is on flow and argument construction. The critical step is revision—editing for clarity, coherence, and impact. We will practice techniques to constructively critique and improve our compositions." },
          { subtitle: "5. Module Summary & Key Takeaways", text: "Your primary goal is to become an active, critical reader and a deliberate writer. Always question the author's intent, and when writing yourself, prioritize absolute clarity and a logical progression of your arguments." }
        ]
      }
    };

    const data = contents[activeSubject] || contents['Mathematics'];

    return (
      <div style={{ animation: 'fadeIn 0.5s ease' }}>
        <h3 style={{ margin: 0, marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.75rem' }}>
          {data.title}
        </h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
          {data.intro}
        </p>
        
        {data.sections.map((sec, i) => (
          <div key={i} style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-main)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.75rem', fontSize: '1.2rem' }}>
              {sec.subtitle}
            </h4>
            <p style={{ lineHeight: '1.8', color: 'var(--text-main)', fontSize: '1.05rem', margin: 0 }}>{sec.text}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="main-content">
      <button className="btn nav-btn" style={{ marginBottom: '1.5rem' }} onClick={() => setCurrentView('subject')}>
        <ChevronLeft size={20} /> Back to {activeSubject} Modules
      </button>

      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Module {activeModule} Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Complete the video lesson, review the comprehensive study material, and pass the 10-question assessment to advance.
        </p>
      </div>

      {/* SUB-SECTION 1: VIDEO */}
      <div className="module-section">
        <div className="section-badge">
          <PlayCircle size={18} /> Part 1: Video Lesson
        </div>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
          <iframe 
            src={videoUrl} 
            title={`Video lesson for ${activeSubject}`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.95rem' }}>
          Instructor's Note: Watch the lecture thoroughly. Key concepts and formulas discussed in this video will appear in the final module assessment.
        </p>
      </div>

      {/* SUB-SECTION 2: MATERIAL */}
      <div className="module-section">
        <div className="section-badge">
          <FileText size={18} /> Part 2: Comprehensive Study Material
        </div>
        <div className="learning-material" style={{ border: 'none', padding: 0, boxShadow: 'none', background: 'transparent', margin: 0 }}>
          {renderLearningMaterial()}
        </div>
      </div>

      {/* SUB-SECTION 3: QUIZ */}
      <div className="module-section" style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)', textAlign: 'center', padding: '3.5rem 2rem' }}>
        <div className="section-badge" style={{ background: 'var(--primary)', color: 'white', marginBottom: '1rem', border: 'none' }}>
          <CheckCircle size={18} /> Part 3: Assessment
        </div>
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', fontSize: '2rem' }}>Ready for the Module Quiz?</h2>
        <p style={{ color: 'var(--primary-dark)', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
          You must score at least <strong>6/10</strong> to pass this module. The quiz contains exactly 10 questions covering both the video lecture and the detailed study material above. Good luck!
        </p>
        <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.15rem', boxShadow: 'var(--shadow-lg)' }} onClick={() => setCurrentView('quiz')}>
          Start 10-Question Quiz <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function QuizView() {
  const { activeSubject, activeModule, setCurrentView, saveQuizResult } = useContext(AppContext);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(generateQuiz(activeSubject, activeModule));
  }, [activeSubject, activeModule]);

  const handleSelect = (index) => {
    if (selectedAnswer !== null) return; 
    setSelectedAnswer(index);
    
    if (index === questions[currentIndex].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  useEffect(() => {
     if(showResult){
         saveQuizResult(activeSubject, activeModule, score + (selectedAnswer === questions[currentIndex].correctAnswerIndex && !showResult ? 1 : 0));
         saveQuizResult(activeSubject, activeModule, score);
     }
  }, [showResult]);

  if (questions.length === 0) return <div>Loading...</div>;

  if (showResult) {
    const passed = score >= 6;
    return (
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          {passed ? (
             <Award size={64} color="var(--success)" style={{ margin: '0 auto 1rem' }} />
          ) : (
             <AlertCircle size={64} color="var(--error)" style={{ margin: '0 auto 1rem' }} />
          )}
          
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {passed ? 'Module Completed!' : 'Keep Practicing!'}
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            You scored <strong style={{ color: passed ? 'var(--success)' : 'var(--error)' }}>{score} / {QUESTIONS_PER_QUIZ}</strong>
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={() => {
              setCurrentIndex(0); setSelectedAnswer(null); setShowResult(false); setScore(0);
            }}>
              Retry Quiz
            </button>
            <button className="btn btn-primary" onClick={() => setCurrentView('subject')}>
              Return to Subject
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Quiz: {activeSubject} - Module {activeModule}</h2>
        <span style={{ background: 'var(--primary-light)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'var(--primary-dark)', fontWeight: 'bold' }}>
          Question {currentIndex + 1} of {QUESTIONS_PER_QUIZ}
        </span>
      </div>

      <div className="quiz-container">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>{currentQ.text}</h3>
        
        <div>
          {currentQ.options.map((option, idx) => {
            let className = "option-btn";
            if (selectedAnswer !== null) {
              if (idx === currentQ.correctAnswerIndex) className += " correct";
              else if (idx === selectedAnswer) className += " wrong";
            }

            return (
              <button 
                key={idx} 
                className={className}
                onClick={() => handleSelect(idx)}
                disabled={selectedAnswer !== null}
              >
                {String.fromCharCode(65 + idx)}. {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProfileView() {
  const { currentUser, updateUserProfile } = useContext(AppContext);
  const [formData, setFormData] = useState({ 
    name: currentUser.name, 
    email: currentUser.email,
    avatar: currentUser.avatar || ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  let totalModulesCompleted = 0;
  const totalPossibleModules = SUBJECTS.length * MODULES_PER_SUBJECT;
  
  Object.values(currentUser.progress).forEach(subjectProgress => {
    totalModulesCompleted += Object.keys(subjectProgress).length;
  });
  const overallProgress = Math.round((totalModulesCompleted / totalPossibleModules) * 100) || 0;

  return (
    <div className="main-content">
      <h1>Student Profile</h1>
      
      <div className="grid-2">
        {/* Edit Profile Form */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <User size={20} /> Personal Details
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            {formData.avatar ? (
              <img src={formData.avatar} alt="Profile" className="avatar" />
            ) : (
              <div className="avatar-placeholder">{formData.name.charAt(0)}</div>
            )}
            <div style={{ flex: 1 }}>
               <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <ImageIcon size={16}/> Avatar Image URL
               </label>
               <input 
                type="text" className="form-input" placeholder="https://example.com/photo.jpg"
                value={formData.avatar} onChange={e => setFormData({...formData, avatar: e.target.value})}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" className="form-input" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" className="form-input" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            {message && <div style={{ color: 'var(--success)', marginBottom: '1rem', fontSize: '0.9rem' }}>{message}</div>}
            
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </div>

        {/* Progress Tracker */}
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Award size={20} /> Learning Progress
          </h2>

          <div style={{ textAlign: 'center', padding: '2rem 0', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {overallProgress}%
            </div>
            <p style={{ margin: 0 }}>Overall Completion</p>
          </div>

          <div>
            {SUBJECTS.map(subject => {
              const subjectData = currentUser.progress[subject] || {};
              const completed = Object.keys(subjectData).length;
              const percent = Math.round((completed / MODULES_PER_SUBJECT) * 100);
              
              return (
                <div key={subject} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: '500' }}>{subject}</span>
                    <span>{completed}/{MODULES_PER_SUBJECT} Modules</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  const { currentUser, updateUserProfile, theme, setTheme } = useContext(AppContext);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (passwords.current !== currentUser.password) {
      setStatus({ type: 'error', message: 'Current password is incorrect.' });
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    if (passwords.new.length < 6) {
       setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
       return;
    }

    updateUserProfile({ password: passwords.new });
    setPasswords({ current: '', new: '', confirm: '' });
    setStatus({ type: 'success', message: 'Password updated successfully.' });
  };

  return (
    <div className="main-content" style={{ maxWidth: '600px' }}>
      <h1>Account Settings</h1>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Settings size={20} /> Preferences
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem' }}>
           <div>
              <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '1.1rem' }}>Dark Mode</strong>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Toggle darker theme appearance</span>
           </div>
           <button
             className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
             onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
             style={{ padding: '0.5rem 1rem' }}
           >
             {theme === 'dark' ? <><Moon size={18} /> Enabled</> : <><Sun size={18} /> Disabled</>}
           </button>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Lock size={20} /> Change Password
        </h2>

        {status.message && (
          <div className={`alert ${status.type === 'error' ? 'alert-error' : ''}`} style={{ backgroundColor: status.type === 'success' ? '#dcfce7' : '', color: status.type === 'success' ? 'var(--success)' : '', borderColor: status.type === 'success' ? '#86efac' : '' }}>
            {status.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input 
              type="password" className="form-input" required
              value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input 
              type="password" className="form-input" required
              value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input 
              type="password" className="form-input" required
              value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Update Password</button>
        </form>
      </div>
    </div>
  );
}