import { useState, useCallback } from 'react';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

interface UseConfirmReturn {
  isOpen: boolean;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  close: () => void;
  currentOptions: ConfirmOptions | null;
  handleConfirm: () => void;
}

export const useConfirm = (): UseConfirmReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<ConfirmOptions | null>(
    null
  );
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(
    null
  );

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolvePromise) => {
      setCurrentOptions({
        title: '확인',
        confirmText: '확인',
        cancelText: '취소',
        type: 'warning',
        ...options,
      });
      setResolve(() => resolvePromise);
      setIsOpen(true);
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setCurrentOptions(null);
    if (resolve) {
      resolve(false);
      setResolve(null);
    }
  }, [resolve]);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    setCurrentOptions(null);
    if (resolve) {
      resolve(true);
      setResolve(null);
    }
  }, [resolve]);

  return {
    isOpen,
    confirm,
    close,
    currentOptions,
    handleConfirm,
  };
};
