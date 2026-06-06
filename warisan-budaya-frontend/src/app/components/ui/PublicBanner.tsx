import { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export function PublicBanner() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('public_banner_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('public_banner_dismissed', 'true');
  };

  // Don't show if authenticated or dismissed
  if (isAuthenticated || isDismissed) {
    return null;
  }

  return (
    <div className="bg-[#1F2937] border border-gray-700 rounded-[4px] p-3 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-[4px] bg-[#06B6D4] flex items-center justify-center shrink-0">
          <AlertCircle className="w-3 h-3 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white">
            Anda sedang melihat dalam mode publik (read-only)
          </p>
          <p className="text-xs text-gray-300 mt-0.5">
            Login sebagai dosen untuk dapat mengelola data (tambah, edit, hapus).
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => navigate('/login')}
            className="px-2.5 py-1 text-xs bg-[#06B6D4] text-white rounded-[4px] hover:bg-[#0891B2] transition-colors"
          >
            Login
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Tutup"
          >
            <X className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
