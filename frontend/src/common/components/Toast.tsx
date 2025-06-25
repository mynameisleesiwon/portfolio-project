import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: (id: string) => void;
}

const Toast = ({ id, type, message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 2000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-toast-success-bg',
          border: 'border-toast-success-border',
          text: 'text-toast-success-text',
          icon: <CheckCircle className="w-5 h-5 text-toast-success-icon" />,
          progress: 'bg-toast-success-icon',
        };
      case 'error':
        return {
          bg: 'bg-toast-error-bg',
          border: 'border-toast-error-border',
          text: 'text-toast-error-text',
          icon: <XCircle className="w-5 h-5 text-toast-error-icon" />,
          progress: 'bg-toast-error-icon',
        };
      case 'warning':
        return {
          bg: 'bg-toast-warning-bg',
          border: 'border-toast-warning-border',
          text: 'text-toast-warning-text',
          icon: <AlertCircle className="w-5 h-5 text-toast-warning-icon" />,
          progress: 'bg-toast-warning-icon',
        };
    }
  };

  const styles = getToastStyles();

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
      className={`relative flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm min-w-[320px] max-w-[400px] ${styles.bg} ${styles.border} ${styles.text}`}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-toast-progress-bg rounded-b-xl overflow-hidden">
        <motion.div
          className={`h-full ${styles.progress}`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 2, ease: 'linear' }}
        />
      </div>

      {styles.icon}
      <span className="flex-1 text-sm font-medium leading-relaxed">
        {message}
      </span>
      <button
        onClick={() => onClose(id)}
        className="text-toast-close hover:text-toast-close-hover transition-colors duration-200 p-1 rounded-md hover:bg-toast-close-bg-hover"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default Toast;
