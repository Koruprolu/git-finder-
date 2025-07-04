
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-600/20 rounded-2xl blur-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-500/20 rounded-full p-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h3>
        <p className="text-slate-300 mb-6 leading-relaxed">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
