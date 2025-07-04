
import React from 'react';
import { Repository } from '@/types/github';
import { RepositoryCard } from './RepositoryCard';

interface RepositoryGridProps {
  repositories: Repository[];
}

export const RepositoryGrid: React.FC<RepositoryGridProps> = ({ repositories }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repo, index) => (
          <div
            key={repo.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <RepositoryCard repository={repo} />
          </div>
        ))}
      </div>
    </div>
  );
};
