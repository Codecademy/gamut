import { useEffect } from 'react';

interface CustomConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CustomConfirm = ({
  isOpen,
  onClose,
  onConfirm,
}: CustomConfirmProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          padding: 24,
          margin: '100px auto',
          width: 400,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p>Are you sure?</p>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};
