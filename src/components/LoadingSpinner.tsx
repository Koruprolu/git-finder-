
import React from 'react';
import { Github } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
          <Github className="w-12 h-12 text-white animate-spin" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Searching GitHub...</h3>
        <p className="text-slate-400">Fetching user data and repositories</p>
      </div>
    </div>
  );
};
