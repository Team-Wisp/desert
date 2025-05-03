import React from 'react';

interface AuthModalProps {
    mode: 'signup' | 'login' | null;
    onClose: () => void;
  }
  
  const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose }) => {
    if (!mode) return null;
  
    const iframeSrc =
      mode === 'signup'
        ? 'http://localhost:8080/signup'
        : 'http://localhost:8080/login';
  
    return (
      <>
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-[400px] h-[500px] bg-white rounded-xl shadow-lg overflow-hidden">
            <iframe
              src={iframeSrc}
              title="Auth"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </>
    );
  };
  
  export default AuthModal;
  
