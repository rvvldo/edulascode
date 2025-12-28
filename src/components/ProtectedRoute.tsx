import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

/**
 * Component wrapper untuk protected routes
 * Redirect ke /auth jika user belum login
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { currentUser, loading } = useAuth();

    // Tampilkan loading saat mengecek auth state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Memuat...</p>
                </div>
            </div>
        );
    }

    // Redirect ke auth page jika belum login
    if (!currentUser) {
        return <Navigate to="/auth" replace />;
    }

    // Render children jika sudah login
    return <>{children}</>;
};

export default ProtectedRoute;
