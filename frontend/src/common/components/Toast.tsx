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
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-100 border-green-400 text-green-700',
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        };
      case 'error':
        return {
          bg: 'bg-red-100 border-red-400 text-red-700',
          icon: <XCircle className="w-5 h-5 text-red-500" />,
        };
      case 'warning':
        return {
          bg: 'bg-yellow-100 border-yellow-400 text-yellow-700',
          icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        };
    }
  };

  const styles = getToastStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.3 }}
      className={`flex items-center gap-3 p-4 rounded-lg border ${styles.bg} shadow-lg`}
    >
      {styles.icon}
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default Toast;
