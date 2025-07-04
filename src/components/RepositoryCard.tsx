
import React from 'react';
import { Repository } from '@/types/github';
import { Star, GitFork, ExternalLink, Clock } from 'lucide-react';
import { formatNumber } from '@/utils/githubApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RepositoryCardProps {
  repository: Repository;
}

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-500',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-orange-500',
  'C++': 'bg-blue-600',
  C: 'bg-gray-600',
  'C#': 'bg-purple-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  PHP: 'bg-indigo-500',
  Ruby: 'bg-red-500',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-600',
  Dart: 'bg-blue-400',
  HTML: 'bg-orange-400',
  CSS: 'bg-blue-400',
  Shell: 'bg-gray-500',
  Vue: 'bg-green-400',
  React: 'bg-blue-400',
};

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const languageColor = repository.language ? languageColors[repository.language] || 'bg-gray-500' : 'bg-gray-500';
  const updatedDate = new Date(repository.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group h-full">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative h-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-200 truncate pr-2">
              {repository.name}
            </h3>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-lg flex-shrink-0"
            >
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${repository.name} repository`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-4 flex-grow leading-relaxed">
            {repository.description || 'No description available'}
          </p>

          {/* Topics */}
          {repository.topics && repository.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {repository.topics.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs bg-white/10 text-slate-300 border-white/20 hover:bg-white/20 transition-colors duration-200"
                >
                  {topic}
                </Badge>
              ))}
              {repository.topics.length > 3 && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-white/10 text-slate-400 border-white/20"
                >
                  +{repository.topics.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Stats and Language */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              {repository.language && (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${languageColor}`}></div>
                  <span className="text-sm text-slate-300">{repository.language}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-slate-400">
                <Star className="w-4 h-4" />
                <span className="text-sm">{formatNumber(repository.stargazers_count)}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <GitFork className="w-4 h-4" />
                <span className="text-sm">{formatNumber(repository.forks_count)}</span>
              </div>
            </div>
          </div>

          {/* Updated Date */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
            <Clock className="w-3 h-3" />
            <span>Updated {updatedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
