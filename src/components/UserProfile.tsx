
import React from 'react';
import { GitHubUser } from '@/types/github';
import { MapPin, Users, UserPlus, Calendar, ExternalLink, Building, Link as LinkIcon, Twitter } from 'lucide-react';
import { formatDate, formatNumber } from '@/utils/githubApi';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  user: GitHubUser;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="relative z-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white/30 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {user.name || user.login}
                    </h2>
                    {user.name && (
                      <p className="text-xl text-slate-300 mb-2">@{user.login}</p>
                    )}
                    {user.bio && (
                      <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                        {user.bio}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    asChild
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 self-start"
                  >
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Profile
                    </a>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                      {formatNumber(user.public_repos)}
                    </div>
                    <div className="text-slate-400 text-sm">Repositories</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                      {formatNumber(user.followers)}
                    </div>
                    <div className="text-slate-400 text-sm">Followers</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                      {formatNumber(user.following)}
                    </div>
                    <div className="text-slate-400 text-sm">Following</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.company && (
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <span>{user.company}</span>
                    </div>
                  )}
                  {user.blog && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <a
                        href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 truncate"
                      >
                        {user.blog}
                      </a>
                    </div>
                  )}
                  {user.twitter_username && (
                    <div className="flex items-center gap-2">
                      <Twitter className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      <a
                        href={`https://twitter.com/${user.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        @{user.twitter_username}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    <span>Joined {formatDate(user.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
