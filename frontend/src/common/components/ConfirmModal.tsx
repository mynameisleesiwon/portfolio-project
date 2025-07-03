import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  type = 'warning',
}: ConfirmModalProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: <AlertCircle className="w-6 h-6 text-text-muted" />,
          confirmButton: 'bg-primary hover:bg-primary-hover text-white',
        };
      case 'info':
        return {
          icon: <AlertCircle className="w-6 h-6 text-primary" />,
          confirmButton: 'bg-primary hover:bg-primary-hover text-white',
        };
      default:
        return {
          icon: <AlertCircle className="w-6 h-6 text-text-muted" />,
          confirmButton: 'bg-primary hover:bg-primary-hover text-white',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  {styles.icon}
                  <h3 className="text-lg font-semibold text-text">{title}</h3>
                </div>
                <button
                  onClick={onCancel}
                  className="p-1 hover:bg-bg-secondary rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-text/60" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-text/80 leading-relaxed">{message}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 p-6 pt-0">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 text-sm font-medium border border-border rounded-lg hover:bg-bg-secondary transition-colors duration-200"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${styles.confirmButton}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
