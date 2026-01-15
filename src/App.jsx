import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle, Circle, TrendingUp, Calendar, Clock, Target, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

function GoalTrackerApp() {
  const [activeTab, setActiveTab] = useState('daily');
  const [goals, setGoals] = useState({ monthly: [], weekly: [], daily: [] });
  const [newGoal, setNewGoal] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewMode, setViewMode] = useState('goals'); // 'goals' or 'calendar'
  const [currentQuote, setCurrentQuote] = useState(null);

  const motivationalQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Small progress is still progress.", author: "Unknown" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Don't limit your challenges. Challenge your limits.", author: "Unknown" },
    { text: "Dream big. Start small. Act now.", author: "Robin Sharma" },
    { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "Sometimes later becomes never. Do it now.", author: "Unknown" },
    { text: "The key to success is to start before you are ready.", author: "Marie Forleo" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('goal-tracker-data');
    if (saved) {
      setGoals(JSON.parse(saved));
    }
    
    // Set initial random quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(motivationalQuotes[randomIndex]);
    
    // Change quote every 30 seconds
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
    }, 30000);
    
    return () => clearInterval(quoteInterval);
  }, []);

  const saveGoals = (updatedGoals) => {
    localStorage.setItem('goal-tracker-data', JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    
    const goal = {
      id: Date.now(),
      text: newGoal,
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: selectedDate.toISOString(),
      history: []
    };

    const updatedGoals = {
      ...goals,
      [activeTab]: [...goals[activeTab], goal]
    };

    saveGoals(updatedGoals);
    setNewGoal('');
    
    // Show a new motivational quote when a goal is added
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(motivationalQuotes[randomIndex]);
  };

  const deleteGoal = (id) => {
    const updatedGoals = {
      ...goals,
      [activeTab]: goals[activeTab].filter(g => g.id !== id)
    };
    saveGoals(updatedGoals);
  };

  const updateProgress = (id, progress) => {
    const updatedGoals = {
      ...goals,
      [activeTab]: goals[activeTab].map(g => {
        if (g.id === id) {
          const history = g.history || [];
          history.push({
            date: new Date().toISOString(),
            progress: progress
          });
          return { 
            ...g, 
            progress, 
            completed: progress === 100,
            history: history
          };
        }
        return g;
      })
    };
    saveGoals(updatedGoals);
  };

  const toggleComplete = (id) => {
    const updatedGoals = {
      ...goals,
      [activeTab]: goals[activeTab].map(g => {
        if (g.id === id) {
          const newCompleted = !g.completed;
          const history = g.history || [];
          history.push({
            date: new Date().toISOString(),
            progress: newCompleted ? 100 : g.progress,
            completed: newCompleted
          });
          return { 
            ...g, 
            completed: newCompleted, 
            progress: newCompleted ? 100 : g.progress,
            history: history
          };
        }
        return g;
      })
    };
    saveGoals(updatedGoals);
  };

  const getStats = (type) => {
    const typeGoals = goals[type];
    const total = typeGoals.length;
    const completed = typeGoals.filter(g => g.completed).length;
    const avgProgress = total > 0 
      ? typeGoals.reduce((sum, g) => sum + g.progress, 0) / total 
      : 0;
    return { total, completed, avgProgress };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getGoalsForDate = (date) => {
    const dateStr = date.toDateString();
    return goals[activeTab].filter(goal => {
      const goalDate = new Date(goal.dueDate);
      return goalDate.toDateString() === dateStr;
    });
  };

  const getProgressForDate = (date) => {
    const goalsOnDate = getGoalsForDate(date);
    if (goalsOnDate.length === 0) return 0;
    const totalProgress = goalsOnDate.reduce((sum, g) => sum + g.progress, 0);
    return totalProgress / goalsOnDate.length;
  };

  const CalendarView = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    
    const previousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };
    
    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const goalsOnDate = getGoalsForDate(date);
      const progress = getProgressForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      
      days.push(
        <div
          key={day}
          className={`aspect-square p-2 border border-white/10 rounded-lg relative ${
            isToday ? 'bg-cyan-500/20 border-cyan-500' : 'bg-white/5'
          } hover:bg-white/10 transition-all cursor-pointer`}
          onClick={() => {
            setSelectedDate(date);
            setViewMode('goals');
          }}
        >
          <div className="text-sm text-white font-medium">{day}</div>
          {goalsOnDate.length > 0 && (
            <div className="mt-1">
              <div className="text-xs text-slate-300 mb-1">{goalsOnDate.length} goal{goalsOnDate.length > 1 ? 's' : ''}</div>
              <div className="w-full bg-slate-700 rounded-full h-1">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-slate-300 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </div>
    );
  };

  const tabs = [
    { key: 'daily', label: 'Daily', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { key: 'weekly', label: 'Weekly', icon: Calendar, color: 'from-purple-500 to-pink-500' },
    { key: 'monthly', label: 'Monthly', icon: Target, color: 'from-orange-500 to-red-500' }
  ];

  const filteredGoals = goals[activeTab].filter(goal => {
    if (viewMode === 'calendar') {
      const goalDate = new Date(goal.dueDate);
      return goalDate.toDateString() === selectedDate.toDateString();
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <TrendingUp className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">Goal Tracker Pro</h1>
          </div>
          <p className="text-slate-300">Track your daily, weekly, and monthly goals with calendar integration</p>
          
          {/* Motivational Quote Banner */}
          {currentQuote && (
            <div className="mt-6 mx-auto max-w-3xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 animate-pulse"></div>
              <div className="relative">
                <svg className="w-8 h-8 text-cyan-400/50 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-white text-xl md:text-2xl font-medium italic mb-3 leading-relaxed">
                  "{currentQuote.text}"
                </p>
                <p className="text-cyan-300 font-semibold">
                  — {currentQuote.author}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map(({ key, label, icon: Icon, color }) => {
            const stats = getStats(key);
            return (
              <div key={key} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`bg-gradient-to-r ${color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{label} Goals</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Total:</span>
                    <span className="text-white font-semibold">{stats.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Completed:</span>
                    <span className="text-green-400 font-semibold">{stats.completed}</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(stats.avgProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${stats.avgProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode('goals')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              viewMode === 'goals'
                ? 'bg-white text-purple-900 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Target className="w-5 h-5" />
            Goals View
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
              viewMode === 'calendar'
                ? 'bg-white text-purple-900 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            Calendar View
          </button>
        </div>

        {viewMode === 'calendar' && <CalendarView />}

        <div className="flex gap-2 mb-6 bg-white/5 p-2 rounded-2xl backdrop-blur-lg border border-white/10">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === key
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {viewMode === 'calendar' && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-cyan-300">
              <CalendarDays className="w-5 h-5" />
              <span className="font-medium">
                Showing goals for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                placeholder={`Add a new ${activeTab} goal...`}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={addGoal}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add
              </button>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-slate-300" />
              <span className="text-slate-300 text-sm">Due Date:</span>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <span className="text-slate-400 text-sm">{formatDate(selectedDate.toISOString())}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredGoals.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/10">
              <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">
                {viewMode === 'calendar' 
                  ? `No ${activeTab} goals for this date. Add one above!`
                  : `No ${activeTab} goals yet. Add one above to get started!`
                }
              </p>
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border transition-all ${
                  goal.completed 
                    ? 'border-green-500/50 bg-green-500/10' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleComplete(goal.id)}
                    className="mt-1 transition-transform hover:scale-110"
                  >
                    {goal.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-400" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <p className={`text-lg mb-2 ${goal.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {goal.text}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-3 text-sm text-slate-300">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>Due: {formatDate(goal.dueDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Created: {formatDate(goal.createdAt)}</span>
                      </div>
                      {goal.history && goal.history.length > 0 && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{goal.history.length} update{goal.history.length > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={goal.progress}
                          onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                          className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${goal.progress}%, #334155 ${goal.progress}%, #334155 100%)`
                          }}
                        />
                        <span className="text-white font-semibold min-w-[3rem] text-right">
                          {goal.progress}%
                        </span>
                      </div>
                      
                      {goal.history && goal.history.length > 0 && (
                        <details className="text-sm">
                          <summary className="text-slate-300 cursor-pointer hover:text-white transition-colors">
                            View Progress History
                          </summary>
                          <div className="mt-2 space-y-1 pl-4 border-l-2 border-cyan-500/30">
                            {goal.history.slice(-5).reverse().map((entry, idx) => (
                              <div key={idx} className="text-slate-400">
                                {formatDate(entry.date)} at {formatTime(entry.date)} - Progress: {entry.progress}%
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GoalTrackerApp
