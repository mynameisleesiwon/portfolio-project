import { AlertCircle, RefreshCw } from 'lucide-react';
import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryButtonText?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = '데이터를 불러올 수 없습니다',
  message = '서버에 연결할 수 없거나 오류가 발생했습니다.',
  onRetry,
  retryButtonText = '다시 시도',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle size={40} className="text-accent mb-4" />
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-text-muted mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          {retryButtonText}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
