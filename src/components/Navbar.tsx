
import React, { useState } from 'react';
import { GitHubUser, Repository } from '@/types/github';
import { LoggedInUser } from '@/types/user';
import { Github, User, Moon, Sun, ExternalLink, Star, GitFork, Calendar, MapPin, Users, Building, Link as LinkIcon, Twitter, LogIn, LogOut, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { formatDate, formatNumber } from '@/utils/githubApi';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  user: GitHubUser | null;
  repositories: Repository[];
  darkMode: boolean;
  toggleDarkMode: () => void;
  loggedInUser: LoggedInUser | null;
  setLoggedInUser: (user: LoggedInUser | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, repositories, darkMode, toggleDarkMode, loggedInUser, setLoggedInUser }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setLoggedInUser(null);
    setIsProfileOpen(false);
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Github className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white hidden sm:block">GitHub Gazer</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-white hover:bg-white/20"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Conditional rendering based on logged-in user state */}
            {loggedInUser ? (
              <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={loggedInUser.avatar} alt={loggedInUser.name} />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-full sm:max-w-md bg-slate-900 text-white border-slate-700 overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle className="text-white text-left">Your Profile</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-6">
                    {/* Logged-in User Profile Info */}
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={loggedInUser.avatar} alt={loggedInUser.name} />
                        <AvatarFallback>
                          <User className="w-8 h-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{loggedInUser.name}</h3>
                        <p className="text-slate-400">@{loggedInUser.username}</p>
                      </div>
                    </div>

                    {/* User Details */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-300 mb-3">Account Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800 rounded-lg p-3">
                          <User className="w-4 h-4" />
                          <div>
                            <div className="font-medium">Username</div>
                            <div className="text-slate-400">{loggedInUser.username}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800 rounded-lg p-3">
                          <Mail className="w-4 h-4" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-slate-400">{loggedInUser.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* GitHub Search Results (if any) */}
                    {user && (
                      <>
                        <div className="border-t border-slate-700 pt-4">
                          <h4 className="text-sm font-semibold text-slate-300 mb-3">Last GitHub Search</h4>
                          <div className="bg-slate-800 rounded-lg p-3">
                            <div className="flex items-center gap-3 mb-2">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
                                <AvatarFallback>
                                  <User className="w-5 h-5" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h5 className="font-medium text-white">{user.name || user.login}</h5>
                                <p className="text-slate-400 text-sm">@{user.login}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-3">
                              <div className="text-center">
                                <div className="text-sm font-bold text-white">{formatNumber(user.public_repos)}</div>
                                <div className="text-xs text-slate-400">Repos</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-white">{formatNumber(user.followers)}</div>
                                <div className="text-xs text-slate-400">Followers</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-white">{formatNumber(user.following)}</div>
                                <div className="text-xs text-slate-400">Following</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Top Repositories from Search */}
                        {repositories.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-3">Top Repositories from Search</h4>
                            <div className="space-y-2">
                              {repositories.slice(0, 3).map((repo) => (
                                <div
                                  key={repo.id}
                                  className="bg-slate-800 rounded-lg p-3 border border-slate-700"
                                >
                                  <div className="flex items-start justify-between mb-1">
                                    <h5 className="text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                                      <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1"
                                      >
                                        {repo.name}
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </h5>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                      <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        {formatNumber(repo.stargazers_count)}
                                      </span>
                                    </div>
                                  </div>
                                  {repo.description && (
                                    <p className="text-slate-300 text-xs line-clamp-1">
                                      {repo.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Logout Button */}
                    <div className="pt-4 border-t border-slate-700">
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              /* Login button when no user is logged in */
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 px-3 py-2"
                onClick={handleAuthClick}
              >
                <LogIn className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
