
import React, { useState, useEffect } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { UserProfile } from '@/components/UserProfile';
import { RepositoryGrid } from '@/components/RepositoryGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Navbar } from '@/components/Navbar';
import { fetchGitHubUser, fetchUserRepositories } from '@/utils/githubApi';
import { GitHubUser, Repository } from '@/types/github';
import { LoggedInUser } from '@/types/user';
import { Github, Star, Users, MapPin } from 'lucide-react';

const Index = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  // Check for logged in user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Toggle dark class on document root
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const handleSearch = async (username: string) => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const [userData, reposData] = await Promise.all([
        fetchGitHubUser(username),
        fetchUserRepositories(username)
      ]);

      setUser(userData);
      setRepositories(reposData.slice(0, 5)); // Top 5 repositories
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Navbar */}
      <Navbar 
        user={user} 
        repositories={repositories} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23${darkMode ? '9C92AC' : '6366f1'}' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className={`${darkMode ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-sm rounded-full p-4 mr-4`}>
              <Github className={`w-12 h-12 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </div>
            <h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              GitHub <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Gazer</span>
            </h1>
          </div>
          <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed`}>
            Discover GitHub profiles, explore repositories, and dive deep into the world of open source development
          </p>
        </header>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mb-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Results */}
        {user && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* User Profile */}
            <UserProfile user={user} />
            
            {/* Repositories */}
            {repositories.length > 0 && (
              <div>
                <div className="flex items-center justify-center mb-8">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Top Repositories</h2>
                </div>
                <RepositoryGrid repositories={repositories} />
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!user && !loading && hasSearched && !error && (
          <div className="text-center py-16">
            <Users className={`w-24 h-24 ${darkMode ? 'text-slate-500' : 'text-gray-400'} mx-auto mb-6`} />
            <h3 className={`text-2xl font-semibold ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-2`}>No user found</h3>
            <p className={`${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Try searching for a different GitHub username</p>
          </div>
        )}

        {/* Welcome State */}
        {!hasSearched && !loading && (
          <div className="text-center py-16">
            <div className={`${darkMode ? 'bg-white/5' : 'bg-white/20'} backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto`}>
              <Github className={`w-32 h-32 ${darkMode ? 'text-slate-400' : 'text-gray-400'} mx-auto mb-8 opacity-50`} />
              <h3 className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Ready to explore?</h3>
              <p className={`text-xl ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-8`}>Enter a GitHub username above to discover amazing profiles and repositories</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className={`${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <Users className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Profile Info</h4>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>View detailed user information and statistics</p>
                </div>
                <div className="text-center">
                  <div className={`${darkMode ? 'bg-yellow-500/20' : 'bg-yellow-500/10'} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <Star className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Top Repos</h4>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Discover their most starred repositories</p>
                </div>
                <div className="text-center">
                  <div className={`${darkMode ? 'bg-green-500/20' : 'bg-green-500/10'} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <MapPin className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Location</h4>
                  <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Find out where developers are based</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
